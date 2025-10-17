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

export default function HomePage() {
  const [pokemons] = useState<Pokemon[]>([
    { id: 1, name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", type: "Grass", color: "bg-gradient-to-br from-green-400 to-green-600" },
    { id: 4, name: "Charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", type: "Fire", color: "bg-gradient-to-br from-red-400 to-orange-500" },
    { id: 7, name: "Squirtle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", type: "Water", color: "bg-gradient-to-br from-blue-400 to-cyan-500" },
    { id: 25, name: "Pikachu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", type: "Electric", color: "bg-gradient-to-br from-yellow-400 to-yellow-600" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header moderno seguindo design */}
      <header className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-lg font-bold">⚡</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Pokédex
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/collection" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors">
                Coleção
              </Link>
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Sair
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section com design limpo */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Bem-vindo à <span className="text-yellow-300">Pokédex</span>
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Descubra, capture e colecione todos os Pokémon em uma jornada épica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collection" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              🔍 Explorar Coleção
            </Link>
            <Link href="/collection" className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              ⚡ Começar Agora
            </Link>
          </div>
        </div>
      </div>

      {/* Pokemon Grid com cards modernos */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-gray-800">
            Pokémon em Destaque
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça alguns dos Pokémon mais populares e poderosos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => (
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
                  <h4 className="text-xl font-bold text-gray-800">
                    {pokemon.name}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  🏷️ {pokemon.type}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer minimalista */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            <h3 className="text-xl font-bold">Pokédex</h3>
          </div>
          <p className="text-gray-400 mb-6">Sua jornada Pokémon começa aqui</p>
          <div className="flex justify-center space-x-6">
            <Link href="/home" className="text-gray-400 hover:text-white transition">
              Início
            </Link>
            <Link href="/collection" className="text-gray-400 hover:text-white transition">
              Coleção
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}