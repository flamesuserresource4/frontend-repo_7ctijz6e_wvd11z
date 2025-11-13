import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Wallet, BookOpen, CircleUserRound } from 'lucide-react'
import { apiGet } from '../lib/api'

const Card = ({ title, value }) => (
  <motion.div whileHover={{ y: -4 }} className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
    <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </motion.div>
)

export default function Dashboard() {
  const [username] = useState('Trader')
  const [summary, setSummary] = useState({ totals: { total_rebates: 0, todays_rebate: 0, monthly_rebate: 0, total_volume: 0 }, rebates_30d: [], volume_by_broker: [] })

  useEffect(() => {
    apiGet(`/api/dashboard/summary?user_id=demo`).then(setSummary).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 cursor-pointer flex items-center justify-center text-white" onClick={() => (window.location.href = '/profile')}>
            <CircleUserRound size={22} />
          </div>
          <div>
            <p className="text-sm text-zinc-500">Hello, {username}</p>
            <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Rookie</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card title="Total Rebates Earned" value={`$${summary.totals.total_rebates.toFixed(2)}`} />
        <Card title="Today's Rebate" value={`$${summary.totals.todays_rebate.toFixed(2)}`} />
        <Card title="Monthly Rebate" value={`$${summary.totals.monthly_rebate.toFixed(2)}`} />
        <Card title="Total Volume Traded" value={summary.totals.total_volume.toFixed(2)} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 mb-2">Rebates - Last 30 Days</p>
          <div className="h-40 w-full grid grid-cols-30 gap-1 items-end">
            {summary.rebates_30d.map((d, i) => (
              <div key={i} className="bg-indigo-500/70 dark:bg-indigo-400/70 rounded" style={{ height: `${Math.min(100, d.value)}%` }} title={`${d.date}: ${d.value.toFixed(2)}`} />
            ))}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 mb-2">Volume by Broker</p>
          <div className="h-40 w-full flex items-end gap-2">
            {summary.volume_by_broker.map((b, i) => (
              <div key={i} className="flex-1">
                <div className="h-32 bg-purple-500/70 dark:bg-purple-400/70 rounded" style={{ height: `${Math.min(100, b.value)}%` }} title={`${b.name}: ${b.value}`} />
                <p className="text-xs mt-1 text-center text-zinc-500">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-28 right-5 flex flex-col gap-3">
        <button onClick={() => (window.location.href = '/brokers/add')} className="px-4 py-2 rounded-full bg-indigo-600 text-white shadow hover:shadow-xl transition-all flex items-center gap-2"><Plus size={16} /> Add Broker</button>
        <button onClick={() => (window.location.href = '/withdraw')} className="px-4 py-2 rounded-full bg-emerald-600 text-white shadow hover:shadow-xl transition-all flex items-center gap-2"><Wallet size={16} /> Withdraw</button>
        <button onClick={() => (window.location.href = '/rebates')} className="px-4 py-2 rounded-full bg-zinc-900 text-white shadow hover:shadow-xl transition-all flex items-center gap-2"><BookOpen size={16} /> View Logs</button>
      </div>
    </div>
  )
}
