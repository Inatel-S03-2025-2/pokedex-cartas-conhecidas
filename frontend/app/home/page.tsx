"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/header"
import { usePokemon } from "@/contexts/PokemonContext"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function HomePage() {
  const { getStats, error, retryFetch, loading } = usePokemon()
  const [imageError, setImageError] = useState(false)
  
  let stats = { total: 0, types: 0, rare: 0 }
  
  try {
    stats = getStats()
  } catch (err) {
    console.error('Erro ao obter estatísticas:', err)
  }

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
            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-8 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Erro ao Carregar Dados
                    </h3>
                    <p className="text-red-700 mb-4">{error}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={retryFetch}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                      {loading ? 'Carregando...' : 'Tentar Novamente'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

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
                  {imageError ? (
                    <div className="flex items-center justify-center h-[400px] text-gray-400">
                      <div className="text-center">
                        <AlertCircle size={48} className="mx-auto mb-2" />
                        <p>Imagem não disponível</p>
                      </div>
                    </div>
                  ) : (
                    <Image 
                      src="/pokemon.png" 
                      alt="Pokémon" 
                      width={400} 
                      height={400} 
                      className="drop-shadow-2xl"
                      onError={() => {
                        console.error('Erro ao carregar imagem do Pokémon')
                        setImageError(true)
                      }}
                      priority
                    />
                  )}
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
                {loading ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-[#2B4C9E] border-t-transparent rounded-full"
                    />
                  </div>
                ) : error ? (
                  <p className="text-2xl font-bold text-red-500">--</p>
                ) : (
                  <p className="text-4xl font-bold text-[#2B4C9E]">{stats.total}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tipos Diferentes</h3>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-[#2B4C9E] border-t-transparent rounded-full"
                    />
                  </div>
                ) : error ? (
                  <p className="text-2xl font-bold text-red-500">--</p>
                ) : (
                  <p className="text-4xl font-bold text-[#2B4C9E]">{stats.types}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Cartas Raras</h3>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-[#2B4C9E] border-t-transparent rounded-full"
                    />
                  </div>
                ) : error ? (
                  <p className="text-2xl font-bold text-red-500">--</p>
                ) : (
                  <p className="text-4xl font-bold text-[#2B4C9E]">{stats.rare}</p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}