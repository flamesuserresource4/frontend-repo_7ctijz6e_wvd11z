import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Withdraw() {
  const [balance, setBalance] = useState({ available: 0, locked: 0, total_withdrawn: 0 })
  const [form, setForm] = useState({ amount: '', method: 'Bank Transfer', details: '' })
  const [popup, setPopup] = useState('')

  useEffect(() => {
    async function load() {
      const summary = await apiGet('/api/dashboard/summary?user_id=demo').catch(() => ({ totals: { total_rebates: 0 } }))
      const withdrawals = await apiGet('/api/withdrawals?user_id=demo').catch(() => [])
      const approved = withdrawals.filter(w => w.status === 'approved').reduce((a, b) => a + (b.amount || 0), 0)
      setBalance({ available: (summary.totals?.total_rebates || 0) - approved, locked: 0, total_withdrawn: approved })
    }
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const res = await apiPost('/api/withdrawals', { user_id: 'demo', amount: Number(form.amount), method: form.method, details: form.details })
    if (res?.id) {
      setPopup('Withdrawal request submitted')
      setTimeout(() => setPopup(''), 1500)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">Available rebate balance</p>
        <p className="text-3xl font-bold">${balance.available.toFixed(2)}</p>
        <div className="flex gap-6 text-sm text-zinc-500 mt-2">
          <p>Locked: ${balance.locked.toFixed(2)}</p>
          <p>Total withdrawn: ${balance.total_withdrawn.toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 max-w-lg space-y-4">
        <div>
          <label className="text-sm text-zinc-600">Amount</label>
          <input required type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" />
        </div>
        <div>
          <label className="text-sm text-zinc-600">Method</label>
          <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <option>Bank Transfer</option>
            <option>USDT</option>
            <option>Mobile Money</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-zinc-600">Account details</label>
          <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" placeholder="Bank/Wallet details..." />
        </div>
        <button className="px-5 py-3 rounded-xl bg-emerald-600 text-white shadow hover:shadow-xl transition-all">Submit</button>
      </form>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-in">
            <p className="font-semibold">{popup}</p>
          </div>
        </div>
      )}

      <button onClick={() => (window.location.href = '/withdrawals') } className="fixed bottom-28 right-6 px-4 py-2 rounded-full bg-white text-zinc-900 shadow border border-zinc-200 hover:shadow-xl">Withdrawal History</button>
    </div>
  )
}
