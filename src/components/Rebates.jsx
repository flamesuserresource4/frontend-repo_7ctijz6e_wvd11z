import { useEffect, useMemo, useState } from 'react'

export default function Rebates({ user }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const [logs, setLogs] = useState([])
  const [brokers, setBrokers] = useState([])
  const [filters, setFilters] = useState({ broker: '', start: '', end: '', symbol: '', currency: 'USD' })

  useEffect(()=>{
    if(!user) return
    fetch(`${baseUrl}/api/broker-accounts?user_id=${user.id}`).then(r=>r.json()).then(setBrokers)
    load()
  },[user])

  const load = async ()=>{
    const params = new URLSearchParams({ user_id: user.id })
    if (filters.broker) params.set('broker_account_id', filters.broker)
    if (filters.start) params.set('start_date', filters.start)
    if (filters.end) params.set('end_date', filters.end)
    if (filters.symbol) params.set('symbol', filters.symbol)
    const res = await fetch(`${baseUrl}/api/rebate-logs?`+params.toString())
    setLogs(await res.json())
  }

  const csv = useMemo(()=>{
    const header = ['Trade ID','Symbol','Lot size','Commission','Rebate earned','Execution time']
    const rows = logs.map(l=>[l.trade_id,l.symbol,l.volume,l.commission,l.rebate_amount,l.trade_date])
    return [header, ...rows].map(r=>r.join(',')).join('\n')
  },[logs])

  return (
    <div className="p-4 pb-28">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Rebate Breakdown</h2>
        <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`} download="rebates.csv"
           className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Export CSV</a>
      </div>

      <div className="grid md:grid-cols-5 gap-3 mt-4">
        <select value={filters.broker} onChange={e=>setFilters({...filters, broker:e.target.value})} className="p-2 border rounded-lg bg-white dark:bg-black/30">
          <option value="">All brokers</option>
          {brokers.map(b=> <option key={b.id} value={b.id}>{b.broker_name}</option>)}
        </select>
        <input type="date" value={filters.start} onChange={e=>setFilters({...filters, start:e.target.value})} className="p-2 border rounded-lg bg-white dark:bg-black/30"/>
        <input type="date" value={filters.end} onChange={e=>setFilters({...filters, end:e.target.value})} className="p-2 border rounded-lg bg-white dark:bg-black/30"/>
        <input placeholder="Symbol" value={filters.symbol} onChange={e=>setFilters({...filters, symbol:e.target.value})} className="p-2 border rounded-lg bg-white dark:bg-black/30"/>
        <select value={filters.currency} onChange={e=>setFilters({...filters, currency:e.target.value})} className="p-2 border rounded-lg bg-white dark:bg-black/30">
          <option>USD</option>
          <option>NGN</option>
          <option>GBP</option>
          <option>EUR</option>
        </select>
        <button onClick={load} className="md:col-span-5 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Apply Filters</button>
      </div>

      <div className="mt-4 overflow-auto border rounded-xl">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-gray-50 dark:bg-white/10">
            <tr>
              {['Trade ID','Symbol','Lot size','Commission','Rebate earned','Execution time'].map(h=> <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {logs.map(row => (
              <tr key={row.id} className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition">
                <td className="px-3 py-2">{row.trade_id}</td>
                <td className="px-3 py-2">{row.symbol}</td>
                <td className="px-3 py-2">{row.volume}</td>
                <td className="px-3 py-2">{row.commission}</td>
                <td className="px-3 py-2">{row.rebate_amount}</td>
                <td className="px-3 py-2">{new Date(row.trade_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-white dark:bg-black/40 border rounded-xl p-4">
        <h3 className="font-semibold mb-2">Trend</h3>
        <MiniLine data={aggregateByDate(logs)} />
      </div>
    </div>
  )
}

function aggregateByDate(rows){
  const map = {}
  rows.forEach(r=>{
    const d = new Date(r.trade_date).toISOString().slice(0,10)
    map[d] = (map[d]||0)+ (r.rebate_amount||0)
  })
  return Object.entries(map).sort((a,b)=>a[0].localeCompare(b[0])).map(([date,rebate])=>({date, rebate}))
}

function MiniLine({ data }){
  const width = 500, height = 140, pad = 24
  const ys = data.map(d=>d.rebate)
  const max = Math.max(1, ...ys)
  const pts = data.map((d,i)=>{
    const x = pad + (i/(Math.max(1, data.length-1))) * (width-2*pad)
    const yy = height - pad - (d.rebate/max)*(height-2*pad)
    return `${x},${yy}`
  }).join(' ')
  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={pts} />
      </svg>
    </div>
  )
}
