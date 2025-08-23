import Markdown from 'react-markdown'
import type { ChatMessage } from '@/interfaces/notebook'
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
interface ChatMessageItemProps {
  message: ChatMessage
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  return (
    <Message from={message.sender} key={message.id}>
      <MessageContent>
        <Markdown>
          {message.content}
        </Markdown>
      </MessageContent>
    </Message>
  )
  // return (
  //   <div
  //     className={`flex flex-col ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
  //   >
  //     <div
  //       className={`max-w-[80%] rounded-2xl text-sm px-4 py-2 ${message.sender === 'user'
  //           ? 'bg-blue-600 text-white ml-auto'
  //           : 'text-gray-900'
  //         }`}
  //     >
  //       <Markdown>
  //         {message.content}
  //       </Markdown>


  //     </div>
  //     <p className={`text-xs mt-1 text-neutral-500 ${message.sender === 'user' ? 'ml-auto' : 'ml-5'
  //       }`}>
  //       {message.timestamp.toLocaleTimeString()}
  //     </p>
  //   </div>
  // )
}
