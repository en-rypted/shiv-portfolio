import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import isMobileContext from './context/isMobileContext'
import { useMediaQuery } from 'react-responsive'
import authContext from './context/authContext'
import { auth } from './config/firebase'
import { Home } from './components/Home'
import { AdminDashboard } from './components/Admin/AdminDashboard'

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null)
    })
    return () => unsubscribe()
  }, [])

  return (
    <isMobileContext.Provider value={isMobile}>
      <authContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </authContext.Provider>
    </isMobileContext.Provider>
  )
}

export default App
