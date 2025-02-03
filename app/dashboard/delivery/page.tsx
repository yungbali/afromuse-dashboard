"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Mock data for releases
const mockReleases = [
  { id: 1, title: "Summer Vibes", artist: "DJ Cool", status: "Ready" },
  { id: 2, title: "Midnight Blues", artist: "Jazz Trio", status: "Processing" },
  { id: 3, title: "Rock Anthems", artist: "The Guitars", status: "Ready" },
]

// Mock data for DSPs
const mockDSPs = [
  { id: "spotify", name: "Spotify" },
  { id: "apple", name: "Apple Music" },
  { id: "amazon", name: "Amazon Music" },
]

export default function DSPDeliveryPage() {
  const [selectedReleases, setSelectedReleases] = useState<number[]>([])
  const [selectedDSP, setSelectedDSP] = useState("")
  const [deliveryDate, setDeliveryDate] = useState<Date>()
  const { toast } = useToast()

  const handleReleaseToggle = (releaseId: number) => {
    setSelectedReleases((prev) =>
      prev.includes(releaseId) ? prev.filter((id) => id !== releaseId) : [...prev, releaseId],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the actual delivery scheduling
    toast({
      title: "Delivery Scheduled",
      description: `Scheduled ${selectedReleases.length} releases for ${selectedDSP} on ${deliveryDate?.toDateString()}`,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">DSP Delivery</h2>
      <Card>
        <CardHeader>
          <CardTitle>Schedule DSP Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Select Releases</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Select</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReleases.map((release) => (
                    <TableRow key={release.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedReleases.includes(release.id)}
                          onCheckedChange={() => handleReleaseToggle(release.id)}
                        />
                      </TableCell>
                      <TableCell>{release.title}</TableCell>
                      <TableCell>{release.artist}</TableCell>
                      <TableCell>{release.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <Label htmlFor="dsp">Select DSP</Label>
              <Select onValueChange={setSelectedDSP}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a DSP" />
                </SelectTrigger>
                <SelectContent>
                  {mockDSPs.map((dsp) => (
                    <SelectItem key={dsp.id} value={dsp.id}>
                      {dsp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-[280px] justify-start text-left font-normal ${
                      !deliveryDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={deliveryDate} onSelect={setDeliveryDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <Button type="submit" disabled={selectedReleases.length === 0 || !selectedDSP || !deliveryDate}>
              Schedule Delivery
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

