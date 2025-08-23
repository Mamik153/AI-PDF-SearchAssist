// API functions for the application
const API_BASE_URL = 'http://localhost:8080'
const API_KEY = 'dev-key-1'

// API response types
export interface ProcessMessageResponse {
  botResponse: string
}

export interface ProcessDocumentResponse {
  // Define the response structure based on your backend
  [key: string]: any
}

export interface SummaryResponse {
  summary: string
  sources: any
  cached: boolean
}

// API functions
export const api = {

  // Fetch chat history
  async fetchChatHistory(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/chat-history?conversationId=default&limit=50`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch chat history')
    }
   // console.log("RESPONSE", await response.json())
    return await response.json()
  },


  // Fetch summary
  async fetchSummary(): Promise<SummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/summary`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch summary')
    }
   // console.log("RESPONSE", await response.json())
    return await response.json()
  },

  // Process message (chat)
  async processMessage(userMessage: string): Promise<ProcessMessageResponse> {
    const response = await fetch(`${API_BASE_URL}/process-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify({
        userMessage,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Process documents
  async processDocuments(): Promise<ProcessDocumentResponse> {
    const response = await fetch(`${API_BASE_URL}/process-document`)
    
    if (!response.ok) {
      throw new Error('Failed to process documents')
    }
    
    return response.json()
  },
}
