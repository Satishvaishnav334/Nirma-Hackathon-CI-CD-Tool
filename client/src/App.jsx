import React from "react";
import Dashboard from "./Pages/Dashboard";
import Nav from "./Component/Nav";
import { Toaster } from 'react-hot-toast';
import { RerunTest } from './Component/RerunTest'
function App() {
  return (
    <div className=" bg-gray-900 ">
      <Nav />
      <Dashboard />
      <RerunTest/>
      <Toaster />
    </div>
  );
}

export default App;
