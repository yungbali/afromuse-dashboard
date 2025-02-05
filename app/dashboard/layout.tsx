"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="grid min-h-screen" style={{ 
      gridTemplateColumns: isSidebarOpen ? '16rem 1fr' : '0 1fr',
      transition: 'grid-template-columns 0.3s ease'
    }}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}

