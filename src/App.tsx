import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import LogoLoader from './components/LogoLoader.jsx'

function AppLayout() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // initial load
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // show loader briefly on route changes
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <>
      <LogoLoader visible={loading} text="TJ TTC" />
      <NavBar />
      <Outlet />
    </>
  )
}

export default AppLayout
