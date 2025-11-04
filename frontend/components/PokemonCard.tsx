"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Pokemon } from "@/contexts/PokemonContext"

interface PokemonCardProps {
  pokemon: Pokemon
  onCardClick: (pokemon: Pokemon) => void
  onToggleFavorite: (id: number) => void
}

export default function PokemonCard({ pokemon, onCardClick, onToggleFavorite }: PokemonCardProps) {
  const getTypeColor = (type: string) => {
    const colors = {
      "Fogo": "from-red-500 to-orange-500",
      "Água": "from-blue-500 to-cyan-500",
      "Planta": "from-green-500 to-emerald-500",
      "Elétrico": "from-yellow-500 to-amber-500",
      "Psíquico": "from-purple-500 to-pink-500"
    }
    return colors[type as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer h-[420px] flex flex-col"
      onClick={() => onCardClick(pokemon)}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between p-4 bg-[#F5F7FB] h-[80px]">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(pokemon.type)} rounded-xl flex items-center justify-center shadow-sm`}>
            <span className="text-white font-bold text-sm">#{pokemon.id}</span>
          </div>
          <span className="font-semibold text-gray-900 truncate">{pokemon.name}</span>
        </div>
      </div>

      {/* Card Image */}
      <div className="relative bg-white p-6 flex items-center justify-center h-[240px]">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Image 
            src={pokemon.image} 
            alt={pokemon.name} 
            width={180} 
            height={180} 
            className="drop-shadow-2xl object-contain max-w-[180px] max-h-[180px]" 
          />
        </motion.div>
      </div>

      {/* Card Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(pokemon.type)} text-white`}>
            {pokemon.type}
          </span>
          <span className="text-xs text-gray-500">{pokemon.rarity}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-3 text-[#2B4C9E] font-semibold hover:bg-[#F5F7FB] rounded-xl transition-colors"
        >
          Ver Detalhes
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  )
}
