import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Console from './components/Console'
import { Navbar } from './components/Navbar'
import { About } from './components/About'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes'
import { ContatctMenu } from './components/ContatctMenu'
import loderContext from './context/loderContext'
import { Loader } from './components/animatedComponents/Loader'
function App() {
   const isLoader = useContext(loderContext);


  return (
    <>
   {isLoader.isLoder ? <Loader/> : ''}
    {/* <div className='console-container'>
      <Console/>
    </div>
    <div className='about-container'>
      <About/>
    </div> */}
    <BrowserRouter>
      <Navbar/>
      <AnimatedRoutes/>
      <ContatctMenu/>
    </BrowserRouter>
   
    </>
  )
}

export default App
