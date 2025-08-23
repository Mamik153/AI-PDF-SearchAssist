import type { ChatSender } from '@/types/notebook'

export interface Source {
  id: string
  name: string
  size: string
  file: File
}

export interface ChatMessage {
  id: string
  content: string
  sender: ChatSender
  timestamp: Date
}

export interface StoredFile {
  name: string
  metadata?: {
    size?: number
  }
  updated_at: string
}
