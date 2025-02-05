"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, X, Upload } from "lucide-react"
import { Dropzone } from "@/components/ui/dropzone"
import { uploadData, downloadData } from 'aws-amplify/storage'

export default function FileIngestionPage() {
  const [files, setFiles] = useState<File[]>([])
  const [metadata, setMetadata] = useState<{ [key: string]: string }>({})
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const { toast } = useToast()

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

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadData({
        path: `uploads/${file.name}`,
        data: file,
        options: {
          contentType: file.type,
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              setUploadProgress((prev) => ({
                ...prev,
                [file.name]: Math.round((transferredBytes / totalBytes) * 100)
              }));
            }
          }
        }
      }).result;

      const resultDownload = await downloadData({ path: result.path! })
      const { url } = resultDownload as unknown as { url: string }
      // Update UI with new file entry
    } catch (error) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
  };

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
        setUploadProgress((prev) => ({ ...prev, [i.toString()]: progress }))
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
      <h2 className="text-3xl font-bold tracking-tight text-blue-800">File Ingestion</h2>
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload" className="text-blue-600">Upload Files</TabsTrigger>
          <TabsTrigger value="validate" className="text-blue-600">DDEX Validation</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Card>
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-blue-900">Upload Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <ul className="list-disc list-inside text-sm">
                  <li className="text-emerald-700">Accepted formats: MP3, WAV, FLAC</li>
                  <li className="text-amber-700">Maximum file size: 50MB</li>
                  <li className="text-purple-700">Use artist name and song title for file naming</li>
                </ul>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Dropzone
                  onDrop={(acceptedFiles: File[]) => setFiles(acceptedFiles)}
                  accept={{ "audio/*": [".mp3", ".wav", ".flac"] }}
                  maxSize={50 * 1024 * 1024}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="h-12 w-12 text-blue-600" />
                    <div className="text-center">
                      <p className="font-medium text-blue-700">Drag files here or click to upload</p>
                      <p className="text-sm text-blue-500">
                        Max 50MB per file (MP3, WAV, FLAC)
                      </p>
                    </div>
                  </div>
                </Dropzone>
                {files.map((file, index) => (
                  <Card key={index} className="border-blue-200 hover:bg-blue-50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-blue-800">{file.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => setFiles(files.filter((_, i) => i !== index))}>
                          <X className="h-4 w-4 text-red-600" />
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
                          <Progress value={uploadProgress[index]} className="w-full h-2 bg-blue-200" />
                          <div className="flex justify-between mt-2 text-sm">
                            <span className="text-blue-700">{uploadProgress[index]}% uploaded</span>
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
        </TabsContent>
        <TabsContent value="validate">
          <Card>
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-blue-900">DDEX Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700 mb-4">
                Upload your DDEX files here for validation before ingestion.
              </p>
              <Input id="ddex-file" type="file" accept=".xml" />
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Validate DDEX
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

