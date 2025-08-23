import { Loader } from '@/components/ai-elements/loader';
import { cn } from '@/lib/common-utils';

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export function LoadingSpinner({ message = "Loading...", className }: LoadingSpinnerProps) {
  return (
    <div className={cn("h-screen w-screen flex items-center justify-center", className)}>
      <div className="text-center">
        <Loader />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
