"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { User, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation - in production, use proper authentication
    if (username && password) {
      router.push("/collection")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-[#1a2847] to-[#2B4C9E]"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image src="/log.png" alt="Pokédex Logo" width={200} height={60} priority />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">LOGIN</h1>
            <p className="text-center text-gray-600 mb-8 text-sm">Gerencie sua coleção de cartas Pokémon</p>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F7FB] rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] transition-all text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F7FB] rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] transition-all text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-[#2B4C9E] text-white rounded-xl font-semibold hover:bg-[#1E3A7A] transition-colors shadow-lg"
              >
                Login
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Lugia Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#1a2847] to-[#2B4C9E] items-center justify-center overflow-hidden"
      >
        {/* Decorative curves */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
            <path d="M0 400C200 300 400 500 800 400" stroke="#4A6FBF" strokeWidth="60" />
            <path d="M0 600C200 500 400 700 800 600" stroke="#4A6FBF" strokeWidth="60" />
          </svg>
        </div>

        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="relative z-10"
        >
          <Image src="/login.png" alt="Lugia Pokémon" width={500} height={500} priority className="drop-shadow-2xl" />
        </motion.div>
      </motion.div>
    </div>
  )
}
