"use client"
import { useState } from "react"
import Sidebar from "@/components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-sidebar border-r border-gray-200">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </aside>
      <main className="flex-1 p-6 animate-fadeIn overflow-auto">
        {children}
      </main>
    </div>
  )
}

