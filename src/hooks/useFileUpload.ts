import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Source } from '@/interfaces/notebook'

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)

  const uploadFiles = async (
    files: FileList | null, 
    currentSourcesCount: number,
    onSuccess: (sources: Source[], message: string) => void,
    onError: (message: string) => void
  ): Promise<void> => {
    if (!files) return

    setIsUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (file.type === 'application/pdf' && currentSourcesCount < 20) {
          // Generate unique filename with timestamp
          const timestamp = Date.now()
          const fileName = `${timestamp}-${file.name}`

          // Upload to Supabase storage
          const { data, error } = await supabase.storage
            .from('pdfs')
            .upload(fileName, file, {
              upsert: true // Allow overwriting files with same name
            })

          if (error) {
            console.error('Upload error for', file.name, ':', error)
            throw error
          }

          // Get the public URL (optional, for logging)
          const { data: urlData } = supabase.storage
            .from('pdfs')
            .getPublicUrl(fileName)

          console.log('Uploaded file path:', data.path)
          console.log('Public URL:', urlData.publicUrl)

          // Create source object for local state
          const newSource: Source = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            file: file
          }

          return { source: newSource, path: data.path, success: true }
        }
        return null
      }).filter(Boolean) // Remove null values

      const results = await Promise.allSettled(uploadPromises)

      const successfulUploads: Source[] = []
      const paths: string[] = []

      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          successfulUploads.push(result.value.source)
          paths.push(result.value.path)
        } else if (result.status === 'rejected') {
          console.error('Upload failed:', result.reason)
        }
      })

      // Log all uploaded file paths
      console.log('All uploaded file paths:', paths)

      // Call success callback with successfully uploaded files
      if (successfulUploads.length > 0) {
        onSuccess(
          successfulUploads, 
          `Successfully uploaded ${successfulUploads.length} file(s) to storage.`
        )
      }

    } catch (error) {
      console.error('Upload error:', error)
      onError('File upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return {
    isUploading,
    uploadFiles
  }
}
