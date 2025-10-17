import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-80 bg-white/80 backdrop-blur-md shadow-2xl h-full border-r border-gray-200/50">
      <div className="p-8">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">⚡</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Menu
          </h2>
        </div>
        
        {/* Navegação */}
        <nav className="space-y-3">
          <Link href="/" className="flex items-center space-x-4 p-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-2xl transition-all duration-200 font-semibold">
            <span className="text-2xl">🏠</span>
            <span>Início</span>
          </Link>
          <Link href="/collection" className="flex items-center space-x-4 p-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-2xl transition-all duration-200 font-semibold">
            <span className="text-2xl">📚</span>
            <span>Minha Coleção</span>
          </Link>
          <Link href="/search" className="flex items-center space-x-4 p-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-2xl transition-all duration-200 font-semibold">
            <span className="text-2xl">🔍</span>
            <span>Buscar Pokémon</span>
          </Link>
          <Link href="/favorites" className="flex items-center space-x-4 p-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-2xl transition-all duration-200 font-semibold">
            <span className="text-2xl">❤️</span>
            <span>Favoritos</span>
          </Link>
          <Link href="/stats" className="flex items-center space-x-4 p-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-2xl transition-all duration-200 font-semibold">
            <span className="text-2xl">📊</span>
            <span>Estatísticas</span>
          </Link>
        </nav>
        
        {/* Seção de usuário */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">👤</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Treinador</h3>
              <p className="text-sm text-gray-600">Nível 25</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
          <p className="text-xs text-gray-600 text-center">750/1000 XP</p>
        </div>
      </div>
    </div>
  );
}