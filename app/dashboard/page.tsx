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
      <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
              <feature.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feature.count}</div>
              <Link href={feature.href}>
                <Button variant="link" className="p-0">
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

