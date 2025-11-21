import React from 'react'
import { motion } from 'framer-motion'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 pointer-events-none">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center py-6">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="pointer-events-auto"
        >
          <img src="/logo.svg" alt="Logo" className="w-12 h-12 hover:scale-110 transition-transform duration-300" />
        </motion.a>

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
