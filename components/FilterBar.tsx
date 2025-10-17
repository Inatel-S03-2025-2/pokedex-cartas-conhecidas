"use client";

import { useState } from "react";

interface FilterBarProps {
  onSearch?: (term: string) => void;
  onTypeFilter?: (type: string) => void;
}

export default function FilterBar({ onSearch, onTypeFilter }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    onTypeFilter?.(value);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200 text-lg"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200 text-lg font-semibold"
          >
            <option value="">🏷️ Todos os tipos</option>
            <option value="Fire">🔥 Fogo</option>
            <option value="Water">💧 Água</option>
            <option value="Grass">🌿 Planta</option>
            <option value="Electric">⚡ Elétrico</option>
            <option value="Psychic">🔮 Psíquico</option>
            <option value="Rock">🪨 Pedra</option>
            <option value="Ground">🌍 Terra</option>
            <option value="Flying">🐦 Voador</option>
          </select>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            🔍 Filtrar
          </button>
        </div>
      </div>
    </div>
  );
}