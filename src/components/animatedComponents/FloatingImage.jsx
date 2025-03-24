import React from 'react'
import { motion } from "motion/react";

export const FloatingImage = ({image , width , height}) => {
  return (
    <div className="flex justify-center items-center w-full h-screen relative">
    {/* Glowing Background Effect */}
    <motion.div
      className="absolute inset-0 w-full h-full bg-blue-400 rounded-lg blur-3xl opacity-50"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Floating Image with Drop Shadow & Glow */}
    <motion.img
      src={image}
      alt="Floating Image"
      
      className="relative w-64 h-64 object-cover rounded-full border-2 border-blue-400 shadow-2xl"
      animate={{
        y: [0, -20, 0],
        boxShadow: [
          "0px 0px 20px rgba(0, 255, 255, 0.5)",
          "0px 0px 40px rgba(0, 255, 255, 0.8)",
          "0px 0px 20px rgba(0, 255, 255, 0.5)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: width ? width :"256px", height: height ? height : "306px", objectFit: "cover" }}
    />
   </div>
  )
}
