import { useState } from 'react'
import { apiPost } from '../lib/api'

const brokers = ['IC Markets', 'Exness', 'Pepperstone', 'FXTM', 'XM', 'Deriv']

export default function AddBroker() {
  const [form, setForm] = useState({ broker_name: brokers[0], account_number: '', account_type: 'Standard', email: '', auto_sync: true })
  const [success, setSuccess] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const payload = { user_id: 'demo', broker_name: form.broker_name, account_number: form.account_number, account_type: form.account_type, auto_sync: form.auto_sync }
    const res = await apiPost('/api/brokers', payload)
    if (res?.id) {
      setSuccess('Broker Connected Successfully!')
      setTimeout(() => (window.location.href = '/brokers'), 1200)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <h1 className="text-2xl font-bold mb-4">Add Broker Account</h1>
      {success && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-100 text-emerald-700 animate-in">{success}</div>
      )}
      <form onSubmit={submit} className="max-w-lg space-y-4">
        <div>
          <label className="text-sm text-zinc-600">Broker name</label>
          <select value={form.broker_name} onChange={(e) => setForm({ ...form, broker_name: e.target.value })} className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            {brokers.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-zinc-600">Trading account number</label>
          <input required value={form.account_number} onChange={(e) => setForm({ ...form, account_number: e.target.value })} className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" placeholder="12345678" />
        </div>
        <div>
          <label className="text-sm text-zinc-600">Account type</label>
          <select value={form.account_type} onChange={(e) => setForm({ ...form, account_type: e.target.value })} className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <option>Standard</option>
            <option>Raw Spread</option>
            <option>Pro</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-zinc-600">Email used with broker (optional)</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" placeholder="you@example.com" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.auto_sync} onChange={(e) => setForm({ ...form, auto_sync: e.target.checked })} />
          <span>Auto-Sync Trades</span>
        </div>
        <button className="px-5 py-3 rounded-xl bg-indigo-600 text-white shadow hover:shadow-xl transition-all">Connect</button>
      </form>
    </div>
  )
}
