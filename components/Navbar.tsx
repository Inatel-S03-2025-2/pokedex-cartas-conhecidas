import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">⚡</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pokédex
            </h1>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/collection" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl font-semibold transition-all duration-200 hover:bg-blue-50">
              Coleção
            </Link>
            <button className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl font-semibold transition-all duration-200 hover:bg-blue-50">
              👤 Perfil
            </button>
            <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              🚪 Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}