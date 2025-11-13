import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Rebates() {
  const [logs, setLogs] = useState([])
  const [broker, setBroker] = useState('')
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    apiGet('/api/rebates/logs?user_id=demo&limit=500').then(setLogs).catch(() => setLogs([]))
  }, [])

  const filtered = useMemo(() => logs.filter(l => (broker ? l.broker_account_id === broker : true)), [logs, broker])

  const exportCsv = () => {
    const headers = ['Trade ID','Symbol','Lot size','Commission','Rebate earned','Execution time']
    const rows = filtered.map(l => [l.trade_id, l.symbol, l.volume, l.commission, l.rebate_amount, l.trade_date])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rebates.csv'
    a.click()
  }

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Rebate Breakdown</h1>
        <button onClick={exportCsv} className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">Export CSV</button>
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-4 text-sm">
        <select className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" value={broker} onChange={e => setBroker(e.target.value)}>
          <option value="">All Brokers</option>
        </select>
        <input type="date" className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" />
        <select className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <option>All Trades</option>
        </select>
        <select className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" value={currency} onChange={e => setCurrency(e.target.value)}>
          <option>USD</option>
          <option>NGN</option>
          <option>GBP</option>
          <option>EUR</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/60">
            <tr>
              <th className="p-3 text-left">Trade ID</th>
              <th className="p-3 text-left">Symbol</th>
              <th className="p-3 text-left">Lot size</th>
              <th className="p-3 text-left">Commission</th>
              <th className="p-3 text-left">Rebate earned</th>
              <th className="p-3 text-left">Execution time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3">{l.trade_id}</td>
                <td className="p-3">{l.symbol}</td>
                <td className="p-3">{l.volume}</td>
                <td className="p-3">{l.commission}</td>
                <td className="p-3">{l.rebate_amount}</td>
                <td className="p-3">{new Date(l.trade_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 mb-2">Trend</p>
        <div className="h-32 w-full flex items-end gap-1">
          {filtered.slice(0, 40).map((l, i) => (
            <div key={i} className="flex-1 bg-indigo-500/70 dark:bg-indigo-400/70 rounded" style={{ height: `${Math.min(100, Math.abs(l.rebate_amount))}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
