import React, { useState } from 'react';
import axios from 'axios';

const FigmaViewer = () => {
  const [fileId, setFileId] = useState('');
  const [figmaData, setFigmaData] = useState(null);
  const [error, setError] = useState(null);

  const fetchFigmaData = async () => {
    setError(null); // Reset errors
    setFigmaData(null); // Clear previous data

    if (!fileId) {
      setError("Please enter a Figma File ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/figma/${fileId}`);
      setFigmaData(response.data);
    } catch (err) {
      console.log(err)
      // setError(err.response?.data?.error || "Failed to fetch Figma file.");
    }
  };


  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Figma File Viewer</h2>
      <input
        type="text"
        placeholder="Enter Figma File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={fetchFigmaData} style={{ padding: "8px 15px" }}>Fetch File</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {figmaData && (
        <div style={{ textAlign: "left", marginTop: "20px", maxWidth: "600px", margin: "auto" }}>
          <h3>File Info:</h3>
          <p><strong>Name:</strong> {figmaData.name}</p>
          <p><strong>Last Modified:</strong> {figmaData.lastModified}</p>
          <p><strong>Document ID:</strong> {figmaData.document.id}</p>
        </div>
      )}
    </div>
  );
};

export default FigmaViewer;
