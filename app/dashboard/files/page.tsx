"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Column,
  DataTable,
  DataTableColumnHeader,
} from '@/components/ui/data-table'
import { Download, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFileService } from '@/hooks/use-file-service'

// Mock data for files 
const mockFiles = [
  { id: "1", name: "Summer_Vibes.mp3", format: "MP3", size: "8.2 MB", artist: "DJ Cool" },
  { id: "2", name: "Acoustic_Session.wav", format: "WAV", size: "24.5 MB", artist: "Jane Doe" },
  { id: "3", name: "Electronic_Dreams.flac", format: "FLAC", size: "42.1 MB", artist: "DJ Smith" },
  { id: "4", name: "Rock_Anthem.mp3", format: "MP3", size: "7.8 MB", artist: "The Rockers" },
  { id: "5", name: "Jazz_Night.wav", format: "WAV", size: "31.2 MB", artist: "Cool Cats" },
]

export default function FileRetrievalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [formatFilter, setFormatFilter] = useState("all")
  const [downloading, setDownloading] = useState<string | null>(null)
  const { toast } = useToast()
  const { uploadFile, processFile } = useFileService()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search Completed",
      description: `Showing results for "${searchTerm}"`,
    })
  }

  const handleDownload = async (fileId: string) => {
    setDownloading(fileId)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setDownloading(null)
    toast({
      title: "File Downloaded",
      description: `File with ID ${fileId} has been downloaded.`,
    })
  }

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadFile(file)
      await processFile(result.fileId)
      toast({
        title: 'Success',
        description: 'File uploaded and processed successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive'
      })
    }
  }

  const filteredFiles = mockFiles.filter(
    (file) =>
      (file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.artist.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (formatFilter === "all" || file.format.toLowerCase() === formatFilter.toLowerCase()),
  )

  const columns = [
    {
      accessorKey: 'name',
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title="File Name" />
      ),
    },
    {
      accessorKey: 'artist',
      header: 'Artist',
    },
    {
      accessorKey: 'format',
      header: 'Format',
    },
    {
      accessorKey: 'size',
      header: 'Size',
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: any } }) => (
        <Button onClick={() => handleDownload(row.original.id)} variant="ghost">
          <Download className="h-4 w-4" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">File Retrieval</h2>
      <Card>
        <CardHeader>
          <CardTitle>Search and Download Files</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
            <div className="flex-grow">
              <Label htmlFor="search" className="sr-only">
                Search Files
              </Label>
              <Input
                id="search"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={formatFilter} onValueChange={setFormatFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="mp3">MP3</SelectItem>
                <SelectItem value="wav">WAV</SelectItem>
                <SelectItem value="flac">FLAC</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          <DataTable columns={columns as Column<{ id: string; name: string; format: string; size: string; artist: string; }>[] } data={filteredFiles} />
        </CardContent>
      </Card>
    </div>
  )
}

