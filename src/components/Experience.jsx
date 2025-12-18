import React, { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from "framer-motion";
import isMobileContext from '../context/isMobileContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FaTimes, FaChevronRight } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { API } from '../api';

export const Experience = () => {
  const [isLoding, setIsLoading] = useState(true);
  const [viewExp, setViewExp] = useState(null); // For modal

  const experiencesRef = collection(db, "experiences");
  const [experiences, setexperiences] = useState([{ id: "", companyName: "", duration: "", role: "", desc: "", order: 0 }]);

  const { data, loading, error } = useFetch(API.experiences);

  useEffect(() => {
    if (data) {
      setexperiences([...data]);
      setIsLoading(false);
    }
  }, [data]);

  // useEffect(() => {
  //   const getExeriences = async () => {
  //     try {
  //       const data = await getDocs(experiencesRef);
  //       if (data.docs.length == 0) {
  //         return;
  //       }
  //       const filterdData = data.docs.map(e => { return { id: e.id, data: e.data() } });
  //       const sortedData = filterdData.sort((a, b) => a.data.order - b.data.order);
  //       setexperiences(sortedData)
  //       setIsLoading(false)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getExeriences();
  // }, [])

  const isMobile = useContext(isMobileContext)



  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#34d399 1px, transparent 1px), linear-gradient(90deg, #34d399 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />



      <div className="w-full max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-16 flex justify-between items-end"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-200 mb-2 font-mono tracking-tighter">
              <span className="text-primary">$</span> git log --experience
            </h2>
            <div className="h-1 w-20 bg-primary"></div>
          </div>

          {/* Swipe Hint for Mobile */}
          {isMobile && !isLoding && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              className="flex items-center gap-1 text-primary font-mono text-xs mb-2"
            >
              <span>Swipe</span>
              <FaChevronRight />
              <FaChevronRight className="-ml-1" />
            </motion.div>
          )}
        </motion.div>

        <div className={`${isMobile ? 'flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide' : 'relative'}`}>
          {isLoding ? (
            [1, 2].map((_, i) => (
              <div key={i} className={`bg-light-navy/40 border border-primary/30 rounded-lg p-6 ${isMobile ? 'min-w-[85vw] snap-center' : ''}`}>
                <SkeletonTheme baseColor="#112240" highlightColor="#233554">
                  <Skeleton width={200} height={30} className="mb-2" />
                  <Skeleton width={150} height={20} className="mb-4" />
                  <Skeleton count={3} />
                </SkeletonTheme>
              </div>
            ))
          ) : (
            isMobile ? (
              experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="min-w-[85vw] snap-center"
                >
                  {/* Mobile Compact Card */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setViewExp(exp)}
                    className="relative bg-light-navy/60 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-lg h-[250px] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-xs text-slate-400 font-mono">commit_{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-1 line-clamp-1">{exp.companyName}</h3>
                      <div className="text-primary text-xs mb-2">{exp.duration}</div>
                      <div className="text-green-400 text-sm font-mono line-clamp-1">
                        {exp.role}
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-400 text-xs line-clamp-3 mb-4 font-sans">
                        {exp.desc}
                      </p>
                      <div className="text-primary text-xs font-mono text-right">
                        [TAP FOR DETAILS]
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              // Desktop Auto-play Carousel
              <DesktopCarousel
                items={experiences}
                renderItem={(exp, i) => (
                  <div className="relative group h-full p-4">
                    {/* Glow Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500" />

                    {/* Terminal Window */}
                    <div className="relative bg-light-navy/60 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-lg h-full min-h-[400px]">
                      {/* Window Header */}
                      <div className="bg-lightest-navy/50 px-4 py-3 flex items-center gap-2 border-b border-primary/20">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-4 text-xs text-slate-400 font-mono">commit_{String(i + 1).padStart(2, '0')}.log</span>
                      </div>

                      {/* Content */}
                      <div className="p-8 font-mono">
                        <div className="flex items-start gap-4 mb-4">
                          <span className="text-tertiary">commit</span>
                          <div className="flex-1">
                            <h3 className="text-3xl font-bold text-slate-100 mb-2">{exp.companyName}</h3>
                            <div className="text-primary text-sm mb-4">{exp.duration}</div>
                            <div className="text-green-400 text-lg mb-6">
                              <span className="text-slate-500 text-sm">Author:</span> {exp.role}
                            </div>
                            <div className="bg-navy/50 border border-primary/20 rounded p-6 mt-4">
                              <p className="text-slate-300 text-base leading-relaxed font-sans">
                                {exp.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Bar */}
                      <div className="bg-lightest-navy/30 px-4 py-2 border-t border-primary/20 font-mono text-xs text-slate-400 absolute bottom-0 w-full">
                        <span><span className="text-primary">█</span> branch: main</span>
                      </div>
                    </div>
                  </div>
                )}
              />
            )
          )}
        </div>
      </div>

      {/* Mobile Experience Modal */}
      <AnimatePresence>
        {viewExp && (
          <ExperienceModal
            exp={viewExp}
            onClose={() => setViewExp(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ExperienceModal = ({ exp, onClose }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-light-navy border border-primary/30 rounded-xl overflow-hidden w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-navy/50 rounded-full text-slate-300 hover:text-white hover:bg-red-500/20 transition-colors"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="bg-lightest-navy/50 px-6 py-6 border-b border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h3 className="text-2xl font-bold text-slate-100 font-mono mb-1">{exp.companyName}</h3>
          <div className="text-primary text-sm font-mono">{exp.duration}</div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <span className="text-slate-500 font-mono text-xs block mb-1">ROLE</span>
            <div className="text-green-400 font-bold text-lg">{exp.role}</div>
          </div>

          <div className="bg-navy/30 border border-primary/10 rounded-lg p-4">
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {exp.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const Preview = ({ json }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-20 px-4">
      <div className="bg-light-navy/60 border border-primary/30 rounded-lg overflow-hidden">
        <div className="bg-lightest-navy/50 px-4 py-3 flex items-center gap-2 border-b border-primary/20">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="p-6 font-mono">
          <h3 className="text-2xl font-bold text-slate-100 mb-2">{json.companyName}</h3>
          <div className="text-primary text-sm mb-2">{json.duration}</div>
          <div className="text-green-400 text-sm mb-4">{json.role}</div>
          <p className="text-slate-300 text-sm">{json.desc}</p>
        </div>
      </div>
    </div>
  )
}

const DesktopCarousel = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // 5 seconds auto-play
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      // Swipe Left -> Next
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else if (info.offset.x > 100) {
      // Swipe Right -> Prev
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  return (
    <div
      className="relative overflow-hidden min-h-[500px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-0 right-0 z-20 flex gap-2 mb-4">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-8' : 'bg-primary/20 hover:bg-primary/50'
              }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="w-full cursor-grab active:cursor-grabbing"
        >
          {renderItem(items[currentIndex], currentIndex)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
