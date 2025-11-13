import { useEffect, useState } from 'react'
import { History } from 'lucide-react'

export default function Withdraw({ user }){
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const [balance, setBalance] = useState(null)
  const [form, setForm] = useState({ amount:'', method:'Bank Transfer', details:'' })
  const [confirm, setConfirm] = useState('')
  const [history, setHistory] = useState([])

  const load = async ()=>{
    const b = await (await fetch(`${baseUrl}/api/balance?user_id=${user.id}`)).json()
    setBalance(b)
    const h = await (await fetch(`${baseUrl}/api/withdrawals?user_id=${user.id}`)).json()
    setHistory(h)
  }
  useEffect(()=>{ if(user) load() },[user])

  const submit = async (e)=>{
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/withdrawals`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      user_id: user.id,
      amount: parseFloat(form.amount),
      method: form.method,
      details: form.details,
    })})
    const data = await res.json()
    if(res.ok){
      setConfirm('Request sent!')
      setForm({amount:'', method:'Bank Transfer', details:''})
      load()
      setTimeout(()=>setConfirm(''), 2500)
    } else {
      setConfirm(data.detail || 'Error')
      setTimeout(()=>setConfirm(''), 2500)
    }
  }

  return (
    <div className="p-4 pb-28">
      <h2 className="text-xl font-semibold">Withdraw Earnings</h2>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        <Card title="Available rebate balance" value={balance? `$${balance.available}`:'—'} />
        <Card title="Locked balance" value={balance? `$${balance.locked}`:'—'} />
        <Card title="Total withdrawn" value={balance? `$${balance.total_withdrawn}`:'—'} />
      </div>

      <form onSubmit={submit} className="mt-6 grid md:grid-cols-3 gap-3 p-4 border rounded-xl bg-white dark:bg-black/40">
        <div>
          <label className="text-sm">Amount</label>
          <input type="number" step="0.01" required className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-black/30" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />
        </div>
        <div>
          <label className="text-sm">Method</label>
          <select className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-black/30" value={form.method} onChange={e=>setForm({...form, method:e.target.value})}>
            <option>Bank Transfer</option>
            <option>USDT</option>
            <option>Mobile Money</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Account details</label>
          <input className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-black/30" value={form.details} onChange={e=>setForm({...form, details:e.target.value})} />
        </div>
        <div className="col-span-full">
          <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Submit</button>
          {confirm && <span className="ml-3 text-sm">{confirm}</span>}
        </div>
      </form>

      <button className="fixed right-5 bottom-28 flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800">
        <History className="w-4 h-4"/> Withdrawal History
      </button>

      <div className="mt-6 p-4 border rounded-xl bg-white dark:bg-black/40">
        <h3 className="font-semibold mb-2">Recent Requests</h3>
        <div className="space-y-2 text-sm">
          {history.map(h => (
            <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5">
              <div>${'{'}h.amount{'}'} — {h.method} • <span className="opacity-60">{h.details}</span></div>
              <span className={`text-xs px-2 py-1 rounded-full ${h.status==='approved'?'bg-emerald-100 text-emerald-700': h.status==='pending'?'bg-amber-100 text-amber-700':'bg-rose-100 text-rose-700'}`}>{h.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Card({ title, value }){
  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-black/40">
      <p className="text-sm opacity-60">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
