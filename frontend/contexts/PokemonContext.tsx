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
  error: string | null
  retryFetch: () => void
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

// Função auxiliar para fazer fetch com timeout
const fetchWithTimeout = async (url: string, timeout = 10000): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemons = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const pokemonIds = [1, 4, 7, 25, 39, 65, 94, 130, 144, 150]
      
      const pokemonPromises = pokemonIds.map(async (id) => {
        try {
          // Fetch principal com timeout
          const response = await fetchWithTimeout(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
            10000
          )
          
          if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}: Falha ao buscar Pokémon ${id}`)
          }
          
          const data = await response.json()
          
          // Validação dos dados essenciais
          if (!data || !data.id || !data.name || !data.sprites) {
            throw new Error(`Dados inválidos recebidos para Pokémon ${id}`)
          }
          
          // Fetch da espécie com tratamento de erro separado
          let description = 'Descrição não disponível'
          try {
            if (data.species && data.species.url) {
              const speciesResponse = await fetchWithTimeout(data.species.url, 10000)
              
              if (speciesResponse.ok) {
                const speciesData = await speciesResponse.json()
                const flavorText = speciesData.flavor_text_entries?.find(
                  (entry: any) => entry.language.name === 'en'
                )
                if (flavorText) {
                  description = flavorText.flavor_text.replace(/\f/g, ' ')
                }
              }
            }
          } catch (descError) {
            console.warn(`Não foi possível carregar a descrição do Pokémon ${id}:`, descError)
            // Continua com a descrição padrão
          }

          return {
            id: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            image: data.sprites.other?.['official-artwork']?.front_default || 
                   data.sprites.front_default || 
                   '/placeholder-pokemon.png',
            type: typeTranslations[data.types?.[0]?.type?.name] || 
                  data.types?.[0]?.type?.name || 
                  'Normal',
            rarity: getRarity(data.base_experience || 0),
            hp: data.stats?.[0]?.base_stat || 50,
            attack: data.stats?.[1]?.base_stat || 50,
            defense: data.stats?.[2]?.base_stat || 50,
            description,
            isFavorite: false
          }
        } catch (pokemonError) {
          console.error(`Erro ao processar Pokémon ${id}:`, pokemonError)
          // Retorna null para filtrar depois
          return null
        }
      })
      
      const pokemonData = await Promise.all(pokemonPromises)
      
      // Filtra pokémons que falharam
      const validPokemons = pokemonData.filter((p): p is Pokemon => p !== null)
      
      if (validPokemons.length === 0) {
        throw new Error('Nenhum Pokémon foi carregado com sucesso')
      }
      
      setPokemons(validPokemons)
      
      // Se alguns pokémons falharam, mostra um aviso
      if (validPokemons.length < pokemonIds.length) {
        console.warn(
          `${pokemonIds.length - validPokemons.length} Pokémon(s) não puderam ser carregados`
        )
      }
      
    } catch (error) {
      console.error('Erro ao buscar Pokémons:', error)
      
      let errorMessage = 'Erro desconhecido ao carregar Pokémons'
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Tempo limite excedido. Verifique sua conexão com a internet.'
        } else if (error.message.includes('HTTP')) {
          errorMessage = 'Erro ao conectar com o servidor. Tente novamente mais tarde.'
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Sem conexão com a internet. Verifique sua rede.'
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  const retryFetch = () => {
    fetchPokemons()
  }

  const toggleFavorite = (id: number) => {
    try {
      setPokemons(prev => 
        prev.map(pokemon => 
          pokemon.id === id ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon
        )
      )
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error)
    }
  }

  const filterByType = (type: string) => {
    try {
      if (type === "Todos os Tipos") return pokemons
      return pokemons.filter(pokemon => pokemon.type === type)
    } catch (error) {
      console.error('Erro ao filtrar por tipo:', error)
      return pokemons
    }
  }

  const filterByRarity = (rarity: string) => {
    try {
      if (rarity === "Todas as Raridade") return pokemons
      return pokemons.filter(pokemon => pokemon.rarity === rarity)
    } catch (error) {
      console.error('Erro ao filtrar por raridade:', error)
      return pokemons
    }
  }

  const getStats = () => {
    try {
      const total = pokemons.length
      const types = new Set(pokemons.map(p => p.type)).size
      const rare = pokemons.filter(p => p.rarity === "Rara" || p.rarity === "Ultra Rara").length
      return { total, types, rare }
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error)
      return { total: 0, types: 0, rare: 0 }
    }
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
      loading,
      error,
      retryFetch
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