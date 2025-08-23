import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from '@/components/ai-elements/prompt-input';

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSend()
  }

  return (
    <div className="border-t p-4 flex-shrink-0">
      <PromptInput onSubmit={handleSubmit} className="mt-4 relative">
        <PromptInputTextarea 
          onChange={(e) => {
            onChange(e.target.value)
          }} 
          value={value}
          disabled={disabled}
        />
        <PromptInputToolbar>
          <PromptInputSubmit
            className="absolute right-1 bottom-1"
            disabled={disabled || !value.trim()}
            status={'ready'}
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
    // <div className="border-t p-4 flex-shrink-0">
    //   <div className="flex space-x-3 border rounded-2xl flex-col p-2">
    //     <Textarea
    //       placeholder="Type your message..."
    //       value={value}
    //       onChange={(e) => onChange(e.target.value)}
    //       onKeyDown={onKeyPress}
    //       className="flex-1 min-h-[60px] max-h-32 resize-none border-none active:ouline-none focus-visible:ring-0"
    //       disabled={disabled}
    //     />
    //     <Button
    //       onClick={onSend}
    //       disabled={!value.trim() || disabled}
    //       size="lg"
    //       className="h-12 w-12 aspect-square rounded-full ml-auto"
    //     >
    //       <Send className="h-4 w-4" />
    //     </Button>
    //   </div>
    // </div>
  )
}
