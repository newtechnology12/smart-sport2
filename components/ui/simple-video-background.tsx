"use client"

import { useState, useEffect } from "react"

interface SimpleVideoBackgroundProps {
  videos: string[]
  className?: string
  slideInterval?: number
}

export function SimpleVideoBackground({
  videos,
  className = "",
  slideInterval = 10000
}: SimpleVideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log("SimpleVideoBackground render:", {
      videos,
      currentVideoIndex,
      currentVideo: videos[currentVideoIndex]
    })
  }

  // Auto-slide effect
  useEffect(() => {
    if (videos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      )
    }, slideInterval)

    return () => clearInterval(interval)
  }, [videos.length, slideInterval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Element */}
      {videos.length > 0 && (
        <video
          key={videos[currentVideoIndex]} // Force re-render when video changes
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          suppressHydrationWarning={true}
          style={{ zIndex: 1 }}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Video Indicators */}
      {videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Switch to video ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
