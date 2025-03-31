import axios from "axios";
import { exec } from "child_process";
import util from "util";
import os from "os"
import path from "path";
import fs from "fs";
const execPromise = util.promisify(exec);
import { AsyncHandler, ApiResponse } from "../utils/ApiHelpers.js";
import { TestScript } from '../models/testScript.js';

// Helper function to recursively get code files
async function getCodeFiles(dir) {
  let files = [];
  const items = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(await getCodeFiles(fullPath));
    } else if (item.isFile() && /\.(js|ts|py|java|go)$/.test(item.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const getLogicFromCodebase = AsyncHandler(async (req, res) => {
  const { fileId, githubRepoUrl, accessToken } = req.body;
  if (!githubRepoUrl) return res.status(400).json(new ApiResponse(400, {}, "Missing githubRepoUrl"));
  if (!accessToken || !fileId) return res.status(400).json(new ApiResponse(400, {}, "Missing figma fileId or accessToken"));

  const figmaResponse = await axios.get(`https://api.figma.com/v1/files/${fileId}`, {
    headers: { 'X-Figma-Token': accessToken }
  });

  if (!figmaResponse.data) return res.status(400).json(new ApiResponse(400, {}, "Failed to fetch Figma file"));
  if (!process.env.GITHUB_ACCESS_TOKEN) return res.status(400).json(new ApiResponse(400, {}, "Missing GITHUB_ACCESS_TOKEN"));

  // Validate the GitHub URL using regex
  const match = githubRepoUrl.match(/github\.com\/([^/]+)\/([^/]+)(\.git)?$/);
  if (!match) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid GitHub repository URL"));
  }

  const owner = match[1];
  const repo = match[2];
  const apiUrl = `https://github.com/${owner}/${repo}`;

  try {
    // Optionally verify repo exists using GitHub API
    await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      }
    });
  } catch (error) {
    console.error("Error verifying repo via GitHub API:", error.message);
    return res.status(400).json(new ApiResponse(400, {}, "GitHub repository not accessible"));
  }
  console.log("repo verified, lol")

  // Create a temporary directory to clone the repo
  const tempDir = path.join(os.tmpdir(), `repo-${Date.now()}`);
  try {
    // Clone the repository (assumes git is installed)
    await execPromise(`git clone ${githubRepoUrl} ${tempDir}`);
    console.log(`Cloned repo into ${tempDir}`);

    // Recursively gather code files from the cloned repository
    const codeFiles = await getCodeFiles(tempDir);
    console.log("Found code files:", codeFiles);

    const testCasesResults = {};

    // Process each file: read content and send to the local Alpaca API for test case extraction
    for (const filePath of codeFiles) {
      try {
        const fileContent = await fs.promises.readFile(filePath, "utf-8");
        // Create a prompt for the local LLM
        const prompt = `Extract test cases for the following code:\n\n${fileContent}`;
        console.log(prompt)
        const llmResponse = await axios.post("http://localhost:5000/generate", { prompt });
        const testCases = llmResponse.data.response || "No test cases generated";
        testCasesResults[filePath] = testCases;
      } catch (fileError) {
        console.error(`Error processing file ${filePath}:`, fileError.message);
        testCasesResults[filePath] = "Error processing file";
      }
    }
    return res.status(200).json(new ApiResponse(200, { figma: figmaResponse.data, logic: testCasesResults }, "Success"));
  } catch (error) {
    console.error("Error during repository clone or test case extraction:", error.message);
    return res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
  } finally {
    // Clean up the temporary directory
    try {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
      console.log(`Cleaned up temporary directory ${tempDir}`);
    } catch (cleanupError) {
      console.error(`Error cleaning up temporary directory ${tempDir}:`, cleanupError.message);
    }
  }
});

const testScript = () => {

}

export { getLogicFromCodebase, testScript }