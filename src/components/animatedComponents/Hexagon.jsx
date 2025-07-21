import React from 'react'
import '../skills.css'
import { motion } from 'motion/react'

export const Hexagon = ({name , bg , isLoader}) => {
  return (
    <motion.div
    initial={{opacity:1}}
    whileHover={{ scale: 1.2, translateY: -20 , opacity:1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring" }} 
    className='hexagon' 
    style={{background : bg ? bg : null}}
    ><img id = 'skill-icon' 
    // src={name} 
    src={`data:image/svg+xml;utf8,${encodeURIComponent(name)}`}
    alt="" /></motion.div>
  )
}

export const HexagonLoader = ({name , bg}) => {
  return (
    <motion.div
    initial={{opacity:1}}
    whileHover={{ scale: 1.2, translateY: -20 , opacity:1 }}
    whileTap={{ scale: 0.9 }}
    animate={{
      opacity: [0.3, 0.8, 1, 0.5],
      x: [0, 1, -1, 0],
      scaleY: [1, 1.05, 0.95, 1],
    }}
    transition={{
      duration: 1.3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
    className='hexagon' 
    style={{background : bg ? bg : null}}
    ><img id = 'skill-icon' 
    // src={name} 
    src={`data:image/svg+xml;utf8,${encodeURIComponent(name)}`}
    alt="" /></motion.div>
  )
}






