import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner";
import Providers from "@/providers/Providers"
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Intranet ISAF",
    template: "%s | Intranet ISAF",
  },
  description: "Aplicacion de Intranet para el soporte de ISAF",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Providers> */}
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        <Toaster />
        {/* </Providers> */}
      </body>
    </html>
  )
}

