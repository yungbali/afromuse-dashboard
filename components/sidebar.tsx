"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Upload,
  Calendar,
  Database,
  FileAudio,
  Users,
  BarChart,
  Settings,
  FileCheck,
  PanelLeft,
  Sun,
  Moon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useMediaQuery } from "@/hooks/use-media-query"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "File Ingestion", href: "/dashboard/ingestion", icon: Upload },
  { name: "DSP Delivery", href: "/dashboard/delivery", icon: Calendar },
  { name: "Catalog Sync", href: "/dashboard/catalog", icon: Database },
  { name: "File Retrieval", href: "/dashboard/files", icon: FileAudio },
  { name: "User Management", href: "/dashboard/users", icon: Users },
  { name: "Reporting", href: "/dashboard/reporting", icon: BarChart },
  { name: "DDEX Validation", href: "/dashboard/ddex-validation", icon: FileCheck },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const sidebarVariants = {
  open: { 
    x: 0,
    width: "16rem",
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  closed: {
    x: "-100%",
    width: "0rem",
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
}

// Add this interface at the top of the file
interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

// Update the component declaration to use the props
export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isMobile) setIsOpen(false)
  }, [isMobile])

  return (
    <>
      <AnimatePresence>
        <motion.nav
          initial={isMobile ? "closed" : "open"}
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="h-full bg-background shadow-lg"
        >
          <div className="p-4 flex flex-col h-full w-64">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Musette</h1>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex-grow space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href && "bg-accent"
                    )}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="hidden md:inline-flex"
              >
                <PanelLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-background rounded-full shadow-lg"
      >
        {/* Menu icon */}
      </button>
    </>
  )
}
