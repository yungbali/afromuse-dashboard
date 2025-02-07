"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { client } from "@/lib/data-client"
import type { Schema } from "@/amplify/data/resource"

interface CatalogItemPlain {
  id: string | null;
  title: string | null;
  artist: string | null;
  status: string | null;
  lastSync: string | null;
  metadata: any;
  createdAt: string;
  updatedAt: string;
}

export default function CatalogPage() {
  const { toast } = useToast()
  const [catalogItems, setCatalogItems] = useState<CatalogItemPlain[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCatalog = async () => {
    try {
      setLoading(true)
      const { data } = await client.models.CatalogItem.list()
      setCatalogItems(data as unknown as CatalogItemPlain[])
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
                    <TableCell>
                      {item.lastSync ? new Date(item.lastSync).toLocaleDateString() : 'Never'}
                    </TableCell>
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

