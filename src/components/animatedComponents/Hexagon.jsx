import React from 'react'
import '../skills.css'
import { motion } from 'motion/react'

export const Hexagon = ({name}) => {
  return (
    <motion.div
    initial={{opacity:1}}
    whileHover={{ scale: 1.2, translateY: -20 , opacity:1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring" }}
    className='hexagon'><img id = 'skill-icon' 
    // src={name} 
    src={`data:image/svg+xml;utf8,${encodeURIComponent(name)}`}
    alt="" /></motion.div>
  )
}
