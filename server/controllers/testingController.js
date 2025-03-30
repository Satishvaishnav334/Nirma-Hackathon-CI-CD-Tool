import { ApiResponse, AsyncHandler } from "../utils/ApiHelpers.js";
import axios from 'axios'

const getLogicFromCodebase = AsyncHandler(async (req, res) => {
  const { githubRepoUrl } = req.params;
  if (!githubRepoUrl) {
    return res.status(400).json(new ApiResponse(400, {}, "Missing githubRepoUrl"));
  }

  if (!process.env.GITHUB_ACCESS_TOKEN) {
    return res.status(400).json(new ApiResponse(400, {}, "Missing GITHUB_ACCESS_TOKEN"));
  }

  const repo = await axios.get(githubRepoUrl, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    }
  })

  console.log(repo)

  return res.status(200).json(new ApiResponse(200, repo.data, "Success"));
})

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

export { getLogicFromCodebase, fetchFigmaFile }