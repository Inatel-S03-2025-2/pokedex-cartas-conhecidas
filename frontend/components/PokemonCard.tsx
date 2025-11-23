"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ImageOff } from "lucide-react"
import { Pokemon } from "@/contexts/PokemonContext"

interface PokemonCardProps {
  pokemon: Pokemon
  onCardClick: (pokemon: Pokemon) => void
  onToggleFavorite: (id: number) => void
}

export default function PokemonCard({ pokemon, onCardClick, onToggleFavorite }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const getTypeColor = (type: string) => {
    const colors = {
      "Fogo": "from-red-500 to-orange-500",
      "Água": "from-blue-500 to-cyan-500",
      "Planta": "from-green-500 to-emerald-500",
      "Elétrico": "from-yellow-500 to-amber-500",
      "Psíquico": "from-purple-500 to-pink-500",
      "Normal": "from-gray-500 to-slate-500",
      "Fantasma": "from-indigo-500 to-purple-500",
      "Gelo": "from-cyan-500 to-blue-500"
    }
    return colors[type as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  const handleCardClick = () => {
    try {
      onCardClick(pokemon)
    } catch (error) {
      console.error('Erro ao clicar no card:', error)
    }
  }

  const handleImageError = () => {
    console.warn(`Erro ao carregar imagem do Pokémon ${pokemon.name}`)
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer h-[420px] flex flex-col"
      onClick={handleCardClick}
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
        {imageError ? (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageOff size={48} className="mb-2" />
            <span className="text-sm">Imagem não disponível</span>
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-[#2B4C9E] border-t-transparent rounded-full"
                />
              </div>
            )}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className={imageLoading ? "opacity-0" : "opacity-100"}
            >
              <Image 
                src={pokemon.image} 
                alt={pokemon.name} 
                width={180} 
                height={180} 
                className="drop-shadow-2xl object-contain max-w-[180px] max-h-[180px]"
                onError={handleImageError}
                onLoad={handleImageLoad}
                priority={false}
              />
            </motion.div>
          </>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(pokemon.type)} text-white`}>
            {pokemon.type}
          </span>
          <span className="text-xs text-gray-500">{pokemon.rarity}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-3 text-[#2B4C9E] font-semibold hover:bg-[#F5F7FB] rounded-xl transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            handleCardClick()
          }}
        >
          Ver Detalhes
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  )
}