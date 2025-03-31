import React, { useState } from "react";
import axios from "axios";
import { Client } from "@botpress/chat";
import toast from "react-hot-toast";

const FigmaViewer = () => {
  const [fileId, setFileId] = useState("");
  const [figmaData, setFigmaData] = useState("");
  const [github, setGithub] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleBotResponse = async (listener, client) => {
    if (!listener || !client) return;
    try {
      const botResponse = await new Promise((resolve) => {
        const onMessage = (event) => {
          if (event.userId !== client.user.id) {
            listener.off("message_created", onMessage);
            resolve(event);
          }
        };
        listener.on("message_created", onMessage);
      });
      console.log("Bot's response:", botResponse.payload.text);
    } catch (error) {
      console.error("Error handling bot response:", error);
    }
  };

  let onsubmit = async (event) => {
    event.preventDefault();
    console.log("first");
    setFigmaData(null);

    if (!fileId) {
      toast.error("Please enter a Figma file ID.");
      return;
    }

    try {
<<<<<<< Updated upstream
      const token = import.meta.env.VITE_FIGMA_API_KEY;
      const response = await axios.post('http://localhost:8000/api/testplandata',{fileId,repo,requirement}, {
        headers: {
          Authorization: `Bearer ${token}`,}})
      setFigmaData(response.data);
=======
      const figmaAccessToken = import.meta.env.VITE_FIGMA_API_KEY;
      const webhookId = import.meta.env.VITE_BOTPRESS_WEBHOOK_URL;
      if (!webhookId) throw new Error("Webhook ID is missing");

      const logicResponse = await axios.post(
        `http://localhost:8000/api/get-logic?githubRepoUrl=${github}`,
        {
          fileId,
          githubRepoUrl: github,
          accessToken: figmaAccessToken,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
        }
      );

      if (!logicResponse.data) {
        toast.error("Failed to fetch logical data.");
        return;
      }

      const connectedClient = await Client.connect({ webhookId });

      const { conversation: newConversation } =
        await connectedClient.createConversation({});
      console.log("Conversation started:", newConversation.id);

      const newListener = await connectedClient.listenConversation({
        id: newConversation.id,
      });
      handleBotResponse(newListener);

      const message = await connectedClient.createMessage({
        conversationId: newConversation.id,
        payload: {
          type: "text",
          text: {
            figma: logicResponse.data.figma,
            requirements,
            github: logicResponse.data.logic,
          },
        },
      });

      console.log("message", message);

      setFigmaData(logicResponse.data.figma);
>>>>>>> Stashed changes
    } catch (err) {
      toast.error(err?.message || err?.response?.data || "Failed to fetch Figma file.");
    }
  };
  console.log(figmaData);

  return (
<<<<<<< Updated upstream
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
=======
    <div className="p-6 min-h-screen w-[60vw] bg-gray-700 justify-center align-middle text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Start Test</h2>
      <form onSubmit={onsubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Figma File ID"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            className="p-2 w-80 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Your github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="p-2 w-80  rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            type="text"
            placeholder="Enter Your Requirements if have"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="p-2 w-80 h-[10rem] rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-400 text-xl rounded shadow-lg"
          >
            Fetch File
          </button>
        </div>
      </form>
    </div>
  );
};
>>>>>>> Stashed changes

export default FigmaViewer;
