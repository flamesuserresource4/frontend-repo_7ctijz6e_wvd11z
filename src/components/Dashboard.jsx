import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Wallet2, ListTree, BadgeCheck } from 'lucide-react'

export default function Dashboard({ user, onGo }) {
  const [summary, setSummary] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    if (!user) return
    fetch(`${baseUrl}/api/dashboard/summary?user_id=${user.id}`)
      .then(r=>r.json()).then(setSummary).catch(()=>{})
  }, [user])

  const metrics = [
    { title: 'Total Rebates Earned', key: 'total_rebates', color: 'from-emerald-500 to-teal-500' },
    { title: "Today's Rebate", key: 'today_rebate', color: 'from-blue-500 to-indigo-500' },
    { title: 'Monthly Rebate', key: 'month_rebate', color: 'from-violet-500 to-purple-500' },
    { title: 'Total Volume Traded', key: 'total_volume', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="px-4 pb-28">
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-sm text-gray-500">Hello, {user?.username || 'Trader'}</p>
          <div className="inline-flex items-center gap-2 text-xs bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-full mt-1">
            <BadgeCheck className="w-3 h-3 text-blue-500"/> Rookie
          </div>
        </div>
        <img src={user?.avatar || `https://api.dicebear.com/7.x/miniavs/svg?seed=${user?.username || 't'}`} alt="avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => onGo('profile')} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        {metrics.map((m, idx) => (
          <motion.div key={m.key} whileHover={{y:-4}} className={`rounded-xl p-4 bg-gradient-to-br ${m.color} text-white shadow`}> 
            <p className="text-xs opacity-80">{m.title}</p>
            <p className="mt-2 text-2xl font-bold">{summary ? (m.key === 'total_volume' ? summary[m.key] : `$${summary[m.key]}`) : '—'}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white dark:bg-black/40 border rounded-xl p-4">
          <h3 className="font-semibold mb-2">Rebates (30 days)</h3>
          <MiniLine data={summary?.series || []} />
        </div>
        <div className="bg-white dark:bg-black/40 border rounded-xl p-4">
          <h3 className="font-semibold mb-2">Volume by Broker</h3>
          <MiniBars data={summary?.volume_by_broker || []} />
        </div>
      </div>

      <div className="fixed right-5 bottom-28 flex flex-col gap-2">
        <button onClick={()=>onGo('brokers')} className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700"><Plus className="w-4 h-4"/> Add Broker</button>
        <button onClick={()=>onGo('withdraw')} className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700"><Wallet2 className="w-4 h-4"/> Withdraw</button>
        <button onClick={()=>onGo('rebates')} className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900 text-white shadow hover:bg-gray-800"><ListTree className="w-4 h-4"/> View Logs</button>
      </div>
    </div>
  )
}

function MiniLine({ data }) {
  // simple SVG line
  const width = 500, height = 140, pad = 24
  const xs = data.map(d=>d.date)
  const ys = data.map(d=>d.rebate)
  const max = Math.max(1, ...ys)
  const pts = ys.map((y,i)=>{
    const x = pad + (i/(Math.max(1, ys.length-1))) * (width-2*pad)
    const yy = height - pad - (y/max)*(height-2*pad)
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

function MiniBars({ data }) {
  const width = 500, height = 160, pad = 24
  const max = Math.max(1, ...data.map(d=>d.volume||0))
  const bw = (width-2*pad)/Math.max(1,data.length)
  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        {data.map((d,i)=>{
          const h = ((d.volume||0)/max)*(height-2*pad)
          return <g key={i}>
            <rect x={pad+i*bw} y={height-pad-h} width={bw-8} height={h} fill="#10b981" rx="6" />
            <text x={pad+i*bw+(bw-8)/2} y={height-6} textAnchor="middle" fontSize="10" className="fill-current text-gray-500">{d.broker}</text>
          </g>
        })}
      </svg>
    </div>
  )
}
