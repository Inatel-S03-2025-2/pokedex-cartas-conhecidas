import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PokemonProvider } from "@/contexts/PokemonContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokédex - Gerencie sua coleção",
  description: "Gerencie sua coleção de cartas Pokémon",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <PokemonProvider>
          {children}
        </PokemonProvider>
        <Analytics />
      </body>
    </html>
  )
}
