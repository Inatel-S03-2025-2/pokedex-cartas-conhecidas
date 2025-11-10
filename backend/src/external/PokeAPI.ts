import axios from 'axios';

export interface PokeCardData {
  id: string;
  name: string;
  types?: Array<{ type: { name: string } }>;
  description?: string;
  sprites?: {
    front_default: string;
  };
}

export class PokeAPI {
  private baseUrl = 'https://pokeapi.co/api/v2';

  async getCardData(pokeId: number): Promise<PokeCardData | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/pokemon/${pokeId}`);
      const pokemon = response.data;

      // Buscar dados da espécie para descrição
      const speciesResponse = await axios.get(pokemon.species.url);
      const species = speciesResponse.data;

      // Encontrar descrição em português ou inglês
      const flavorText = species.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      )?.flavor_text || '';

      return {
        id: pokemon.id.toString(),
        name: pokemon.name,
        types: pokemon.types,
        description: flavorText.replace(/\f/g, ' '), // Remove caracteres de controle
        sprites: pokemon.sprites
      };
    } catch (error) {
      console.error(`Erro ao buscar dados do Pokémon ${pokeId}:`, error);
      return null;
    }
  }

  async searchPokemonByName(name: string): Promise<PokeCardData | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/pokemon/${name.toLowerCase()}`);
      return await this.getCardData(response.data.id);
    } catch (error) {
      console.error(`Erro ao buscar Pokémon ${name}:`, error);
      return null;
    }
  }
}

export const pokeAPI = new PokeAPI();