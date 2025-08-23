import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ErrorDisplayProps {
  title: string
  message: string
  onRetry?: () => void
  showRetryButton?: boolean
  error?: unknown
}

export function ErrorDisplay({ 
  title, 
  message, 
  onRetry, 
  showRetryButton = true,
  error 
}: ErrorDisplayProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center max-w-md p-6">
        <div className="text-red-500 mb-4">
          <X className="h-12 w-12 mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        {showRetryButton && (
          <Button onClick={handleRetry} className="mt-4">
            {onRetry ? 'Retry' : 'Refresh Page'}
          </Button>
        )}
        {process.env.NODE_ENV === 'development' && error ? (
          <pre className="mt-4 text-xs text-left bg-gray-100 p-2 rounded overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        ) : null}
      </div>
    </div>
  )
}
