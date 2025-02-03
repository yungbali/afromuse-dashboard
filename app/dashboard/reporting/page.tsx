"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for charts
const fileIngestionData = [
  { name: "Jan", count: 400 },
  { name: "Feb", count: 300 },
  { name: "Mar", count: 200 },
  { name: "Apr", count: 278 },
  { name: "May", count: 189 },
  { name: "Jun", count: 239 },
]

const dspDeliveryData = [
  { name: "Spotify", count: 4000 },
  { name: "Apple Music", count: 3000 },
  { name: "Amazon Music", count: 2000 },
  { name: "YouTube Music", count: 2780 },
  { name: "Tidal", count: 1890 },
  { name: "Deezer", count: 2390 },
]

export default function ReportingPage() {
  const [reportType, setReportType] = useState("fileIngestion")

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Reporting Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="report-type">Select Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fileIngestion">File Ingestion</SelectItem>
                <SelectItem value="dspDelivery">DSP Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportType === "fileIngestion" ? fileIngestionData : dspDeliveryData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Files Ingested</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Successful Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">5,678</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">42</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

