import { useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import isMobileContext from "../context/isMobileContext";

const Console = () => {
  const isMobile = useContext(isMobileContext)
  const targetRef = useRef(null)
  const [glitchActive, setGlitchActive] = useState(false)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Matrix rain effect
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas')
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'सत्यम्ज्ञानम्विद्याकर्मयोगःधर्मःशान्तिःप्रेमबुद्धिःकौशलम्सृजनात्मकता'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    function draw() {
      ctx.fillStyle = 'rgba(2, 12, 9, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#34d399'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)
    return () => clearInterval(interval)
  }, [])

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 100)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  const codeSnippet = `public class Developer {
  private String name;
  private String role;
  private String[] skills;

  public Developer() {
    this.name = "Shiv Wakchaure";
    this.role = "Java Developer";
    this.skills = new String[]{"Java", "Spring", "React"};
  }
  
  public String build() {
    return "Innovative Solutions";
  }
}`

  return (
    <div ref={targetRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Matrix Rain Background */}
      <canvas
        id="matrix-canvas"
        className="absolute inset-0 opacity-20 pointer-events-none"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy pointer-events-none" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#34d399 1px, transparent 1px), linear-gradient(90deg, #34d399 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <motion.div
        className="w-full max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center z-10"
        style={{ y: yText, opacity: opacityText }}
      >
        {/* Left Side - Text Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={glitchActive ? "glitch" : ""}
          >
            <p className="text-primary font-mono text-xs md:text-base mb-2 tracking-wider">
              $ whoami
            </p>
            <h1 className="text-4xl md:text-7xl font-bold text-slate-100 mb-4 font-mono tracking-tighter">
              SHIV<span className="text-primary">.</span>
            </h1>
            <h2 className="text-xl md:text-4xl font-bold text-slate-400 mb-6 font-mono">
              &lt;JAVA_DEVELOPER /&gt;
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-slate-300 text-lg leading-relaxed max-w-xl"
          >
            I craft <span className="text-primary font-semibold">high-performance</span> backend systems
            and <span className="text-tertiary font-semibold">elegant</span> web experiences.
            Specializing in Java, Spring Boot, and modern web technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="#projects"
              className="group px-6 py-3 border-2 border-primary text-primary font-mono text-sm hover:bg-primary hover:text-navy transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-transparent border-2 border-slate-600 text-slate-300 font-mono text-sm hover:border-tertiary hover:text-tertiary transition-all duration-300"
            >
              GET IN TOUCH
            </a>
          </motion.div>

          {/* Terminal Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-mono text-xs text-slate-500 space-y-1 mt-8"
          >
            <p><span className="text-primary">█</span> System: ONLINE</p>
            <p><span className="text-tertiary">█</span> Skills: LOADED</p>
            <p><span className="text-green-400">█</span> Status: READY_TO_BUILD</p>
          </motion.div>
        </div>

        {/* Right Side - Code Window */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative group"
            style={{ perspective: '1000px' }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />

            {/* Code Window */}
            <div className="relative bg-light-navy/80 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="bg-lightest-navy/50 px-4 py-3 flex items-center gap-2 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs text-slate-400 font-mono">Developer.java</span>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm">
                <pre className="text-slate-300 leading-relaxed">
                  <code>
                    {codeSnippet.split('\n').map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="hover:bg-primary/10 px-2 -mx-2 transition-colors"
                      >
                        <span className="text-slate-600 mr-4 select-none">{String(i + 1).padStart(2, '0')}</span>
                        <span dangerouslySetInnerHTML={{
                          __html: line.replace(
                            /("[^"]*")|\b(public|private|class|void|return|new|this|extends|implements|static|final)\b|\b([A-Z][a-zA-Z0-9_]*)\b|\b([a-z][a-zA-Z0-9_]*)(?=\()|(\.[a-zA-Z0-9_]+)|\b(\d+)\b/g,
                            (match, str, keyword, cls, method, field, num) => {
                              if (str) return `<span class="text-[#6a8759]">${str}</span>`; // Green (Strings)
                              if (keyword) return `<span class="text-[#cc7832] font-semibold">${keyword}</span>`; // Orange (Keywords)
                              if (cls) return `<span class="text-[#a9b7c6]">${cls}</span>`; // Light Grey (Classes)
                              if (method) return `<span class="text-[#ffc66d]">${method}</span>`; // Yellow (Methods)
                              if (field) return `<span class="text-[#9876aa]">${field}</span>`; // Purple (Fields)
                              if (num) return `<span class="text-[#6897bb]">${num}</span>`; // Blue (Numbers)
                              return match;
                            }
                          )
                        }} />
                      </motion.div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            {/* Floating particles */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -right-8 w-16 h-16 border border-primary/30 rounded-lg"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 -left-6 w-20 h-20 border border-tertiary/30 rounded-lg"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-primary/50 text-sm font-mono"
        >
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-primary/50 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .glitch {
          animation: glitch 0.3s;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
      `}</style>
    </div>
  );
};

export default Console;
