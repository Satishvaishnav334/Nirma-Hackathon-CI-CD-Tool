import React, { useEffect, useState } from "react";
import axios from "axios";

const FigmaViewer = () => {
  const [fileId, setFileId] = useState("");
  const [figmaData, setFigmaData] = useState("");
  const [repo, setRepo] = useState("");
  const [requirement, setRequirement] = useState("");
  const [error, setError] = useState(null);

  let onsubmit = async (event) => {
    event.preventDefault(); 
    setError(null);
    console.log("first")
    setFigmaData(null);

    if (!fileId) {
      setError("Please enter a Figma File ID.");
      return;
    }
   

    try {
      const token = import.meta.env.VITE_FIGMA_API_KEY;
      const response = await axios.post('http://localhost:8000/api/testplandata',{fileId,repo,requirement}, {
        headers: {
          Authorization: `Bearer ${token}`,}})
      setFigmaData(response.data);
    } catch (err) {
      setError("Failed to fetch Figma file.");
    }
  };
  console.log(figmaData)

  return (
    <div className="p-6 min-h-screen min-w-screen bg-gray-900 text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Figma File Viewer</h2>
     <form onSubmit={onsubmit}>
     <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Figma File ID"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
          className="p-2 w-80 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <input
          type="text"
          placeholder="Enter Figma File ID"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="p-2 w-80 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <input
          type="text"
          placeholder="Enter Figma File ID"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="p-2 w-80 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
type="submit"
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow-lg"
        >
          Fetch File
        </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
     </form>
      </div>

);
}

export default FigmaViewer;
