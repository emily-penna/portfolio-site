import './css/style.css'

import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'

import {Navigation} from './components/Navbar.tsx'
import Game from './pages/Game'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

export default function App() {


  return (  
    <>

    {/* <header>
        <h1>{"Emily"}</h1>
        <p>{"Hi! This is the header"}</p>
    </header> */}
    
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/game" element={<Game/>} />
      <Route path="/projects" element={<Projects/>} />
      <Route path="/blog" element={<Blog/>} />
    </Routes>
    </> 
  );

}

