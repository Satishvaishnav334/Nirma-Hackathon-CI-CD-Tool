import axios from 'axios';

export const fetchFigmaFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const authHeader = req.headers.authorization; // Accessing the Authorization header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const accessToken = authHeader.split(" ")[1]; // Extract the token after 'Bearer'
    console.log(accessToken)
  console.log(fileId)
    const response = await axios.get(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { 'X-Figma-Token': accessToken }
    });

    res.json(response.data); // Send Figma file data as response
  } catch (error) {
    console.error("Error fetching Figma file:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch Figma file"
    });
  }
};
