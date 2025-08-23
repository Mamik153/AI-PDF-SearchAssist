import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Source, StoredFile } from '@/interfaces/notebook'

async function fetchExistingPDFs(): Promise<Source[]> {
  try {
    const { data: files, error } = await supabase.storage
      .from('pdfs')
      .list('', {
        limit: 20,
        sortBy: { column: 'updated_at', order: 'desc' }
      })

    if (error) {
      console.error('Error fetching files:', error)
      return []
    }

    if (!files) return []

    // Filter PDF files and convert to Source format
    const pdfSources: Source[] = files
      .filter((file: StoredFile) => file.name.toLowerCase().endsWith('.pdf'))
      .map((file: StoredFile) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name.replace(/^\d+-/, ''), // Remove timestamp prefix if present
        size: file.metadata?.size
          ? `${(file.metadata.size / (1024 * 1024)).toFixed(2)} MB`
          : 'Unknown size',
        file: new File([], file.name, { type: 'application/pdf' }) // Placeholder file object
      }))

    return pdfSources
  } catch (error) {
    console.error('Error fetching existing PDFs:', error)
    return []
  }
}

export function usePDFSources(ready: boolean, sessionError: string | null) {
  const [sources, setSources] = useState<Source[]>([])
  const [isLoadingPDFs, setIsLoadingPDFs] = useState(false)

  // Fetch existing PDFs when session is ready
  useEffect(() => {
    if (ready && !sessionError) {
      const loadExistingPDFs = async () => {
        setIsLoadingPDFs(true)
        try {
          const existingPDFs = await fetchExistingPDFs()
          setSources(existingPDFs)
        } catch (error) {
          console.error('Error loading existing PDFs:', error)
        } finally {
          setIsLoadingPDFs(false)
        }
      }

      loadExistingPDFs()
    }
  }, [ready, sessionError])

  const addSources = (newSources: Source[]) => {
    setSources(prev => [...prev, ...newSources])
  }

  const removeSource = (sourceId: string) => {
    setSources(prev => prev.filter(source => source.id !== sourceId))
  }

  return {
    sources,
    isLoadingPDFs,
    addSources,
    removeSource
  }
}
