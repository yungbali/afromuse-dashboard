import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"
import { ServiceProvider } from '@/providers/service-provider'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import Branding from "@/components/Branding"

const inter = Inter({ subsets: ["latin"] })

Amplify.configure(outputs)

export const metadata: Metadata = {
  title: "Musette Dashboard",
  description: "Streamline your music distribution workflow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Branding />
        <ServiceProvider>
          {children}
          <Toaster />
        </ServiceProvider>
      </body>
    </html>
  )
}
