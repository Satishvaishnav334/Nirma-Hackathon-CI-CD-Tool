import fs from "fs"
import path from "path"

async function extractLogicFromCodebase(repoPath) {
  const results = {
    apiRoutes: {},     // Backend API endpoints
    uiComponents: {},  // Frontend components
    businessLogic: {}, // Validation, database operations, etc.
    other: {}          // Uncategorized functions
  };

  async function walk(dir) {
    const files = await fs.readdir(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and other common excluded directories
        if (['node_modules', '.git', 'dist', 'build'].includes(file.name)) {
          continue;
        }
        await walk(fullPath);
      } else if (file.isFile()) {
        await analyzeFile(fullPath);
      }
    }
  }

  async function analyzeFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) return;
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const relativePath = path.relative(repoPath, filePath);
      
      // Categorize based on file path patterns
      if (isApiRoute(relativePath, content)) {
        results.apiRoutes[relativePath] = extractFunctions(content, extractApiEndpoints);
      } else if (isUiComponent(relativePath, content)) {
        results.uiComponents[relativePath] = extractFunctions(content, extractReactComponents);
      } else if (isBusinessLogic(relativePath, content)) {
        results.businessLogic[relativePath] = extractFunctions(content, extractBusinessFunctions);
      } else {
        results.other[relativePath] = extractFunctions(content);
      }
    } catch (err) {
      console.error(`Error analyzing file ${filePath}:`, err.message);
    }
  }

  function extractFunctions(content, specialExtractor = null) {
    if (specialExtractor) {
      const specialResults = specialExtractor(content);
      if (specialResults.length > 0) return specialResults;
    }
    
    // Default function extraction
    const functions = [];
    
    // Match regular function declarations
    const funcDeclarations = content.match(/function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)/g) || [];
    funcDeclarations.forEach(match => {
      const name = match.match(/function\s+([a-zA-Z0-9_$]+)/)[1];
      functions.push({ type: 'function', name });
    });
    
    // Match arrow functions with explicit names (const/let/var assignments)
    const arrowFuncs = content.match(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>/g) || [];
    arrowFuncs.forEach(match => {
      const name = match.match(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)/)[1];
      functions.push({ type: 'arrowFunction', name });
    });
    
    // Match class methods
    const classMethods = content.match(/(?:async\s+)?([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{/g) || [];
    classMethods.forEach(match => {
      const nameMatch = match.match(/([a-zA-Z0-9_$]+)\s*\(/);
      if (nameMatch && !['if', 'for', 'while', 'switch', 'catch'].includes(nameMatch[1])) {
        functions.push({ type: 'method', name: nameMatch[1] });
      }
    });
    
    return functions;
  }

  function extractApiEndpoints(content) {
    const endpoints = [];
    
    // Express.js route patterns
    const expressPatterns = [
      /app\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/g,
      /router\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/g
    ];
    
    expressPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        endpoints.push({
          type: 'apiEndpoint',
          method: match[1].toUpperCase(),
          path: match[2],
          name: `${match[1].toUpperCase()} ${match[2]}`
        });
      }
    });
    
    // Next.js API routes (based on exports)
    if (content.includes('export default') || content.includes('export const')) {
      const handlers = content.match(/export\s+(default|const|async function)\s+([a-zA-Z0-9_$]+)?/g) || [];
      handlers.forEach(handler => {
        endpoints.push({
          type: 'apiHandler',
          name: handler.includes('default') ? 'default' : handler.match(/([a-zA-Z0-9_$]+)$/)[1]
        });
      });
    }
    
    return endpoints;
  }

  function extractReactComponents(content) {
    const components = [];
    
    // React component patterns (functional and class)
    const funcComponentPatterns = [
      /function\s+([A-Z][a-zA-Z0-9_$]*)\s*\(/g,
      /const\s+([A-Z][a-zA-Z0-9_$]*)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_$]*)\s*=>/g,
      /export\s+(?:default\s+)?function\s+([A-Z][a-zA-Z0-9_$]*)/g
    ];
    
    funcComponentPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        components.push({
          type: 'reactComponent',
          componentType: 'functional',
          name: match[1]
        });
      }
    });
    
    // Class components
    const classComponents = content.match(/class\s+([A-Z][a-zA-Z0-9_$]*)\s+extends\s+(?:React\.)?Component/g) || [];
    classComponents.forEach(match => {
      const name = match.match(/class\s+([A-Z][a-zA-Z0-9_$]*)/)[1];
      components.push({
        type: 'reactComponent',
        componentType: 'class',
        name
      });
    });
    
    return components;
  }

  function extractBusinessFunctions(content) {
    const businessFuncs = [];
    
    // Database operations
    const dbPatterns = [
      /\.(find|findOne|findById|create|update|delete|save|aggregate|exec)\(/g,
      /\b(query|transaction|commit|rollback|validate)\b/g
    ];
    
    dbPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        businessFuncs.push({
          type: 'databaseOperation',
          name: match[1]
        });
      }
    });
    
    // Validation functions
    const validationPatterns = content.match(/(?:validate|check|verify|sanitize|isValid)[A-Z][a-zA-Z0-9_$]*\s*\(/g) || [];
    validationPatterns.forEach(match => {
      const name = match.match(/([a-zA-Z0-9_$]+)\s*\(/)[1];
      businessFuncs.push({
        type: 'validation',
        name
      });
    });
    
    return businessFuncs;
  }

  function isApiRoute(filePath, content) {
    // Check file path for API route indicators
    return (
      filePath.includes('/api/') || 
      filePath.includes('/routes/') || 
      filePath.match(/\/controllers\/.*\.js$/) ||
      // Check content for API route indicators
      content.includes('app.get(') ||
      content.includes('app.post(') ||
      content.includes('router.') ||
      content.includes('export default function handler')
    );
  }

  function isUiComponent(filePath, content) {
    // Check file path for UI component indicators
    return (
      filePath.includes('/components/') ||
      filePath.includes('/pages/') &&
      !filePath.includes('/api/') ||
      filePath.match(/\.(jsx|tsx)$/) ||
      // Check content for React component indicators
      content.includes('React') &&
      (content.includes('function ') || content.includes(' extends Component'))
    );
  }

  function isBusinessLogic(filePath, content) {
    // Check file path for business logic indicators
    return (
      filePath.includes('/services/') ||
      filePath.includes('/models/') ||
      filePath.includes('/lib/') ||
      filePath.includes('/utils/') ||
      // Check content for business logic indicators
      content.includes('mongoose') ||
      content.includes('sequelize') ||
      content.match(/\.validate\(/) ||
      content.match(/function\s+validate/)
    );
  }

  await walk(repoPath);
  return results;
}

export default extractLogicFromCodebase;