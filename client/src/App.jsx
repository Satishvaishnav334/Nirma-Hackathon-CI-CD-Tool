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
    </div>
  );
}

export default App;
