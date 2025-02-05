"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, X, Upload } from "lucide-react"

export default function FileUploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [metadata, setMetadata] = useState<{ [key: string]: string }>({})
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleMetadataChange = (fileIndex: number, field: string, value: string) => {
    setMetadata((prev) => ({
      ...prev,
      [`${fileIndex}-${field}`]: value,
    }))
  }

  const validateFiles = () => {
    // Implement file validation logic here
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateFiles()) {
      toast({
        title: "Validation Error",
        description: "Please check your files and metadata.",
        variant: "destructive",
      })
      return
    }

    // Simulate file upload
    for (let i = 0; i < files.length; i++) {
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress((prev) => ({ ...prev, [i]: progress }))
        await new Promise((resolve) => setTimeout(resolve, 200))
      }
    }

    toast({
      title: "Upload Successful",
      description: "Your files and metadata have been uploaded.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-900">File Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ul className="list-disc list-inside text-sm text-blue-600">
              <li className="text-emerald-700">Accepted formats: MP3, WAV, FLAC</li>
              <li className="text-amber-700">Maximum file size: 50MB</li>
              <li className="text-purple-700">Use artist name and song title for file naming</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file">Audio Files</Label>
              <Input id="file" type="file" multiple onChange={handleFileChange} accept=".mp3,.wav,.flac" />
            </div>
            {files.map((file, index) => (
              <Card key={index} className="border-blue-100 hover:bg-blue-50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{file.name}</span>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setFiles(files.filter((_, i) => i !== index))}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`title-${index}`}>Title</Label>
                      <Input
                        id={`title-${index}`}
                        value={metadata[`${index}-title`] || ""}
                        onChange={(e) => handleMetadataChange(index, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`artist-${index}`}>Artist</Label>
                      <Input
                        id={`artist-${index}`}
                        value={metadata[`${index}-artist`] || ""}
                        onChange={(e) => handleMetadataChange(index, "artist", e.target.value)}
                      />
                    </div>
                  </div>
                  {uploadProgress[index] !== undefined && (
                    <div className="mt-4">
                      <Progress value={uploadProgress[index]} className="w-full" />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{uploadProgress[index]}% uploaded</span>
                        {uploadProgress[index] === 100 && <CheckCircle2 className="text-green-500 h-5 w-5" />}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              <Upload className="mr-2 h-4 w-4" /> Process Files
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

