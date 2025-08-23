
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {



  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-5xl font-bold">Welcome To you PDF Assistant</h3>
      <p className="text-muted-foreground text-lg">Navigate to notebook, upload pdfs and ask what you want</p>
      <Link to="/notebook">
        <Button className='mt-3 rounded-full' size="lg">
          Go to Notebook
        </Button>
      </Link>

    </div>
  )
}