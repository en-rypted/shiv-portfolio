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
import ChatBot from './components/Chatbot'
import isMobileContext from './context/isMobileContext'
import ChatBotMobile from './components/ChatBotMobile'
import { FaComments, FaPaperPlane } from 'react-icons/fa'
import ChatBotFull from './components/ChatBotFull'

function App() {
  const [open, setOpen] = useState(false);
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

  const isMobile = useContext(isMobileContext)

  return (
    <>
  
   {showLogin&& <SignIn onClose={()=>{setShowLogin(false)}}></SignIn>}
    <BrowserRouter>
      <Navbar/>
      <AnimatedRoutes/>
      <ContatctMenu/>
     
        {!open && (
               <button
                         className="chatx-button"
                         style={{bottom:isMobile?150:22}}
                         onClick={() => setOpen(true)}
                         title="Chat with me!"
                         aria-label="Open chat"
                       >
                         <FaComments size={22} />
                       </button>
              )}
        {open && (isMobile ? <ChatBotMobile onClose={()=>setOpen(false)} /> : <ChatBotFull  onClose={()=>setOpen(false)} />)}
     
      
    
    </BrowserRouter>
   
    </>
  )
}

export default App
