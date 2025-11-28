import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import AppLayout from './App'
import Landing from './pages/Landing'
import Table from './pages/Table'
import Fixtures from './pages/Fixtures'
import Matches from './pages/Matches'
import MatchDetails from './pages/MatchDetails'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}> 
          <Route index element={<Landing />} />
          <Route path="table" element={<Table />} />
          <Route path="fixtures" element={<Fixtures />} />
          <Route path="matches" element={<Matches />} />
          <Route path="matches/:id" element={<MatchDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
