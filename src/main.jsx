import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import AppLayout from './App.jsx'
import Landing from './pages/Landing.jsx'
import TablePage from './pages/Table.jsx'
import FixturesPage from './pages/Fixtures.jsx'
import MatchesPage from './pages/Matches.jsx'
import MatchDetailsPage from './pages/MatchDetails.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}> 
          <Route index element={<Landing />} />
          <Route path="table" element={<TablePage />} />
          <Route path="fixtures" element={<FixturesPage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="matches/:id" element={<MatchDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
