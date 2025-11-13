import { Home, Wallet, Building2, BarChart3, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/brokers', label: 'Brokers', icon: Building2 },
  { to: '/rebates', label: 'Rebates', icon: BarChart3 },
  { to: '/withdraw', label: 'Withdraw', icon: Wallet },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 shadow-xl rounded-2xl px-3 py-2 flex gap-1">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to
          return (
            <Link key={to} to={to} className={`group flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${active ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Icon size={18} className="shrink-0" />
              <span className="text-sm hidden sm:block">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
