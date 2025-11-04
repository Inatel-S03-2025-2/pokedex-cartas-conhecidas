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
  loading: boolean
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined)

const typeTranslations: { [key: string]: string } = {
  fire: "Fogo",
  water: "Água",
  grass: "Planta",
  electric: "Elétrico",
  psychic: "Psíquico",
  normal: "Normal",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
  ice: "Gelo"
}

const getRarity = (baseExperience: number): string => {
  if (baseExperience >= 300) return "Ultra Rara"
  if (baseExperience >= 200) return "Rara"
  if (baseExperience >= 100) return "Incomum"
  return "Comum"
}

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonIds = [1, 4, 7, 25, 39, 65, 94, 130, 144, 150]
        const pokemonPromises = pokemonIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const data = await response.json()
          
          const speciesResponse = await fetch(data.species.url)
          const speciesData = await speciesResponse.json()
          const description = speciesData.flavor_text_entries
            .find((entry: any) => entry.language.name === 'en')?.flavor_text
            .replace(/\f/g, ' ') || 'Descrição não disponível'

          return {
            id: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            image: data.sprites.other['official-artwork'].front_default,
            type: typeTranslations[data.types[0].type.name] || data.types[0].type.name,
            rarity: getRarity(data.base_experience),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            description,
            isFavorite: false
          }
        })
        
        const pokemonData = await Promise.all(pokemonPromises)
        setPokemons(pokemonData)
      } catch (error) {
        console.error('Erro ao buscar Pokémons:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
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
      getStats,
      loading
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