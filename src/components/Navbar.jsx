import React, { useEffect, useState } from 'react'

import './navbar.css'
import { Link,useLocation} from 'react-router-dom'
import { motion } from 'motion/react'


export const Navbar = () => {
  // const [name , setName] = useState("<shiv/>")
  let names = {
    "/" : "<shiv/>",
    "/about" : "#about",
    "/projects" : "#project",
    "/skills" : "#skills",
    "/contactUs" : "#contactUs",
    "/experience" : "#experience"
  }
  const location = useLocation();
  const handleOnclick = (e) =>{
   
    console.log(e.target.href)
   // document.location.href = e.target.href
   
    console.log(e.target.value)
  }
  
 
  let name = names[location.pathname]
  return (
    <div className='navbar'>
        <motion.div className='logo'
         initial={{opacity:0}}
         animate ={{opacity:1}}
         end={{opacity:0}}
         >  
          {name}
        </motion.div>
        <div className='list-container'>
            <ul>
                <li><Link to="/" onClick={handleOnclick} value="<shiv/>">Home</Link></li>
                <li><Link to="/about" onClick={handleOnclick}   value="#about">About</Link></li>
                <li><Link to="/projects" onClick={handleOnclick}>Projects</Link></li>
                <li><Link to="/skills" onClick={handleOnclick}>Skills</Link></li>
                <li><Link to="/experience" onClick={handleOnclick}>Experience</Link></li>
                <li><Link to="/contactUs" onClick={handleOnclick}>Contact</Link></li>
            </ul>
        </div>
      
    </div>
  )
}
