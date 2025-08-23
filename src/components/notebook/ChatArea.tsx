import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { BookOpen, Loader2 } from 'lucide-react'
import { ChatMessageItem } from './ChatMessageItem'
import { ChatInput } from './ChatInput'
import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation';
import { Loader } from '../ai-elements/loader'


import type { ChatMessage } from '@/interfaces/notebook'

interface ChatAreaProps {
  messages: ChatMessage[]
  chatInput: string
  onChatInputChange: (value: string) => void
  onSendMessage: () => void
  onToggleSummary: () => void
  isSummaryOpen: boolean
  isLoading?: boolean
}

export function ChatArea({
  messages,
  chatInput,
  onChatInputChange,
  onSendMessage,
  onToggleSummary,
  isSummaryOpen,
  isLoading = false
}: ChatAreaProps) {
  return (
    <SidebarInset className="flex flex-col border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b bg-white flex items-center px-6 flex-shrink-0 justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="mr-4" />
          <h1 className="text-lg font-semibold text-gray-900">
            Notebook
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSummary}
          className={`flex items-center gap-2 ${isSummaryOpen ? 'bg-accent text-accent-foreground' : ''}`}
          title={isSummaryOpen ? 'Close Summary' : 'Open Summary'}
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Summary</span>
        </Button>
      </div>

      {/* Chat Messages */}
      <Conversation className="flex-1 px-6 h-[calc(100vh-14rem)]" >
        <ConversationContent>
          {messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex py-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </ConversationContent>
      </Conversation>


      {/* Chat Input */}
      <ChatInput
        value={chatInput}
        onChange={onChatInputChange}
        onSend={onSendMessage}
        disabled={isLoading}
      />
    </SidebarInset>
  )
}
