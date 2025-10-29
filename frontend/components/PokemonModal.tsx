"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Heart, Zap, Shield } from "lucide-react"
import { Pokemon } from "@/contexts/PokemonContext"

interface PokemonModalProps {
  pokemon: Pokemon | null
  isOpen: boolean
  onClose: () => void
  onToggleFavorite: (id: number) => void
}

export default function PokemonModal({ pokemon, isOpen, onClose, onToggleFavorite }: PokemonModalProps) {
  if (!pokemon) return null

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

  const getRarityColor = (rarity: string) => {
    const colors = {
      "Comum": "text-gray-600",
      "Incomum": "text-green-600",
      "Rara": "text-blue-600",
      "Ultra Rara": "text-purple-600"
    }
    return colors[rarity as keyof typeof colors] || "text-gray-600"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${getTypeColor(pokemon.type)} p-6 text-white relative`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{pokemon.name}</h2>
                  <p className="text-white/80">#{pokemon.id.toString().padStart(3, '0')}</p>
                </div>
                <button
                  onClick={() => onToggleFavorite(pokemon.id)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Heart 
                    size={24} 
                    className={pokemon.isFavorite ? "fill-red-500 text-red-500" : "text-white"} 
                  />
                </button>
              </div>

              <div className="flex items-center justify-center">
                <Image 
                  src={pokemon.image} 
                  alt={pokemon.name} 
                  width={150} 
                  height={150} 
                  className="drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Type and Rarity */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Tipo:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getTypeColor(pokemon.type)} text-white`}>
                    {pokemon.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Raridade:</span>
                  <span className={`font-semibold ${getRarityColor(pokemon.rarity)}`}>
                    {pokemon.rarity}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-red-500" />
                      <span className="text-sm">HP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(pokemon.hp / 200) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8">{pokemon.hp}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-orange-500" />
                      <span className="text-sm">Ataque</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${(pokemon.attack / 200) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8">{pokemon.attack}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-blue-500" />
                      <span className="text-sm">Defesa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(pokemon.defense / 200) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8">{pokemon.defense}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pokemon.description}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}