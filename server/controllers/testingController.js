import axios from "axios";
import { exec } from "child_process";
import util from "util";
import os from "os"
const execPromise = util.promisify(exec);
import { AsyncHandler, ApiResponse } from "../utils/ApiHelpers.js";

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

  // Construct the API URL to verify repository existence (optional)
  const owner = match[1];
  const repo = match[2];
  const apiUrl = `https://github.com/${owner}/${repo}`;
  console.log(apiUrl)

  try {
    // Optionally verify repo exists using GitHub API
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

  // Create a temporary directory to clone the repo into
  const tempDir = path.join(os.tmpdir(), `repo-${Date.now()}`);
  try {
    // Clone the repository using git. Make sure your environment has git installed.
    // And yes, this might feel like using duct tape to fix your CI/CD pipeline—but it works!
    await execPromise(`git clone ${githubRepoUrl} ${tempDir}`);
    console.log(`Cloned repo into ${tempDir}`);

    // Extract logic (e.g., function definitions) from the cloned codebase.
    const extractedLogic = await extractLogicFromCodebase(tempDir);

    return res.status(200).json(new ApiResponse(200, extractedLogic, "Success"));
  } catch (error) {
    console.error("Error during repository clone or logic extraction:", error.message);
    return res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
  } finally {
    // Clean up the temporary directory. If your repo is huge, at least you won't clutter your disk!
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
      console.log(`Cleaned up temporary directory ${tempDir}`);
    } catch (cleanupError) {
      console.error(`Error cleaning up temporary directory ${tempDir}:`, cleanupError.message);
    }
  }
});

const fetchFigmaFile = async (req, res) => {
  const { fileId } = req.params;
  const accessToken = req.accessToken; // Token from middleware

  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { Authorization: `X-Figma-Token ${accessToken}` }
    });

    res.json(response.data); // Send Figma file data as response
  } catch (error) {
    console.error("Error fetching Figma file:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch Figma file"
    });
  }
};

export { getLogicFromCodebase, fetchFigmaFile }