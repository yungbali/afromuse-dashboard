"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("your-api-key-here")
  const [notifications, setNotifications] = useState(true)
  const { toast } = useToast()

  const handleSaveAPIKey = () => {
    // Here you would implement the actual API key update
    toast({
      title: "API Key Updated",
      description: "Your API key has been successfully updated.",
    })
  }

  const handleToggleNotifications = () => {
    setNotifications(!notifications)
    toast({
      title: "Notification Settings Updated",
      description: `Notifications have been ${!notifications ? "enabled" : "disabled"}.`,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Afromuse" />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
              </div>
              <Button onClick={handleSaveAPIKey}>Update API Key</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="notifications" checked={notifications} onCheckedChange={handleToggleNotifications} />
                <Label htmlFor="notifications">Enable Notifications</Label>
              </div>
              <p className="text-sm text-gray-500">
                Receive notifications for important events such as successful file ingestions, delivery completions, and
                system updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

