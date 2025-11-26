"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { User, Lock, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {}
    
    // Validação de username
    if (!username.trim()) {
      newErrors.username = "Username é obrigatório"
    } else if (username.length < 3) {
      newErrors.username = "Username deve ter pelo menos 3 caracteres"
    }
    
    // Validação de password
    if (!password) {
      newErrors.password = "Password é obrigatório"
    } else if (password.length < 4) {
      newErrors.password = "Password deve ter pelo menos 4 caracteres"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    // Validar formulário
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulando uma chamada de API com delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Em produção, fazer uma chamada real de autenticação aqui
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // })
      
      // Simulando validação bem-sucedida
      if (username && password) {
        // Em produção, armazenar token de autenticação
        // localStorage.setItem('authToken', response.token)
        
        router.push("/collection")
      } else {
        throw new Error("Credenciais inválidas")
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setErrors({ 
        general: error instanceof Error ? error.message : "Erro ao fazer login. Tente novamente." 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    // Limpar erro ao digitar
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    // Limpar erro ao digitar
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }))
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-[#1a2847] to-[#2B4C9E]"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image 
                src="/log.png" 
                alt="Pokédex Logo" 
                width={200} 
                height={60} 
                priority 
                onError={(e) => {
                  console.error('Erro ao carregar logo')
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">LOGIN</h1>
            <p className="text-center text-gray-600 mb-8 text-sm">Gerencie sua coleção de cartas Pokémon</p>

            {/* Error Message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2"
              >
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-700">{errors.general}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              {/* Username Input */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className={`w-full pl-12 pr-4 py-3 bg-[#F5F7FB] rounded-xl border-2 ${
                      errors.username ? 'border-red-300' : 'border-transparent'
                    } focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] transition-all text-gray-900 placeholder:text-gray-400`}
                    disabled={isLoading}
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? "username-error" : undefined}
                  />
                </div>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    id="username-error"
                    className="mt-1 text-sm text-red-600 ml-1"
                  >
                    {errors.username}
                  </motion.p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full pl-12 pr-4 py-3 bg-[#F5F7FB] rounded-xl border-2 ${
                      errors.password ? 'border-red-300' : 'border-transparent'
                    } focus:outline-none focus:ring-2 focus:ring-[#2B4C9E] transition-all text-gray-900 placeholder:text-gray-400`}
                    disabled={isLoading}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    id="password-error"
                    className="mt-1 text-sm text-red-600 ml-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-[#2B4C9E] text-white rounded-xl font-semibold transition-colors shadow-lg flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1E3A7A]'
                }`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Entrando...</span>
                  </>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Lugia Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#1a2847] to-[#2B4C9E] items-center justify-center overflow-hidden"
      >
        {/* Decorative curves */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
            <path d="M0 400C200 300 400 500 800 400" stroke="#4A6FBF" strokeWidth="60" />
            <path d="M0 600C200 500 400 700 800 600" stroke="#4A6FBF" strokeWidth="60" />
          </svg>
        </div>

        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="relative z-10"
        >
          <Image 
            src="/login.png" 
            alt="Lugia Pokémon" 
            width={900} 
            height={900} 
            priority 
            className="drop-shadow-2xl"
            onError={(e) => {
              console.error('Erro ao carregar imagem de login')
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}