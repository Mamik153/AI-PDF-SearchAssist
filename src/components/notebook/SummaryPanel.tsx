import { useQuery } from '@tanstack/react-query'
import { BookOpen, ChevronLeft, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorDisplay } from './ErrorDisplay'
import { api, type SummaryResponse } from '@/lib/api'
import { useRef } from 'react'

interface SummaryPanelProps {
  isOpen: boolean
  onToggle: () => void
}

export function SummaryPanel({ isOpen, onToggle }: SummaryPanelProps) {
  const hasFetchedRef = useRef(false)
  
  const { 
    data: summaryContent, 
    isLoading, 
    error,
    refetch,
    isFetching
  } = useQuery<SummaryResponse>({
    queryKey: ['summary'],
    queryFn: api.fetchSummary,
    enabled: isOpen && !hasFetchedRef.current, // Only fetch when panel is open and hasn't been fetched before
    staleTime: Infinity, // Never consider data stale
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  })

  // Mark as fetched when data is loaded or error occurs
  if ((summaryContent || error) && isOpen) {
    hasFetchedRef.current = true
  }

  const handleManualRefetch = () => {
    refetch()
  }

  // Render markdown content as HTML (basic implementation)
  const renderMarkdown = (content: string) => {
    // This is a simple markdown renderer. For production, consider using a library like 'react-markdown'
    return content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n/gim, '<br>')
  }

  return (
    <div className={`flex transition-all duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-0'}`}>
      {/* Toggle Button - Always visible */}
      {/* <div className="flex items-center justify-center w-12 border-l bg-gray-50 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={`h-8 w-8 p-0 transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
          title={isOpen ? "Close Summary" : "Open Summary"}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div> */}
      
      {/* Panel Content - Slides in/out */}
      <div className={`border bg-white rounded-2xl flex flex-col h-full transition-all duration-300 ease-in-out overflow-hidden w-80 ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {/* Header */}
        <div className="border-b p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BookOpen className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Summary</span>
              <span className="truncate text-xs text-gray-500">Document insights</span>
            </div>
            {/* Refetch Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualRefetch}
              disabled={isFetching}
              className="h-8 w-8 p-0"
              title="Refresh summary"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            
            <div>
              {(isLoading || isFetching) ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner className='h-full' message={isLoading ? "Loading summary..." : "Refreshing summary..."} />
                </div>
              ) : error ? (
                <ErrorDisplay
                  title="Summary Error"
                  message={error instanceof Error ? error.message : 'Failed to load summary'}
                  onRetry={handleManualRefetch}
                />
              ) : summaryContent ? (
                <div 
                  className="prose text-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ 
                    __html: renderMarkdown(summaryContent.summary) 
                  }}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No summary available</p>
                  <p className="text-xs">Upload and process documents to generate a summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

