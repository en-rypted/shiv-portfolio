import React, { useCallback, useContext, useEffect, useState } from 'react'

import './navbar.css'
import { Link,useLocation} from 'react-router-dom'
import { motion } from 'motion/react'
import isMobileContext from '../context/isMobileContext'
import { signOut } from "firebase/auth";
import authContext from '../context/authContext'
import { auth } from '../config/firebase'
import { useAlert } from '../context/AlertContext'




export const Navbar = () => {
  // const [name , setName] = useState("<shiv/>")
  const { showAlert } = useAlert();

  // Marvel-themed random sign-out messages
  const byeMessages = [
    "See you, true believer! 🕷️",
    "You’re leaving? Avengers, assemble next time! 🦸‍♂️",
    "Hulk says bye! SMASH you later! 💚",
    "Wakanda will miss you! 🐾",
    "You’re as legendary as Mjolnir! ⚡",
    "Stay marvelous! ✨",
    "Don’t forget your shield, Cap! 🛡️",
    "May your Spidey-sense guide you! 🕸️",
    "To infinity... and your next login! 🚀",
    "Even Loki couldn’t trick you. Bye! 🐍"
  ];

  const getRandomBye = () =>
    byeMessages[Math.floor(Math.random() * byeMessages.length)];

  let names = {
    "/" : "<shiv/>",
    "/about" : "#about",
    "/projects" : "#project",
    "/skills" : "#skills",
    "/contactMe" : "#contactMe",
    "/experience" : "#experience"
  }
  const authUser = useContext(authContext);

  const isMobile = useContext(isMobileContext)

  const location = useLocation();
  
  const handleOnclick = (e) =>{
   
    console.log(e.target.href)
   // document.location.href = e.target.href
   
    console.log(e.target.value)
  }
  
 
  let name = names[location.pathname]
  return (
    <> <div className='navbar' style={{height : 100}}>
         <motion.div className='logo-mob'
         initial={{opacity:0}}
         animate ={{opacity:1}}
         end={{opacity:0}}
         >  
          {name}
        </motion.div>
    </div>
       
    <div className={`navbar${isMobile  ? '-mob' : ''}`}>
        <motion.div className='logo'
         initial={{opacity:0}}
         animate ={{opacity:1}}
         end={{opacity:0}}
         >  
          {name}
        </motion.div>
        <div className={`list-container${isMobile ? '-mob' : ''}`}>
        {isMobile ? 
        <>
        <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }}  id='homeBut'><Link to="/" onClick={handleOnclick} value="<shiv/>">
           <div>
          <i className="fa-solid fa-house" style={{color:'black'}}></i>
          </div>
          
          </Link></motion.div>
        <ul>     
        <li><Link to="/about" onClick={handleOnclick}   value="#about">
        <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }} >
        <i className="fa-solid fa-circle-user"></i>
        </motion.div>
        </Link></li>
        <li><Link to="/projects" onClick={handleOnclick}>
        <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }} >
        <i className="fa-solid fa-diagram-project"></i>
        </motion.div>
        </Link></li>
        <li><Link to="/skills" onClick={handleOnclick}>
        <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }} >
        <i className="fa-solid fa-user-gear"></i>
        </motion.div>
        </Link></li>
        <li><Link to="/experience" onClick={handleOnclick}>
        <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }} >
        <i className="fa-solid fa-brain"></i>
        </motion.div>
        </Link></li>
        <li><Link to="/contactMe" onClick={handleOnclick}>
        <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }} >
        <i className="fa-solid fa-address-book"></i>
        </motion.div>
        </Link></li>
    </ul>
    </>
        :
            <ul>
             
                <li><Link to="/" onClick={handleOnclick} value="<shiv/>">Home</Link></li>
                <li><Link to="/about" onClick={handleOnclick}   value="#about">About</Link></li>
                <li><Link to="/projects" onClick={handleOnclick}>Projects</Link></li>
                <li><Link to="/skills" onClick={handleOnclick}>Skills</Link></li>
                <li><Link to="/experience" onClick={handleOnclick}>Experience</Link></li>
                <li><Link to="/contactMe" onClick={handleOnclick}>Contact</Link></li>
              {authUser.user != null &&  <li><button onClick={async () => {
                  await signOut(auth);
                  showAlert(getRandomBye(), "info");
                }}>SignOut</button></li> }

            </ul> }
        </div>

        
      
    </div>

    </>
  )
}
