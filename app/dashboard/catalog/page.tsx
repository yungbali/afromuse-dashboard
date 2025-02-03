"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, RefreshCw, Search } from "lucide-react"

// Mock data for the catalog
const mockCatalog = [
  { id: "1", title: "Summer Hits", artist: "Various Artists", status: "Synced", lastSync: "2023-06-15" },
  { id: "2", title: "Acoustic Sessions", artist: "Jane Doe", status: "Pending", lastSync: "2023-06-10" },
  { id: "3", title: "Electronic Dreams", artist: "DJ Smith", status: "Synced", lastSync: "2023-06-14" },
  { id: "4", title: "Rock Classics", artist: "The Rockers", status: "Out of Sync", lastSync: "2023-05-20" },
  { id: "5", title: "Jazz Nights", artist: "Cool Cats", status: "Synced", lastSync: "2023-06-12" },
]

export default function CatalogSyncPage() {
  const [syncing, setSyncing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [catalog, setCatalog] = useState(mockCatalog)
  const { toast } = useToast()

  const handleSync = async () => {
    setSyncing(true)
    // Here you would implement the actual sync with AudioSalad
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating API call
    setSyncing(false)
    toast({
      title: "Catalog Synced",
      description: "Your catalog has been successfully synced with AudioSalad.",
    })
  }

  const filteredCatalog = catalog.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Catalog Sync</h2>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Catalog Management</CardTitle>
          <Button onClick={handleSync} disabled={syncing}>
            {syncing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Search Catalog</Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                id="search"
                placeholder="Search by title or artist"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCatalog.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.artist}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.lastSync}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

