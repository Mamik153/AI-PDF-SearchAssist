import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import * as React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useAnonSession } from '@/hooks/useAnonSession'
import { usePDFSources } from '@/hooks/usePDFSources'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useChat } from '@/hooks/useChat'
import { LoadingSpinner } from '@/components/notebook/LoadingSpinner'
import { ErrorDisplay } from '@/components/notebook/ErrorDisplay'
import { SourcesList } from '@/components/notebook/SourcesList'
import { ChatArea } from '@/components/notebook/ChatArea'
import { SummaryPanel } from '@/components/notebook/SummaryPanel'
import { useProcessDocuments } from '@/hooks/useProcessDocuments'

export const Route = createFileRoute('/notebook')({
  component: Notebook,
  pendingComponent: () => <LoadingSpinner message="Loading your notebook..." />,
  errorComponent: ({ error }) => (
    <ErrorDisplay
      title="Failed to Load Notebook"
      message="There was an error loading your notebook data. Please try refreshing the page."
      error={error}
    />
  ),
})



// Wrapper component to handle sidebar states
function NotebookContent() {
  const { ready, sessionError } = useAnonSession()
  const { sources, isLoadingPDFs, addSources, removeSource } = usePDFSources(ready, sessionError)
  const { isUploading, uploadFiles } = useFileUpload()
  const { processDocuments, isProcessing } = useProcessDocuments()
  const {
    chatMessages,
    chatInput,
    setChatInput,
    sendMessage,
    addWelcomeMessage,
    addErrorMessage,
    isLoading
  } = useChat()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSummaryPanelOpen, setIsSummaryPanelOpen] = useState(true)

  // Add welcome message when PDFs are loaded (only once)
  // React.useEffect(() => {
  //   if (sources.length > 0 && ready && !sessionError && chatMessages.length === 1) {
  //     addWelcomeMessage(sources.length)
  //   }
  // }, [sources.length, ready, sessionError, addWelcomeMessage, chatMessages.length])

  if (!ready) {
    return <LoadingSpinner message="Booting secure guest session…" />
  }

  if (sessionError) {
    return (
      <ErrorDisplay
        title="Authentication Error"
        message={`Error: ${sessionError}`}
        onRetry={() => window.location.reload()}
      />
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(
      event.target.files,
      sources.length,
      (newSources, message) => {
        addSources(newSources)
        addErrorMessage(message) // Using addErrorMessage for success message too
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      },
      (message) => {
        addErrorMessage(message)
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    )
  }

  const handleProcessPDFs = () => {
    processDocuments()
  }

  const toggleSummaryPanel = () => {
    setIsSummaryPanelOpen(prev => !prev)
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden p-5 gap-4">
      <SourcesList
        sources={sources}
        isLoadingPDFs={isLoadingPDFs}
        isUploading={isUploading || isProcessing}
        onFileUpload={handleFileUpload}
        onRemoveSource={removeSource}
        onProcessPDFs={handleProcessPDFs}
      />
      <ChatArea
        messages={chatMessages}
        chatInput={chatInput}
        onChatInputChange={setChatInput}
        onSendMessage={sendMessage}
        onToggleSummary={toggleSummaryPanel}
        isSummaryOpen={isSummaryPanelOpen}
        isLoading={isLoading}
      />
      <SummaryPanel
        isOpen={isSummaryPanelOpen}
        onToggle={toggleSummaryPanel}
      />
    </div>
  )
}

function Notebook() {
  return (
    <SidebarProvider>
      <NotebookContent />
    </SidebarProvider>
  )
}