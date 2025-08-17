import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  SidebarTrigger 
} from '@/components/ui/sidebar'
import { Plus, Send, FileText, X, Library } from 'lucide-react'

export const Route = createFileRoute('/notebook/$id')({
  component: Notebook,
})

interface Source {
  id: string
  name: string
  size: string
}

interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

function Notebook() {
  const { id } = Route.useParams()
  const [sources, setSources] = useState<Source[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m here to help you with your notebook. What would you like to know?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf' && sources.length < 20) {
        const newSource: Source = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        }
        setSources(prev => [...prev, newSource])
      }
    })

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeSource = (sourceId: string) => {
    setSources(prev => prev.filter(source => source.id !== sourceId))
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: chatInput,
      sender: 'user',
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, newMessage])
    setChatInput('')

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        content: 'I received your message: "' + newMessage.content + '". How can I help you further?',
        sender: 'assistant',
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  return (
    <SidebarProvider>
      <div className="h-screen w-screen flex overflow-hidden">
        {/* Sidebar - Sources */}
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Library className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Sources</span>
                    <span className="truncate text-xs">{sources.length}/20</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Documents</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => fileInputRef.current?.click()}
                      disabled={sources.length >= 20}
                      className="w-full"
                      tooltip="Add PDF"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add PDF</span>
                    </SidebarMenuButton>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </SidebarMenuItem>
                </SidebarMenu>
                
                <SidebarMenu className="mt-4">
                  {sources.length === 0 ? (
                    <SidebarMenuItem>
                      <div className="text-center py-8 text-gray-500 px-2 group-data-[collapsible=icon]:hidden">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No sources added yet</p>
                        <p className="text-xs">Upload PDFs to get started</p>
                      </div>
                    </SidebarMenuItem>
                  ) : (
                    sources.map((source) => (
                      <SidebarMenuItem key={source.id}>
                        <SidebarMenuButton
                          className="h-auto p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                          tooltip={source.name}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <FileText className="h-4 w-4 text-red-500 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">
                                  {source.name}
                                </p>
                                <p className="text-xs text-gray-500">{source.size}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeSource(source.id)
                              }}
                              className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content - Chat */}
        <SidebarInset className="flex flex-col">
          {/* Header */}
          <div className="h-16 border-b bg-white flex items-center px-6 flex-shrink-0">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-lg font-semibold text-gray-900">
              Notebook - {id}
            </h1>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="border-t p-4 flex-shrink-0">
            <div className="flex space-x-3 border rounded-2xl flex-col p-2">
              <Textarea
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 min-h-[60px] max-h-32 resize-none border-none active:ouline-none focus-visible:ring-0"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                size="lg"
                className="h-12 w-12 aspect-square rounded-full ml-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}