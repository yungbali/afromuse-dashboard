"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, RefreshCw, Search } from "lucide-react"
import { client } from "@/lib/data-client"
import type { Schema } from "@/amplify/data/resource"

export default function CatalogPage() {
  const { toast } = useToast()
  const [catalogItems, setCatalogItems] = useState<
    Schema["CatalogItem"][]
  >([])
  const [loading, setLoading] = useState(true)

  const fetchCatalog = async () => {
    try {
      setLoading(true)
      const { data } = await client.models.CatalogItem.list()
      setCatalogItems(data as unknown as Schema["CatalogItem"][])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch catalog items",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCatalog()
  }, [])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Music Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
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
                {catalogItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.artist}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{new Date(item.lastSync).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

