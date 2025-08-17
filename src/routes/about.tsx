import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="p-2">
      <h3 className="text-lg font-semibold">About</h3>
      <p>Hello from About page!</p>
    </div>
  )
}