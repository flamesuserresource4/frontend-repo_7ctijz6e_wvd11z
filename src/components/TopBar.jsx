import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function TopBar({ onLangChange, onCurrencyChange, language, currency }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end gap-3 p-4">
      <div className="backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800 shadow-lg rounded-2xl px-3 py-2 flex items-center gap-3 animate-fadeIn">
        <button onClick={() => setDark(v => !v)} className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Toggle theme">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <select value={language} onChange={e => onLangChange(e.target.value)} className="bg-transparent text-sm outline-none">
          <option value="EN">EN</option>
          <option value="FR">FR</option>
          <option value="ES">ES</option>
        </select>
        <select value={currency} onChange={e => onCurrencyChange(e.target.value)} className="bg-transparent text-sm outline-none">
          <option>USD</option>
          <option>NGN</option>
          <option>GBP</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  )
}
