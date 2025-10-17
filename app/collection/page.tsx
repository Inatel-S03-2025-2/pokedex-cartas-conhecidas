"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
  color: string;
}

export default function CollectionPage() {
  const [pokemons] = useState<Pokemon[]>([
    { id: 1, name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", type: "Grass", color: "bg-gradient-to-br from-green-400 to-green-600" },
    { id: 2, name: "Ivysaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", type: "Grass", color: "bg-gradient-to-br from-green-400 to-green-600" },
    { id: 3, name: "Venusaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", type: "Grass", color: "bg-gradient-to-br from-green-400 to-green-600" },
    { id: 4, name: "Charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", type: "Fire", color: "bg-gradient-to-br from-red-400 to-orange-500" },
    { id: 5, name: "Charmeleon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", type: "Fire", color: "bg-gradient-to-br from-red-400 to-orange-500" },
    { id: 6, name: "Charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", type: "Fire", color: "bg-gradient-to-br from-red-400 to-orange-500" },
    { id: 7, name: "Squirtle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", type: "Water", color: "bg-gradient-to-br from-blue-400 to-cyan-500" },
    { id: 8, name: "Wartortle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", type: "Water", color: "bg-gradient-to-br from-blue-400 to-cyan-500" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || pokemon.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header moderno */}
      <header className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/home" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-lg font-bold">⚡</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Pokédex
              </h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/home" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors">
                Início
              </Link>
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Sair
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Minha Coleção</h1>
          <p className="text-lg text-gray-600">Gerencie seus Pokémon capturados</p>
        </div>

        {/* Filtros */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Buscar Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
              >
                <option value="">🏷️ Todos os tipos</option>
                <option value="Fire">🔥 Fogo</option>
                <option value="Water">💧 Água</option>
                <option value="Grass">🌿 Planta</option>
                <option value="Electric">⚡ Elétrico</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Pokémon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              <div className={`${pokemon.color} p-6 text-center relative`}>
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={120}
                  height={120}
                  className="mx-auto drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{pokemon.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">#{pokemon.id.toString().padStart(3, '0')}</span>
                </div>
                <p className="text-gray-600 mb-4">🏷️ {pokemon.type}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPokemons.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-gray-500 text-2xl font-semibold">Nenhum Pokémon encontrado</p>
            <p className="text-gray-400 mt-2">Tente ajustar seus filtros de busca</p>
          </div>
        )}
      </div>
    </div>
  );
}