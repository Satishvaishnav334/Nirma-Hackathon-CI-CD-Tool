import axios from "axios";
import { exec } from "child_process";
import util from "util";
import os from "os"
import { AsyncHandler, ApiResponse } from "../utils/ApiHelpers.js";
import { TestScript } from '../models/testScript.js';


const getLogicFromCodebase = AsyncHandler(async (req, res) => {
  // Use query parameters for the repo URL—trust me, your routing will thank you.
  const githubRepoUrl = req.query.githubRepoUrl && decodeURIComponent(req.query.githubRepoUrl);
  if (!githubRepoUrl) {
    return res.status(400).json(new ApiResponse(400, {}, "Missing githubRepoUrl"));
  }

  if (!process.env.GITHUB_ACCESS_TOKEN) {
    return res.status(400).json(new ApiResponse(400, {}, "Missing GITHUB_ACCESS_TOKEN"));
  }

  // Validate the GitHub URL using regex
  const match = githubRepoUrl.match(/github\.com\/([^/]+)\/([^/]+)(\.git)?$/);
  if (!match) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid GitHub repository URL"));
  }

  const owner = match[1];
  const repo = match[2];
  const apiUrl = `https://github.com/${owner}/${repo}`;
  console.log("Repo API URL:", apiUrl);

  try {
    // Verify repo exists using GitHub API
    const repoData = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      }
    });
    console.log("Verified repo:", repoData.data.full_name);
  } catch (error) {
    console.error("Error verifying repo via GitHub API:", error.message);
    return res.status(400).json(new ApiResponse(400, {}, "GitHub repository not accessible"));
  }

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
        const llmResponse = await axios.post("http://localhost:5000/generate", { prompt });
        const testCases = llmResponse.data.response || "No test cases generated";
        testCasesResults[filePath] = testCases;
      } catch (fileError) {
        console.error(`Error processing file ${filePath}:`, fileError.message);
        testCasesResults[filePath] = "Error processing file";
      }
    }

    return res.status(200).json(new ApiResponse(200, testCasesResults, "Success"));
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

const fetchFigmaFile = async (req, res) => {
  const fileId = req.body.fileId;
  const accessToken = req.headers.authorization?.split(" ")[1]; 


  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { 'X-Figma-Token': accessToken }
    });
    const figmaobject = response.data;
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Figma file:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch Figma file"
    });
  }
};

const testScript = ()=>{

}

export { getLogicFromCodebase, fetchFigmaFile ,testScript}