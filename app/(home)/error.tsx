'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Quelque chose s&apos;est mal passé !</h2>
      <button onClick={() => reset()}>Essayer à nouveau</button>
    </div>
  )
}
