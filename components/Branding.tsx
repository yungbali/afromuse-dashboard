"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Branding() {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-50 shadow">
      <Link href="/">
        <Image
          src="/public/logo.png"
          alt="Brand Logo"
          width={150}
          height={50}
          className="object-contain"
        />
      </Link>
      <div className="flex items-center space-x-4">
        <span className="text-blue-900 font-bold">Musette Dashboard</span>
        {/* Use these divs as a color palette preview */}
        <div className="flex space-x-1">
          <div className="w-6 h-6 bg-blue-600 rounded-full" />
          <div className="w-6 h-6 bg-emerald-600 rounded-full" />
          <div className="w-6 h-6 bg-amber-600 rounded-full" />
          <div className="w-6 h-6 bg-purple-600 rounded-full" />
        </div>
      </div>
    </header>
  )
} 