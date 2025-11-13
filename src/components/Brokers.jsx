import { useEffect, useState } from 'react'

export default function Brokers({ user }) {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    if (!user) return
    fetch(`${baseUrl}/api/broker-accounts?user_id=${user.id}`).then(r=>r.json()).then(setItems).catch(()=>{})
  }, [user])

  return (
    <div className="p-4 pb-28">
      <h2 className="text-xl font-semibold">Your Broker Accounts</h2>
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {items.map(b => (
          <div key={b.id} className="p-4 rounded-xl border bg-white dark:bg-black/40 hover:shadow transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={`https://logo.clearbit.com/${b.broker_name?.toLowerCase()}.com`} onError={(e)=>{e.currentTarget.src='https://placehold.co/40x40'}} alt="logo" className="w-10 h-10 rounded"/>
                <div>
                  <p className="font-medium">{b.broker_name}</p>
                  <p className="text-xs text-gray-500">{b.account_type} • {b.account_number}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${b.status==='Connected'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{b.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-lg">
                <p className="opacity-60">Total volume</p>
                <p className="font-semibold">{b.total_volume?.toFixed(2) || 0}</p>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-lg">
                <p className="opacity-60">Total rebates</p>
                <p className="font-semibold">${b.total_rebates?.toFixed(2) || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConnectForm user={user} onAdded={(x)=>setItems([x, ...items])} />
    </div>
  )
}

function ConnectForm({ user, onAdded }){
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const [form, setForm] = useState({broker_name:'', account_number:'', account_type:'', email:'', auto_sync:true})
  const [banner, setBanner] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/broker-accounts`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      user_id: user.id,
      broker_name: form.broker_name,
      account_number: form.account_number,
      account_type: form.account_type,
      auto_sync: form.auto_sync,
    })})
    const data = await res.json()
    if (res.ok){
      setBanner('Broker Connected Successfully!')
      onAdded({id:data.id, ...form, status:'Connected', total_volume:0, total_rebates:0})
      setTimeout(()=>setBanner(''), 2500)
    }
  }

  return (
    <div className="mt-6 p-4 border rounded-xl bg-white dark:bg-black/40">
      <h3 className="font-semibold">Connect New Broker Account</h3>
      {banner && <div className="mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-700 animate-in">{banner}</div>}
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-3 mt-4">
        <div>
          <label className="text-sm">Broker</label>
          <select className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-black/30" value={form.broker_name} onChange={e=>setForm({...form, broker_name:e.target.value})} required>
            <option value="">Select broker</option>
            <option>Exness</option>
            <option>ICMarkets</option>
            <option>FXTM</option>
            <option>Octa</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Trading account number</label>
          <input className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-black/30" value={form.account_number} onChange={e=>setForm({...form, account_number:e.target.value})} required />
        </div>
        <div>
          <label className="text-sm">Account type</label>
          <select className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-black/30" value={form.account_type} onChange={e=>setForm({...form, account_type:e.target.value})} required>
            <option value="">Select type</option>
            <option>Standard</option>
            <option>Pro</option>
            <option>Raw</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Email with broker (optional)</label>
          <input className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-black/30" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </div>
        <div className="col-span-full flex items-center gap-2 mt-2">
          <input id="auto" type="checkbox" checked={form.auto_sync} onChange={e=>setForm({...form, auto_sync:e.target.checked})} />
          <label htmlFor="auto" className="text-sm">Auto-Sync Trades</label>
        </div>
        <div className="col-span-full">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Connect</button>
        </div>
      </form>
    </div>
  )
}
