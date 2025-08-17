import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3 className="text-4xl font-semibold">Welcome Home!</h3>
      <p>This is your TanStack Router application.</p>
      <div className="mt-4">
        <p>Navigate using the links above to explore different pages.</p>
      </div>
    </div>
  )
}