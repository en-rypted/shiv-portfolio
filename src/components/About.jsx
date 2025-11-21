import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import isMobileContext from '../context/isMobileContext'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const About = () => {
  const isMobile = useContext(isMobileContext)
  const aboutRef = collection(db, "about")
  const [about, setAbout] = useState({ profile: { url: "", public_id: "" }, description: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [aboutId, setAboutId] = useState("")

  useEffect(() => {
    const getAbout = async () => {
      try {
        const data = await getDocs(aboutRef)
        const filteredData = data.docs[0].data()
        setAboutId(data.docs[0].id)
        setAbout(filteredData)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getAbout()
  }, [])

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#34d399 1px, transparent 1px), linear-gradient(90deg, #34d399 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/50 to-transparent pointer-events-none" />



      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-200 mb-2 font-mono tracking-tighter">
            <span className="text-primary">$</span> cat about.txt
          </h2>
          <div className="h-1 w-20 bg-primary"></div>
        </motion.div>

        {/* Mobile Tabs */}
        {isMobile && (
          <div className="flex gap-4 mb-8 border-b border-primary/20 pb-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`font-mono text-sm px-4 py-2 rounded transition-all ${activeTab === 'profile' ? 'bg-primary/20 text-primary border border-primary/50' : 'text-slate-400 hover:text-slate-200'}`}
            >
              profile.jpg
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`font-mono text-sm px-4 py-2 rounded transition-all ${activeTab === 'details' ? 'bg-primary/20 text-primary border border-primary/50' : 'text-slate-400 hover:text-slate-200'}`}
            >
              README.md
            </button>
          </div>
        )}

        <div className={`${isMobile ? 'block' : 'grid md:grid-cols-2 gap-12'} items-start`}>
          {/* Left Side - Profile Card */}
          {(!isMobile || activeTab === 'profile') && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />

              {/* Code Window */}
              <div className="relative bg-light-navy/80 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="bg-lightest-navy/50 px-4 py-3 flex items-center gap-2 border-b border-primary/20">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs text-slate-400 font-mono">profile.jpg</span>
                </div>

                {/* Image Content */}
                <div className="p-6">
                  {isLoading ? (
                    <SkeletonTheme baseColor="#112240" highlightColor="#233554">
                      <Skeleton height={400} borderRadius={8} />
                    </SkeletonTheme>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative overflow-hidden rounded-lg border border-primary/20"
                    >
                      <img
                        src={about.profile.url}
                        alt="Profile"
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      {/* Scan Line Effect */}
                      <motion.div
                        animate={{ y: [-400, 400] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-20"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Status Footer */}
                <div className="bg-lightest-navy/30 px-4 py-2 border-t border-primary/20 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span><span className="text-primary">█</span> STATUS: ACTIVE</span>
                    <span><span className="text-tertiary">█</span> ROLE: DEV</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right Side - Description */}
          {(!isMobile || activeTab === 'details') && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {isLoading ? (
                <SkeletonTheme baseColor="#112240" highlightColor="#233554">
                  <Skeleton count={8} />
                </SkeletonTheme>
              ) : (
                <>
                  <div className="bg-light-navy/40 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4 text-primary font-mono text-sm">
                      <span className="animate-pulse">{'>'}</span>
                      <span>README.md</span>
                    </div>
                    <div className="text-slate-300 leading-relaxed space-y-4">
                      {about.description.split('\n').map((paragraph, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="text-base"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Indicator */}
                  <div className="bg-light-navy/40 backdrop-blur-sm border border-tertiary/20 rounded-lg p-4">
                    <div className="font-mono text-xs text-slate-400 space-y-2">
                      <p className="text-tertiary mb-2">// TECH_STACK</p>
                      <div className="flex flex-wrap gap-2">
                        {['Java', 'Spring Boot', 'React', 'Node.js', 'MySQL'].map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="px-3 py-1 bg-navy/50 border border-primary/30 rounded text-primary text-xs"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

const Preview = ({ json }) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative bg-light-navy/80 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden">
          <div className="bg-lightest-navy/50 px-4 py-3 flex items-center gap-2 border-b border-primary/20">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6">
            <img src={json.profile} alt="Profile" className="w-full h-auto rounded-lg" />
          </div>
        </div>
        <div className="bg-light-navy/40 border border-primary/20 rounded-lg p-6">
          <p className="text-slate-300 leading-relaxed">{json.description}</p>
        </div>
      </div>
    </div>
  )
}
