import axios from 'axios';

export const fetchFigmaFile = async (req, res) => {
  const { fileId } = req.params;
  const accessToken = req.accessToken; // Token from middleware

  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    res.json(response.data); // Send Figma file data as response
  } catch (error) {
    console.error("Error fetching Figma file:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch Figma file"
    });
  }
};
