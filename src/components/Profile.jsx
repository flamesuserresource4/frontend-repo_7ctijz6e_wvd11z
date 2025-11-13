export default function Profile({ user, setTheme, language, setLanguage, currency, setCurrency }){
  return (
    <div className="p-4 pb-28">
      <h2 className="text-xl font-semibold">Profile & Settings</h2>

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-xl bg-white dark:bg-black/40">
          <h3 className="font-semibold mb-2">User Info</h3>
          <div className="flex items-center gap-3">
            <img src={user?.avatar || `https://api.dicebear.com/7.x/miniavs/svg?seed=${user?.username || 't'}`} alt="avatar" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-medium">{user?.username}</p>
              <p className="text-sm opacity-70">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg:black/40">
          <h3 className="font-semibold mb-2">Preferences</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Theme</span>
              <select onChange={e=>setTheme(e.target.value)} defaultValue={document.documentElement.classList.contains('dark')?'dark':'light'} className="p-2 border rounded-lg bg-white dark:bg-black/30">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Language</span>
              <select value={language} onChange={e=>setLanguage(e.target.value)} className="p-2 border rounded-lg bg-white dark:bg-black/30">
                <option>EN</option>
                <option>FR</option>
                <option>ES</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Currency</span>
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="p-2 border rounded-lg bg-white dark:bg-black/30">
                <option>USD</option>
                <option>NGN</option>
                <option>GBP</option>
                <option>EUR</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4"/>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg:black/40">
          <h3 className="font-semibold mb-2">Security</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Change password</span>
              <button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white">Update</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Two-factor authentication</span>
              <input type="checkbox" className="w-4 h-4"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
