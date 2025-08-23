import { useState, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import type { ChatMessage } from '@/interfaces/notebook'
import { api } from '@/lib/api'

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  content: 'Hey there👋 I\'m here to help you with your notebook. What would you like to know? 🤔',
  sender: 'assistant',
  timestamp: new Date()
}

export function useChat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [chatInput, setChatInput] = useState('')

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: api.processMessage,
    onSuccess: (data) => {
      // Add bot response to chat
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        content: data.botResponse,
        sender: 'assistant',
        timestamp: new Date()
      }
      addMessage(assistantMessage)
    },
    onError: (error) => {
      console.error('Error sending message:', error)
      addErrorMessage('Sorry, I encountered an error processing your message. Please try again.')
    }
  })

  const addMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prev => [...prev, message])
  }, [])

  const addWelcomeMessage = useCallback((pdfCount: number) => {
    if (pdfCount > 0) {
      const welcomeMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        content: `Found ${pdfCount} existing PDF(s) in your storage. You can upload more or start asking questions about the documents.`,
        sender: 'assistant',
        timestamp: new Date()
      }
      addMessage(welcomeMessage)
    }
  }, [addMessage])

  const addErrorMessage = useCallback((errorText: string) => {
    const errorMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: errorText,
      sender: 'assistant',
      timestamp: new Date()
    }
    addMessage(errorMessage)
  }, [addMessage])

  const sendMessage = useCallback(() => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: userMessage,
      sender: 'user',
      timestamp: new Date()
    }

    addMessage(newMessage)
    setChatInput('')

    // Use the mutation to send the message
    sendMessageMutation.mutate(userMessage)
  }, [chatInput, addMessage, sendMessageMutation])

  return {
    chatMessages,
    chatInput,
    setChatInput,
    sendMessage,
    addMessage,
    addWelcomeMessage,
    addErrorMessage,
    isLoading: sendMessageMutation.isPending
  }
}
