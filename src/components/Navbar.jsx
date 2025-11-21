import React from 'react'
import { motion } from 'framer-motion'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 pointer-events-none">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex justify-end items-center py-6">
        <motion.a
          href="/resume.pdf"
          target="_blank"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="btn-primary pointer-events-auto"
        >
          Resume
        </motion.a>
      </div>
    </nav>
  )
}
