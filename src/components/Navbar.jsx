import React, { useContext, useEffect, useState } from 'react'

import './navbar.css'
import { Link,useLocation} from 'react-router-dom'
import { motion } from 'motion/react'
import isMobileContext from '../context/isMobileContext'


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

  const isMobile = useContext(isMobileContext)

  const location = useLocation();
  const handleOnclick = (e) =>{
   
    console.log(e.target.href)
   // document.location.href = e.target.href
   
    console.log(e.target.value)
  }
  
 
  let name = names[location.pathname]
  return (
    <>
        <motion.div className='logo-mob'
         initial={{opacity:0}}
         animate ={{opacity:1}}
         end={{opacity:0}}
         >  
          {name}
        </motion.div>
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
        <ul>     
        <li>

          <Link to="/" onClick={handleOnclick} value="<shiv/>">
           <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }} >
          <i className="fa-solid fa-house"></i>
          </motion.div>
          
          </Link></li>
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
        <li><Link to="/contactUs" onClick={handleOnclick}>
        <motion.div
              initial={{opacity:1}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }} >
        <i className="fa-solid fa-address-book"></i>
        </motion.div>
        </Link></li>
    </ul>
        :
            <ul>
             
                <li><Link to="/" onClick={handleOnclick} value="<shiv/>">Home</Link></li>
                <li><Link to="/about" onClick={handleOnclick}   value="#about">About</Link></li>
                <li><Link to="/projects" onClick={handleOnclick}>Projects</Link></li>
                <li><Link to="/skills" onClick={handleOnclick}>Skills</Link></li>
                <li><Link to="/experience" onClick={handleOnclick}>Experience</Link></li>
                <li><Link to="/contactUs" onClick={handleOnclick}>Contact</Link></li>


            </ul> }
        </div>
      
    </div>

    </>
  )
}
