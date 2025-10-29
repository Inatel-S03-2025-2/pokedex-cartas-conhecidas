"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface Pokemon {
  id: number
  name: string
  image: string
  type: string
  rarity: string
  hp: number
  attack: number
  defense: number
  description: string
  isFavorite: boolean
}

interface PokemonContextType {
  pokemons: Pokemon[]
  selectedPokemon: Pokemon | null
  setSelectedPokemon: (pokemon: Pokemon | null) => void
  toggleFavorite: (id: number) => void
  filterByType: (type: string) => Pokemon[]
  filterByRarity: (rarity: string) => Pokemon[]
  getStats: () => { total: number, types: number, rare: number }
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined)

const mockPokemons: Pokemon[] = [
  {
    id: 6,
    name: "Charizard",
    image: "/charizard1.png",
    type: "Fogo",
    rarity: "Rara",
    hp: 180,
    attack: 150,
    defense: 120,
    description: "Um Pokémon do tipo Fogo/Voador. Suas chamas podem derreter quase qualquer coisa.",
    isFavorite: true
  },
  {
    id: 9,
    name: "Blastoise",
    image: "/blastoise1.png",
    type: "Água",
    rarity: "Rara",
    hp: 170,
    attack: 130,
    defense: 140,
    description: "Um Pokémon do tipo Água. Pode esmagar rochas com seus canhões de água.",
    isFavorite: false
  },
  {
    id: 3,
    name: "Venusaur",
    image: "/venusaur1.png",
    type: "Planta",
    rarity: "Rara",
    hp: 160,
    attack: 120,
    defense: 130,
    description: "Um Pokémon do tipo Planta/Veneno. Sua flor libera um aroma relaxante.",
    isFavorite: true
  },
  {
    id: 25,
    name: "Pikachu",
    image: "/pikachu1.png",
    type: "Elétrico",
    rarity: "Comum",
    hp: 90,
    attack: 100,
    defense: 80,
    description: "Um Pokémon do tipo Elétrico. Armazena eletricidade em suas bochechas.",
    isFavorite: false
  },
  {
    id: 130,
    name: "Gyarados",
    image: "/gyarados1.png",
    type: "Água",
    rarity: "Ultra Rara",
    hp: 200,
    attack: 180,
    defense: 110,
    description: "Um Pokémon do tipo Água/Voador. Extremamente feroz e destrutivo.",
    isFavorite: true
  },
  {
    id: 65,
    name: "Alakazam",
    image: "/alakazam1.png",
    type: "Psíquico",
    rarity: "Incomum",
    hp: 120,
    attack: 90,
    defense: 85,
    description: "Um Pokémon do tipo Psíquico. Seu cérebro nunca para de crescer.",
    isFavorite: false
  }
]

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    setPokemons(mockPokemons)
  }, [])

  const toggleFavorite = (id: number) => {
    setPokemons(prev => 
      prev.map(pokemon => 
        pokemon.id === id ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon
      )
    )
  }

  const filterByType = (type: string) => {
    if (type === "Todos os Tipos") return pokemons
    return pokemons.filter(pokemon => pokemon.type === type)
  }

  const filterByRarity = (rarity: string) => {
    if (rarity === "Todas as Raridade") return pokemons
    return pokemons.filter(pokemon => pokemon.rarity === rarity)
  }

  const getStats = () => {
    const total = pokemons.length
    const types = new Set(pokemons.map(p => p.type)).size
    const rare = pokemons.filter(p => p.rarity === "Rara" || p.rarity === "Ultra Rara").length
    return { total, types, rare }
  }

  return (
    <PokemonContext.Provider value={{
      pokemons,
      selectedPokemon,
      setSelectedPokemon,
      toggleFavorite,
      filterByType,
      filterByRarity,
      getStats
    }}>
      {children}
    </PokemonContext.Provider>
  )
}

export function usePokemon() {
  const context = useContext(PokemonContext)
  if (context === undefined) {
    throw new Error("usePokemon must be used within a PokemonProvider")
  }
  return context
}