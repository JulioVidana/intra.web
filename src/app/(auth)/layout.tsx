import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auth - Intranet",
  description: "Autenticación de Intranet",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <div className="flex h-screen bg-muted/40">
      <main className="flex-1 overflow-auto p-6">{children}</main>
      <Toaster />
    </div>
  )
}

