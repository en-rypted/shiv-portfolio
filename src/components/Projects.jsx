import React, { useContext, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import isMobileContext from '../context/isMobileContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { FaTimes, FaExternalLinkAlt, FaChevronRight } from 'react-icons/fa'
import useFetch from '../hooks/useFetch'
import { API } from '../api'

export const Projects = () => {
  const isMobile = useContext(isMobileContext)
  const [isLoading, setIsLoading] = useState(true);
  const projectsRef = collection(db, "projects");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const { data, loading, error } = useFetch(API.projects);

  useEffect(() => {
    if (data) {
      setProjects(data);
      setIsLoading(false);
    }
  }, [data]);

  // useEffect(() => {
  //   const getProjects = async () => {
  //     try {
  //       const data = await getDocs(projectsRef);
  //       const filterdData = data.docs.map(e => { return { id: e.id, data: e.data() } });
  //       const sortedData = filterdData.sort((a, b) => a.data.order - b.data.order);
  //       setProjects(sortedData)
  //       setIsLoading(false)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getProjects();
  // }, [])

  return (
    <div className="relative w-full py-20 px-4 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#34d399 1px, transparent 1px), linear-gradient(90deg, #34d399 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-16 flex justify-between items-end"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-200 mb-2 font-mono tracking-tighter">
              <span className="text-primary">$</span> cat projects.log
            </h2>
            <div className="h-1 w-20 bg-primary"></div>
          </div>

          {/* Swipe Hint for Mobile */}
          {isMobile && !isLoading && (
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
          {isLoading ? (
            [1, 2].map((_, i) => (
              <div key={i} className={`bg-light-navy/40 border border-primary/30 rounded-lg p-6 ${isMobile ? 'min-w-[85vw] snap-center' : ''}`}>
                <SkeletonTheme baseColor="#112240" highlightColor="#233554">
                  <Skeleton height={40} width={300} className="mb-4" />
                  <Skeleton count={3} className="mb-2" />
                  <Skeleton height={200} borderRadius={8} className="mt-4" />
                </SkeletonTheme>
              </div>
            ))
          ) : (
            isMobile ? (
              projects.map((project, index) => (
                <div key={project.id} className="min-w-[85vw] snap-center">
                  {/* Mobile Compact Card */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProject(project)}
                    className="relative bg-light-navy/60 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-lg h-[400px] flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="h-3/5 relative overflow-hidden">
                      <img
                        src={project.image.url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="font-mono text-xs text-primary mb-1">
                          // PROJECT_{String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-100 font-mono leading-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-navy/40">
                      <p className="text-slate-400 text-sm line-clamp-3 font-sans">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-xs font-mono mt-4">
                        <span>[TAP TO VIEW DETAILS]</span>
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              // Desktop Auto-play Carousel
              <DesktopCarousel
                items={projects}
                renderItem={(project, index) => (
                  <ProjectCard
                    project={project}
                    index={index}
                    isMobile={isMobile}
                  />
                )}
              />
            )
          )}
        </div>
      </div>

      {/* Mobile Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ProjectModal = ({ project, onClose }) => {
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
        className="bg-light-navy border border-primary/30 rounded-xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-navy/50 rounded-full text-slate-300 hover:text-white hover:bg-red-500/20 transition-colors"
        >
          <FaTimes />
        </button>

        {/* Image Header */}
        <div className="h-48 sm:h-64 relative shrink-0">
          <img
            src={project.image.url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-light-navy to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h3 className="text-3xl font-bold text-slate-100 font-mono tracking-tight shadow-black drop-shadow-lg">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Scrollable Area */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="font-mono text-xs text-primary/70 mb-4">
            // PROJECT DETAILS
          </div>

          <div className="bg-navy/30 border border-primary/10 rounded-lg p-4 mb-6">
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center py-3 bg-primary/10 border border-primary text-primary font-mono font-bold rounded hover:bg-primary hover:text-navy transition-all active:scale-95"
          >
            [ LAUNCH PROJECT ]
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const ProjectCard = ({ project, index, isMobile }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-light-navy/40 backdrop-blur-md border border-primary/30 rounded-xl overflow-hidden mb-20 shadow-2xl group min-h-[500px]"
    >
      <div className="grid md:grid-cols-2 h-full">
        {/* Image Section */}
        <motion.div style={{ y }} className="relative h-64 md:h-full overflow-hidden">
          <img
            src={project.image.url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent"></div>
        </motion.div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-center">
          <div className="font-mono text-xs text-primary mb-2">
            // PROJECT_{String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="text-3xl font-bold text-slate-100 mb-4 font-mono">
            {project.title}
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed">
            {project.description}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-mono font-bold"
          >
            [ VIEW PROJECT ]
            <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Preview = ({ json }) => (
  <div className="p-4 bg-navy/50 rounded">
    <pre className="text-slate-300 text-xs">{JSON.stringify(json, null, 2)}</pre>
  </div>
);

// Desktop Carousel Component
const DesktopCarousel = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        key={currentIndex}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.x > 100 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          } else if (offset.x < -100 && currentIndex < items.length - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        }}
      >
        {renderItem(items[currentIndex], currentIndex)}
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${idx === currentIndex
              ? 'w-8 bg-primary'
              : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
          />
        ))}
      </div>
    </div>
  );
};