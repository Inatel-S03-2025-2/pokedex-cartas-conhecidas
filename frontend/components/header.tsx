"use client"

import { Search } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  title: string
  subtitle?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export default function Header({ title, subtitle, searchValue = "", onSearchChange }: HeaderProps) {
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
          {onSearchChange && (
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar Pokémon..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 py-2 bg-[#E8EBF5] rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] w-80 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}
