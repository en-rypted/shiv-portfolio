import { useCallback, useContext, useEffect, useState } from 'react'
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
import SignIn from './components/SignIn'

function App() {
   const isLoader = useContext(loderContext);
const [showLogin , setShowLogin ] = useState(false);
  const handleKeyPress = useCallback((event) => {
    // check if the Shift key is pressed
    if (event.shiftKey === true) {
      if(event.key === "L"){
        setShowLogin(true);
      }
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
   {isLoader.isLoder ? <Loader/> : ''}
   {showLogin&& <SignIn onClose={()=>{setShowLogin(false)}}></SignIn>}
    <BrowserRouter>
      <Navbar/>
      <AnimatedRoutes/>
      <ContatctMenu/>
    </BrowserRouter>
   
    </>
  )
}

export default App
