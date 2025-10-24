"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ArrowRight } from "lucide-react"

interface PokemonCardProps {
  id: number
  name: string
  image: string
  isFavorite: boolean
}

export default function PokemonCard({ id, name, image, isFavorite }: PokemonCardProps) {
  const [favorite, setFavorite] = useState(isFavorite)

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between p-4 bg-[#F5F7FB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Image src="/login.png" alt={name} width={32} height={32} className="object-contain" />
          </div>
          <span className="font-semibold text-gray-900">{name}</span>
        </div>

        
      </div>

      {/* Card Image */}
      <div className="relative bg-gradient-to-br from-[#2B4C9E] to-[#1E3A7A] p-8 flex items-center justify-center min-h-[250px]">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Image src={image || "login.png"} alt={name} width={200} height={200} className="drop-shadow-2xl" />
        </motion.div>
      </div>

      {/* Card Footer */}
      <div className="p-4">
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
