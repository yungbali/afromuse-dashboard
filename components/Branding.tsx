"use client"
import Link from "next/link"
import Image from "next/image"
import { useAIConversation } from "@/lib/ai-client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export default function Branding() {
  const [{ data: { messages } = { messages: [] } }, sendMessage] = useAIConversation('chat')
  const [input, setInput] = useState('')
  const [showChat, setShowChat] = useState(false)

  return (
    <header className="flex items-center justify-between p-4 bg-blue-50 shadow">
      <Link href="/">
        <Image
          src="/public/logo.png"
          alt="Brand Logo"
          width={150}
          height={50}
          className="object-contain"
        />
      </Link>
      <div className="flex items-center space-x-4">
        <span className="text-blue-900 font-bold">Musette Dashboard</span>
        {/* Use these divs as a color palette preview */}
        <div className="flex space-x-1">
          <div className="w-6 h-6 bg-blue-600 rounded-full" />
          <div className="w-6 h-6 bg-emerald-600 rounded-full" />
          <div className="w-6 h-6 bg-amber-600 rounded-full" />
          <div className="w-6 h-6 bg-purple-600 rounded-full" />
        </div>
      </div>
      <div className="relative group">
        <Button 
          variant="ghost" 
          className="bg-blue-100 hover:bg-blue-200"
          onClick={() => setShowChat(true)}
        >
          AI Assistant
        </Button>
        
        {showChat && (
          <div className="absolute right-0 mt-2 w-64 bg-white p-4 rounded-lg shadow-xl">
            <div className="h-48 overflow-y-auto mb-2">
              {messages?.map((msg, i) => (
                <div key={i} className="text-sm mb-2">
                  {msg.content?.map((part, j) => (
                    <span key={j}>{part.text}</span>
                  ))}
                </div>
              ))}
            </div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage({
                content: [{ text: input }]
              })}
            />
          </div>
        )}
      </div>
    </header>
  )
} 