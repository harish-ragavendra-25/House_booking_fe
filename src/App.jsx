import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Profile from './components/Profile';
import PostRoom from "./components/PostRoom";
function App(){
  return(
    <>
      
      <Router>
        <Routes>
          <Route path="/post" element={<PostRoom/>}/>
          <Route path="/" element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App;