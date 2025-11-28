import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import LogoLoader from './components/LogoLoader'

const AppLayout: React.FC = () => {
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
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
