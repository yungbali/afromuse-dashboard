import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, Calendar, Database, FileAudio, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const features = [
    { title: "File Ingestion", icon: Upload, href: "/dashboard/ingestion", count: 254 },
    { title: "DSP Delivery", icon: Calendar, href: "/dashboard/delivery", count: 12 },
    { title: "Catalog Sync", icon: Database, href: "/dashboard/catalog", count: 1203 },
    { title: "File Retrieval", icon: FileAudio, href: "/dashboard/files", count: 587 },
    { title: "User Management", icon: Users, href: "/dashboard/users", count: 23 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-blue-800">Welcome back</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card 
            key={feature.title}
            className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 transition-all hover:shadow-xl hover:scale-105"
          >
            <CardHeader className="group flex items-center gap-3 p-4">
              <div className="bg-blue-100 p-2 rounded">
                <feature.icon className="h-6 w-6 text-blue-600 transition-colors group-hover:text-blue-800" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-900">{feature.count}</div>
              <Link href={feature.href}>
                <Button variant="link" className="p-0 text-blue-600 hover:text-blue-800">
                  View details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

