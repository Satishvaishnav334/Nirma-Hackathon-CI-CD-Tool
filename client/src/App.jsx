<<<<<<< Updated upstream
import React from 'react'
import FigmaViewer from './Component/FigmaApi'
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <FigmaViewer/>
=======
import React from "react";
import Dashboard from "./Pages/Dashboard";
import Nav from "./Component/Nav";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className=" bg-gray-900 ">
      <Nav />
      <Dashboard />
      <Toaster />
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
