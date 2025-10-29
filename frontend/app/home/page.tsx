"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/header"
import { usePokemon } from "@/contexts/PokemonContext"

export default function HomePage() {
  const { getStats } = usePokemon()
  const stats = getStats()

  return (
    <div className="flex min-h-screen bg-[#E8EBF5]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="Início" />

        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-12 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao Pokédex</h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Gerencie sua coleção de cartas Pokémon de forma simples e organizada.
                  </p>
                  <Link href="/collection">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-[#2B4C9E] text-white rounded-xl font-semibold hover:bg-[#1E3A7A] transition-colors shadow-lg"
                    >
                      Ver Minha Coleção
                    </motion.button>
                  </Link>
                </div>
                <div className="flex-1">
                  <Image src="/pokemon.png" alt="Pokémon" width={400} height={400} className="drop-shadow-2xl" />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total de Cartas</h3>
                <p className="text-4xl font-bold text-[#2B4C9E]">{stats.total}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tipos Diferentes</h3>
                <p className="text-4xl font-bold text-[#2B4C9E]">{stats.types}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Cartas Raras</h3>
                <p className="text-4xl font-bold text-[#2B4C9E]">{stats.rare}</p>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
