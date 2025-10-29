"use client"


import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutGrid, LogOut } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-[#2B4C9E] text-white flex flex-col shadow-2xl"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Image src="/log.png" alt="Pokédex Logo" width={150} height={45} className="brightness-0 invert" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <Link href="/collection">
          <motion.div
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === "/collection" ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
            }`}
          >
            <LayoutGrid size={20} />
            <span className="font-semibold">Coleção</span>
          </motion.div>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-bold">TS</span>
          </div>
          <div>
            <p className="text-sm font-semibold">Tech Startup</p>
            <p className="text-xs text-white/70">startup@maker.com.br</p>
          </div>
        </div>

        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            <span>Sair</span>
          </motion.button>
        </Link>

        <p className="text-xs text-white/50 mt-4">©2025 Scooter Tech Studio</p>
      </div>
    </motion.aside>
  )
}
