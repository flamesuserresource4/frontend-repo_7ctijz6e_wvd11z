import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-600 animate-[pulse_8s_ease-in-out_infinite] opacity-20" />
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center px-6">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-300 drop-shadow-md">PAYDOT</h1>
          <p className="mt-4 text-lg sm:text-xl text-zinc-100">Turn every trade into income.</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-white text-zinc-900 font-semibold shadow hover:shadow-xl transition-all">Login</Link>
            <Link to="/dashboard" className="px-6 py-3 rounded-xl border border-white/70 text-white font-semibold hover:bg-white/10 transition-all">Create Account</Link>
          </div>
        </motion.div>
      </div>

      <Link to="/rebates" className="fixed bottom-6 right-6 z-20 px-4 py-2 rounded-full backdrop-blur bg-white/80 text-zinc-900 shadow hover:shadow-xl transition-all">Learn More</Link>
    </div>
  )
}
