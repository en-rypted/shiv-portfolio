import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import isMobileContext from '../context/isMobileContext'

// Skill nodes data with positions and connections
const skillsData = [
  // Center - Core Skills
  { id: 1, name: "Java", level: 95, x: 50, y: 50, size: "large", color: "#f89820", category: "core" },
  { id: 2, name: "JavaScript", level: 95, x: 50, y: 35, size: "large", color: "#f7df1e", category: "core" },

  // Backend cluster
  { id: 3, name: "Spring Boot", level: 88, x: 65, y: 55, size: "medium", color: "#6db33f", category: "backend" },
  { id: 4, name: "Node.js", level: 85, x: 65, y: 40, size: "medium", color: "#68a063", category: "backend" },
  { id: 5, name: "Python", level: 70, x: 75, y: 48, size: "small", color: "#3776ab", category: "backend" },

  // Frontend cluster
  { id: 6, name: "React", level: 92, x: 35, y: 40, size: "large", color: "#61dafb", category: "frontend" },
  { id: 7, name: "TypeScript", level: 85, x: 25, y: 48, size: "medium", color: "#3178c6", category: "frontend" },
  { id: 8, name: "HTML/CSS", level: 90, x: 35, y: 58, size: "medium", color: "#e34c26", category: "frontend" },

  // Database cluster
  { id: 9, name: "MySQL", level: 88, x: 50, y: 65, size: "medium", color: "#00758f", category: "database" },
  { id: 10, name: "MongoDB", level: 75, x: 40, y: 72, size: "small", color: "#47a248", category: "database" },
  { id: 11, name: "Redis", level: 72, x: 60, y: 72, size: "small", color: "#dc382d", category: "database" },

  // DevOps cluster
  { id: 12, name: "Docker", level: 85, x: 70, y: 30, size: "medium", color: "#2496ed", category: "devops" },
  { id: 13, name: "Git", level: 95, x: 80, y: 38, size: "large", color: "#f05032", category: "devops" },
  { id: 14, name: "AWS", level: 75, x: 75, y: 25, size: "small", color: "#ff9900", category: "devops" },

  // Tools
  { id: 15, name: "VS Code", level: 95, x: 30, y: 28, size: "medium", color: "#007acc", category: "tools" },
  { id: 16, name: "Linux", level: 88, x: 85, y: 58, size: "medium", color: "#fcc624", category: "tools" },
];

export const Skills = () => {
  const isMobile = useContext(isMobileContext);

  const categories = ['core', 'frontend', 'backend', 'database', 'devops', 'tools'];

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#34d399 1px, transparent 1px), linear-gradient(90deg, #34d399 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-200 mb-2 font-mono tracking-tighter">
            <span className="text-primary">$</span> ls -R ./skills
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-4"></div>
          <p className="text-slate-400 font-mono text-xs md:text-sm">// Categorized technical proficiency breakdown</p>

          {/* Swipe Hint for Mobile */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              className="flex items-center justify-center gap-1 text-primary font-mono text-xs mt-4"
            >
              <span>Swipe Categories</span>
              <div className="flex">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <svg className="w-3 h-3 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Skills Container */}
        <div className={isMobile ?
          "flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 scrollbar-hide" :
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {categories.map((category, catIndex) => {
            const categorySkills = skillsData.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className={`${isMobile ? 'min-w-[85vw] snap-center' : 'w-full'} bg-light-navy/60 backdrop-blur-md border border-primary/30 rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-primary/60 transition-colors duration-300`}
              >
                {/* Category Header */}
                <div className="bg-lightest-navy/50 px-4 py-3 border-b border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <h3 className="text-primary font-mono text-lg font-bold uppercase tracking-wider">
                    {category}
                  </h3>
                </div>

                {/* Skills Grid within Category Card */}
                <div className="p-6 grid grid-cols-2 gap-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.05 }}
                      className="bg-navy/40 border border-primary/20 rounded-lg p-3 flex flex-col items-center justify-center text-center relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 relative z-10" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
                        <span className="font-bold text-base">{skill.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-slate-200 font-bold text-xs mb-1 relative z-10">{skill.name}</h3>
                      <div className="w-full bg-navy/80 h-1 rounded-full overflow-hidden relative z-10">
                        <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: skill.color }} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer/Hint */}
                <div className="mt-auto bg-navy/30 px-4 py-2 border-t border-primary/10 text-right">
                  <span className="text-[10px] text-primary/50 font-mono">
                    {categorySkills.length} modules loaded
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {['core', 'backend', 'frontend', 'database', 'devops'].map((category) => {
            const categorySkills = skillsData.filter(s => s.category === category);
            const avgLevel = Math.floor(
              categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length
            );
            return (
              <div
                key={category}
                className="bg-light-navy/40 backdrop-blur-sm border border-primary/20 rounded-lg p-4 text-center hover:bg-light-navy/60 transition-colors"
              >
                <div className="text-primary font-mono text-xl md:text-2xl font-bold mb-1">{avgLevel}%</div>
                <div className="text-slate-400 font-mono text-xs capitalize">{category}</div>
                <div className="text-slate-600 font-mono text-xs mt-1">{categorySkills.length} skills</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  )
}
