import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Brokers from './pages/Brokers'
import AddBroker from './pages/AddBroker'
import Rebates from './pages/Rebates'
import Withdraw from './pages/Withdraw'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'
import TopBar from './components/TopBar'

function AppShell() {
  const [language, setLanguage] = useState('EN')
  const [currency, setCurrency] = useState('USD')
  const location = useLocation()

  useEffect(() => {
    document.body.classList.add('animate-in')
    return () => document.body.classList.remove('animate-in')
  }, [location.pathname])

  return (
    <>
      <TopBar language={language} currency={currency} onLangChange={setLanguage} onCurrencyChange={setCurrency} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brokers" element={<Brokers />} />
        <Route path="/brokers/add" element={<AddBroker />} />
        <Route path="/rebates" element={<Rebates />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div className="min-h-screen grid place-items-center"><div className="text-center"><p className="text-2xl font-bold mb-3">Page not found</p><Link className="underline" to="/">Go Home</Link></div></div>} />
      </Routes>
      <BottomNav />
    </>
  )
}

export default function App(){
  return <AppShell />
}
