export default function Profile(){
  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <h1 className="text-2xl font-bold mb-4">Profile & Settings</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-3">User Info</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
            <div>
              <p className="font-semibold">Trader</p>
              <p className="text-sm text-zinc-500">trader@example.com</p>
              <p className="text-xs text-zinc-500">Joined: 2024-01-01</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-3">Preferences</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span>Theme</span><span>System</span></div>
            <div className="flex items-center justify-between"><span>Language</span><span>EN</span></div>
            <div className="flex items-center justify-between"><span>Currency</span><span>USD</span></div>
            <div className="flex items-center justify-between"><span>Notifications</span><span>Enabled</span></div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 md:col-span-2">
          <h2 className="font-semibold mb-3">Security</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <button className="px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">Change Password</button>
            <button className="px-4 py-3 rounded-xl bg-indigo-600 text-white">Two-factor Authentication</button>
          </div>
        </div>
      </div>
    </div>
  )
}
