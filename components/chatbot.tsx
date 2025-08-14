"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you with our organic products today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Send to n8n webhook
      const response = await fetch("https://prasad18.app.n8n.cloud/webhook/chat-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          timestamp: new Date().toISOString(),
          sessionId: "web-chat-" + Date.now(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot")
      }

      

      // Add bot response
      //const botMessage: Message = {
        //id: (Date.now() + 1).toString(),
        //text:
         // data.response ||
         // data.message ||
          //"I apologize, but I couldn't process your request right now. Please try again.",
        //sender: "bot",
        //timestamp: new Date(),
      //}

      const data = await response.json()

      const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text:
        data.output || data.response || data.message || "I apologize, but I couldn't process your request right now. Please try again.",
       sender: "bot",
        timestamp: new Date(),
        }



      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chatbot error:", error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-rose-500 hover:bg-rose-600 shadow-lg z-50 p-0"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 bg-white shadow-2xl z-50 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b bg-rose-500 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-rose-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div className="text-sm">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-rose-500 hover:bg-rose-600"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
