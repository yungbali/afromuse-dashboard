import { NextResponse } from 'next/server'
import { fileServiceInstance } from '@/services/file'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const result = await fileServiceInstance.upload(file)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'File API endpoint' })
} 