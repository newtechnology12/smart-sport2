"use client"

import { useState, useEffect, useRef } from "react"

interface PreloadedVideoBackgroundProps {
  videos: string[]
  className?: string
  slideInterval?: number
  showIndicators?: boolean
}

export function PreloadedVideoBackground({
  videos,
  className = "",
  slideInterval = 10000,
  showIndicators = true
}: PreloadedVideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Initialize video refs and loading state
  useEffect(() => {
    videoRefs.current = new Array(videos.length).fill(null)
    setVideosLoaded(new Array(videos.length).fill(false))
  }, [videos.length])

  // Handle video loading
  const handleVideoLoad = (index: number) => {
    setVideosLoaded(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  // Auto-slide functionality
  useEffect(() => {
    if (videos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      )
    }, slideInterval)

    return () => clearInterval(interval)
  }, [videos.length, slideInterval])

  // Play current video and pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0
          video.play().catch(error => {
            console.warn(`Failed to play video ${index}:`, error)
          })
        } else {
          video.pause()
        }
      }
    })
  }, [currentVideoIndex])

  const switchToVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentVideoIndex(index)
    }
  }

  if (videos.length === 0) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* All Video Elements (hidden except current) */}
      {videos.map((video, index) => (
        <video
          key={video}
          ref={el => videoRefs.current[index] = el}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentVideoIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
          autoPlay={index === currentVideoIndex}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => handleVideoLoad(index)}
          style={{ backgroundColor: '#000' }}
          webkit-playsinline="true"
          x5-playsinline="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      ))}

      {/* Fallback background when videos are loading */}
      {!videosLoaded[currentVideoIndex] && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25 z-0" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Video Indicators */}
      {showIndicators && videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => switchToVideo(index)}
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

      {/* Loading indicator */}
      {!videosLoaded[currentVideoIndex] && (
        <div className="absolute inset-0 flex items-center justify-center z-15">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm opacity-75">Loading video...</p>
          </div>
        </div>
      )}
    </div>
  )
}
