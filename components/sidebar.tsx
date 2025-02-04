"use client"

import React, { useState } from "react"
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
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

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

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 dark:bg-gray-800">
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Afromuse Dashboard
            </h1>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-400" />
              ) : (
                <Moon className="h-4 w-4 text-gray-900" />
              )}
            </Button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "text-black dark:text-white"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="fixed bottom-4 left-4 md:hidden">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
          <PanelLeft className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}
