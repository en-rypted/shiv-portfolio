import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

export const Navbar = () => {
  const [resumeUrl, setResumeUrl] = useState('')

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'about'));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          if (data.resume && data.resume.url) {
            setResumeUrl(data.resume.url);
          }
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, []);

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
          href={resumeUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`btn-primary pointer-events-auto ${!resumeUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={(e) => !resumeUrl && e.preventDefault()}
        >
          Resume
        </motion.a>
      </div>
    </nav>
  )
}
