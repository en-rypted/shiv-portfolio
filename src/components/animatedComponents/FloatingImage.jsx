import React from 'react'
import { motion } from "motion/react";

export const FloatingImage = ({image}) => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
    {/* Glowing Background Effect */}
    <motion.div
      className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50"
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
      className="w-64 h-64 shadow-2xl rounded-lg border-2 border-blue-400"
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
    />
   </div>
  )
}
