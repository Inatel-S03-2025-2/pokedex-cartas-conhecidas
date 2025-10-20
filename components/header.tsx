"use client"

import { Search, Bell } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E8EBF5] rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-[#2B4C9E] rounded" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Pesquisar"
              className="pl-12 pr-4 py-2 bg-[#E8EBF5] rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] w-80 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-10 h-10 bg-[#2B4C9E] rounded-xl flex items-center justify-center text-white hover:bg-[#1E3A7A] transition-colors"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
