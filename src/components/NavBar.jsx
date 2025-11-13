import { useEffect } from 'react'
import { Home, Building2, PiggyBank, Wallet2, User, Globe, DollarSign, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NavBar({ theme, setTheme, language, setLanguage, currency, setCurrency, current, setCurrent }) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'brokers', label: 'Brokers', icon: Building2 },
    { key: 'rebates', label: 'Rebates', icon: PiggyBank },
    { key: 'withdraw', label: 'Withdraw', icon: Wallet2 },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <>
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur border hover:shadow transition"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
        </button>
        <div className="flex items-center gap-1 bg-white/70 dark:bg-black/40 backdrop-blur rounded px-2 py-1 border">
          <Globe className="w-4 h-4 opacity-70" />
          <select value={language} onChange={e=>setLanguage(e.target.value)} className="bg-transparent text-sm outline-none">
            <option>EN</option>
            <option>FR</option>
            <option>ES</option>
          </select>
        </div>
        <div className="flex items-center gap-1 bg-white/70 dark:bg-black/40 backdrop-blur rounded px-2 py-1 border">
          <DollarSign className="w-4 h-4 opacity-70" />
          <select value={currency} onChange={e=>setCurrency(e.target.value)} className="bg-transparent text-sm outline-none">
            <option>USD</option>
            <option>NGN</option>
            <option>GBP</option>
            <option>EUR</option>
          </select>
        </div>
      </div>

      <div className="fixed bottom-4 inset-x-0 z-40 px-4">
        <div className="mx-auto max-w-md bg-white/80 dark:bg-black/40 backdrop-blur border rounded-2xl shadow-lg">
          <div className="grid grid-cols-5">
            {tabs.map((t) => {
              const Icon = t.icon
              const active = current === t.key
              return (
                <button key={t.key} onClick={()=>setCurrent(t.key)}
                  className={`relative flex flex-col items-center justify-center py-3 text-xs transition ${active? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  {active && (
                    <motion.span layoutId="pill" className="absolute inset-0 rounded-2xl bg-blue-50/80 dark:bg-blue-500/10" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="mt-1">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
