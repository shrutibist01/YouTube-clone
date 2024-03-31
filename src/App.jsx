import React, { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/home'
import Video from './Pages/Video/video'

import "./Pages/Home/home.css"

const App = () => {
  const [sidebar, setSidebar]= useState(true);  
 
  return (
      <div>
        <Navbar setSidebar={setSidebar}/>
        <Routes>
            <Route exact path="/" element={<Home sidebar={sidebar}/>} />
            <Route path="/video/:categoryId/:videoId" element={<Video/>} /> 
        </Routes>
      </div>
  )
}

export default App
