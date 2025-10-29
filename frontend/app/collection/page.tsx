"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/header"
import PokemonCard from "@/components/PokemonCard"
import PokemonModal from "@/components/PokemonModal"
import { ChevronDown } from "lucide-react"
import { usePokemon, Pokemon } from "@/contexts/PokemonContext"

export default function CollectionPage() {
  const { pokemons, selectedPokemon, setSelectedPokemon, toggleFavorite } = usePokemon()
  const [typeFilter, setTypeFilter] = useState("Todos os Tipos")
  const [rarityFilter, setRarityFilter] = useState("Todas as Raridade")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPokemons = useMemo(() => {
    let filtered = pokemons
    
    if (searchQuery) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (typeFilter !== "Todos os Tipos") {
      filtered = filtered.filter(pokemon => pokemon.type === typeFilter)
    }
    
    if (rarityFilter !== "Todas as Raridade") {
      filtered = filtered.filter(pokemon => pokemon.rarity === rarityFilter)
    }
    
    return filtered
  }, [pokemons, typeFilter, rarityFilter, searchQuery])

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
  }

  const handleCloseModal = () => {
    setSelectedPokemon(null)
  }

  return (
    <div className="flex min-h-screen bg-[#E8EBF5]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header 
          title="Minha Coleção" 
          subtitle={`${filteredPokemons.length} cartas encontradas`}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-white text-gray-700 px-6 py-3 pr-12 rounded-xl border-none shadow-md focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] cursor-pointer min-w-[200px]"
                >
                  <option>Todos os Tipos</option>
                  <option>Água</option>
                  <option>Fogo</option>
                  <option>Planta</option>
                  <option>Elétrico</option>
                  <option>Psíquico</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>

              <div className="relative">
                <select
                  value={rarityFilter}
                  onChange={(e) => setRarityFilter(e.target.value)}
                  className="appearance-none bg-white text-gray-700 px-6 py-3 pr-12 rounded-xl border-none shadow-md focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] cursor-pointer min-w-[200px]"
                >
                  <option>Todas as Raridade</option>
                  <option>Comum</option>
                  <option>Incomum</option>
                  <option>Rara</option>
                  <option>Ultra Rara</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Pokemon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPokemons.map((pokemon, index) => (
                <motion.div
                  key={pokemon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <PokemonCard 
                    pokemon={pokemon}
                    onCardClick={handleCardClick}
                    onToggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={handleCloseModal}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}
