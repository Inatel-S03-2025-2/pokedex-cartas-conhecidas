import Image from "next/image";

interface Card {
  id: number;
  name: string;
  image: string;
  type: string;
  color?: string;
}

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    Fire: "bg-gradient-to-br from-red-400 to-orange-500",
    Water: "bg-gradient-to-br from-blue-400 to-cyan-500",
    Grass: "bg-gradient-to-br from-green-400 to-green-600",
    Electric: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    Psychic: "bg-gradient-to-br from-pink-400 to-purple-500",
    Rock: "bg-gradient-to-br from-gray-400 to-gray-600",
    Ground: "bg-gradient-to-br from-yellow-600 to-orange-600",
    Flying: "bg-gradient-to-br from-indigo-400 to-blue-500",
  };
  return colors[type] || "bg-gradient-to-br from-gray-400 to-gray-600";
};

export default function PokemonCard({ card }: { card: Card }) {
  return (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
      <div className={`${card.color || getTypeColor(card.type)} p-8 text-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10"></div>
        <Image 
          src={card.image} 
          alt={card.name} 
          width={140} 
          height={140} 
          className="mx-auto relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-gray-800">{card.name}</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            #{card.id.toString().padStart(3, '0')}
          </span>
        </div>
        <p className="text-gray-600 mb-6 text-lg">🏷️ {card.type}</p>
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
