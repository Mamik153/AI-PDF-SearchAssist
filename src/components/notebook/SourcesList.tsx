import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import { Plus, FileText, X, Library, Upload } from 'lucide-react'
import type { Source } from '@/interfaces/notebook'
import { Loader } from '../ai-elements/loader'
import { cn } from '@/lib/common-utils'

interface SourcesListProps {
  sources: Source[]
  isLoadingPDFs: boolean
  isUploading: boolean
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveSource: (sourceId: string) => void
  onProcessPDFs: () => void
}

export function SourcesList({
  sources,
  isLoadingPDFs,
  isUploading,
  onFileUpload,
  onRemoveSource,
  onProcessPDFs
}: SourcesListProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Sidebar collapsible="icon" className='h-full rounded-2xl overflow-hidden border bg-white'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-white data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Library className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Sources</span>
                <span className="truncate text-xs">{sources.length}/20</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => fileInputRef.current?.click()}
                  disabled={sources.length >= 20}
                  className="w-full items-center justify-center"
                  tooltip="Add PDF"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add PDF</span>
                </SidebarMenuButton>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={onFileUpload}
                  className="hidden"
                />
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu className="mt-4">
              {isLoadingPDFs ? (
                <SidebarMenuItem>
                  <div className="text-center py-8 text-gray-500 px-2 group-data-[collapsible=icon]:hidden">
                    <Loader />
                    <p className="text-sm">Loading existing PDFs...</p>
                  </div>
                </SidebarMenuItem>
              ) : sources.length === 0 ? (
                <SidebarMenuItem>
                  <div className="text-center py-8 text-gray-500 px-2 group-data-[collapsible=icon]:hidden">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No sources added yet</p>
                    <p className="text-xs">Upload PDFs to get started</p>
                  </div>
                </SidebarMenuItem>
              ) : (
                sources.map((source) => (
                  <SidebarMenuItem key={source.id}>
                    <SidebarMenuButton
                      asChild
                      className="h-auto p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                      tooltip={source.name}
                    >
                      <div className="flex items-center justify-between w-full cursor-pointer">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <FileText className="h-4 w-4 text-red-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                              {source.name}
                            </p>
                            <p className="text-xs text-gray-500">{source.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onRemoveSource(source.id)
                          }}
                          className={cn("h-6 w-6 p-0 rounded hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors", "group-data-[collapsible=icon]:hidden")}
                          aria-label="Remove source"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>

            {/* Process Button */}
            {sources.length > 0 && (
              <div className="mt-4">

                <SidebarMenuButton
                  onClick={onProcessPDFs}
                  disabled={isUploading}
                  variant="outline"
                  className="w-full"
                  tooltip={isUploading ? 'Processing...' : 'Process PDFs'}
                >
                  <Upload className="h-4 w-4" />
                  <span>{isUploading ? 'Processing...' : 'Process PDFs'}</span>
                </SidebarMenuButton>

              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
