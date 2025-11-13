import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onLogin, onSignup }) {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-black/60 dark:via-black/30 dark:to-black/80 pointer-events-none"/>
      </div>

      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          PAYDOT
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700 dark:text-gray-300">Turn every trade into income.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={onLogin} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow">
            Login
          </button>
          <button onClick={onSignup} className="px-5 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition shadow">
            Create Account
          </button>
        </div>
      </motion.div>

      <button className="fixed right-6 bottom-24 md:bottom-28 z-30 px-4 py-2 rounded-full bg-white/90 dark:bg-black/50 border backdrop-blur hover:shadow transition">
        Learn More
      </button>
    </div>
  )
}
