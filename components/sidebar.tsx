"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Upload, Calendar, Database, FileAudio, Users, BarChart, Settings, FileCheck } from "lucide-react"

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

  return (
    <div className="w-64 bg-gray-100 p-4 h-screen">
      <h1 className="mb-6 text-2xl font-bold">Afromuse Dashboard</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button variant="ghost" className={cn("w-full justify-start", pathname === item.href && "bg-gray-200")}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  )
}

