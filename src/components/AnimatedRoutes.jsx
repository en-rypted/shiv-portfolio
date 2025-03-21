import React from 'react'
import { Route, Routes ,useLocation} from 'react-router-dom'
import Console from './Console'
import { About } from './About'
import { AnimatePresence } from "motion/react"
import { Projects } from './Projects'
import { Skills } from './Skills'

export const AnimatedRoutes = () => {
    const location = useLocation()
  return (
    <AnimatePresence>

   
  <Routes location={location}  key={location.pathname}>        
    <Route path="/"  element={<Console/>} />
    <Route path="/about"  element={<About/>}/>
    <Route path="/projects"  element={<Projects/>}/>
    <Route path="/skills"  element={<Skills/>}/>
  </Routes>
  </AnimatePresence>
  )
}
