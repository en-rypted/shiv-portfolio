import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Console from './components/Console'
import { Navbar } from './components/Navbar'
import { About } from './components/About'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
    {/* <div className='console-container'>
      <Console/>
    </div>
    <div className='about-container'>
      <About/>
    </div> */}
    <BrowserRouter>
      <Navbar/>
      <AnimatedRoutes/>
    </BrowserRouter>
    </>
  )
}

export default App
