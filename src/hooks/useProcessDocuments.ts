import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useProcessDocuments() {
  const mutation = useMutation({
    mutationFn: api.processDocuments,
    onSuccess: (data) => {
      console.log('Documents processed successfully:', data)
    },
    onError: (error) => {
      console.error('Error processing documents:', error)
    }
  })

  return {
    processDocuments: mutation.mutate,
    isProcessing: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset
  }
}
