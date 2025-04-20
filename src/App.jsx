import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import './App.css'

import DashboardComponent from './DashboardComponent/DashboardComponent'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardComponent/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
