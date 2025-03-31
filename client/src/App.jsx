import React from 'react'
import Dashboard from './Pages/Dashboard'
import Nav from './Component/Nav'
import { RerunTest } from './Component/RerunTest'
function App() {
  return (
    <div className=' '>
      <Nav ></Nav>
      <Dashboard></Dashboard>
      <RerunTest></RerunTest>
    </div>
  )
}

export default App