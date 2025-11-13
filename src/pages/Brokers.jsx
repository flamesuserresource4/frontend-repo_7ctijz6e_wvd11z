import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { apiGet } from '../lib/api'

export default function Brokers() {
  const [items, setItems] = useState([])
  useEffect(() => {
    apiGet('/api/brokers?user_id=demo').then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <h1 className="text-2xl font-bold mb-4">Your Broker Accounts</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((b, idx) => (
          <motion.div key={idx} whileHover={{ y: -4 }} className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{b.broker_name}</p>
                <p className="text-sm text-zinc-500">{b.account_type} · {b.account_number}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${b.status === 'Connected' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : b.status === 'Syncing' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{b.status || 'Connected'}</span>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <p>Total Volume: <b>{(b.total_volume || 0).toFixed(2)}</b></p>
              <p>Total Rebates: <b>${(b.total_rebates || 0).toFixed(2)}</b></p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6">
        <a href="/brokers/add" className="px-5 py-3 rounded-xl bg-indigo-600 text-white shadow hover:shadow-xl transition-all inline-block">Connect New Broker Account</a>
      </div>
    </div>
  )
}
