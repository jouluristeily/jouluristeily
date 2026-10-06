'use client'

import { useCallback, useState } from 'react'

export function HeroLogo({ siteName }: { siteName: string }) {
  const [failed, setFailed] = useState(false)
  const checkLogo = useCallback((image: HTMLImageElement | null) => {
    // The image may have failed before React attached its error handler.
    if (image?.complete && image.naturalWidth === 0) {
      setFailed(true)
    }
  }, [])

  if (failed) {
    return <h1 className="home-title">{siteName}</h1>
  }

  return (
    <h1 className="home-logo">
      <img
        ref={checkLogo}
        src="/logo.svg"
        alt={siteName}
        width={960}
        height={560}
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
    </h1>
  )
}
