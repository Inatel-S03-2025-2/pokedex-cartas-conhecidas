"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/header"
import PokemonCard from "@/components/PokemonCard"
import PokemonModal from "@/components/PokemonModal"
import { ChevronDown, AlertCircle, RefreshCw } from "lucide-react"
import { usePokemon, Pokemon } from "@/contexts/PokemonContext"

export default function CollectionPage() {
  const { pokemons, selectedPokemon, setSelectedPokemon, toggleFavorite, loading, error, retryFetch } = usePokemon()
  const [typeFilter, setTypeFilter] = useState("Todos os Tipos")
  const [rarityFilter, setRarityFilter] = useState("Todas as Raridade")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPokemons = useMemo(() => {
    try {
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
    } catch (err) {
      console.error('Erro ao filtrar pokémons:', err)
      return pokemons
    }
  }, [pokemons, typeFilter, rarityFilter, searchQuery])

  const handleCardClick = (pokemon: Pokemon) => {
    try {
      setSelectedPokemon(pokemon)
    } catch (err) {
      console.error('Erro ao selecionar pokémon:', err)
    }
  }

  const handleCloseModal = () => {
    try {
      setSelectedPokemon(null)
    } catch (err) {
      console.error('Erro ao fechar modal:', err)
    }
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
                      Erro ao Carregar Pokémons
                    </h3>
                    <p className="text-red-700 mb-4">{error}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={retryFetch}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      <RefreshCw size={18} />
                      Tentar Novamente
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Filters */}
            {!error && (
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
                    <option>Normal</option>
                    <option>Fantasma</option>
                    <option>Gelo</option>
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
            )}

            {/* Pokemon Grid */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-[#2B4C9E] border-t-transparent rounded-full mb-4"
                />
                <div className="text-xl text-gray-600">Carregando Pokémons...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">Não foi possível carregar os Pokémons</p>
                </div>
              </div>
            ) : filteredPokemons.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-gray-600 mb-2">Nenhum Pokémon encontrado</p>
                  <p className="text-gray-500">Tente ajustar os filtros de busca</p>
                </div>
              </div>
            ) : (
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
                      onToggleFavorite={() => {}}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </main>
      </div>

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={handleCloseModal}
      />
    </div>
  )
}