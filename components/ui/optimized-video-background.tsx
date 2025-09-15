"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface OptimizedVideoBackgroundProps {
  videos: string[]
  className?: string
  slideInterval?: number
  showIndicators?: boolean
}

export function OptimizedVideoBackground({
  videos,
  className = "",
  slideInterval = 10000,
  showIndicators = true
}: OptimizedVideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle user interaction for autoplay policy
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true)
      const video = videoRef.current
      if (video && video.paused) {
        video.play().catch(console.warn)
      }
    }
  }, [hasUserInteracted])

  // Add interaction listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const events = ['click', 'touchstart', 'keydown']
    events.forEach(event => {
      container.addEventListener(event, handleUserInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        container.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [handleUserInteraction])

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

  // Handle video loading and playback
  useEffect(() => {
    const video = videoRef.current
    if (!video || videos.length === 0) return

    const handleCanPlay = () => {
      // Try to play immediately
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.warn("Autoplay prevented:", error.message)
            setIsPlaying(false)
            // Show play button or wait for user interaction
          })
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = (e: Event) => {
      console.error("Video error:", e)
      setIsPlaying(false)
    }

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    // Force load the video
    video.load()

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
    }
  }, [currentVideoIndex, videos])

  const switchToVideo = useCallback((index: number) => {
    if (index >= 0 && index < videos.length && index !== currentVideoIndex) {
      setCurrentVideoIndex(index)
    }
  }, [currentVideoIndex, videos.length])

  const handlePlayClick = useCallback(() => {
    const video = videoRef.current
    if (video) {
      if (video.paused) {
        video.play().catch(console.warn)
      } else {
        video.pause()
      }
    }
  }, [])

  if (videos.length === 0) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25" />
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className} cursor-pointer`}
      onClick={handleUserInteraction}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        suppressHydrationWarning
        style={{
          zIndex: 1,
          display: 'block',
          backgroundColor: '#000'
        }}
        // Enhanced compatibility attributes
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25 z-0" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Play button overlay (shown when autoplay fails) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-15">
          <button
            onClick={handlePlayClick}
            className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all duration-300 backdrop-blur-sm"
            aria-label="Play video"
          >
            <svg 
              className="w-12 h-12 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Video Indicators */}
      {showIndicators && videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                switchToVideo(index)
              }}
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

      {/* Click to play hint */}
      {!isPlaying && !hasUserInteracted && (
        <div className="absolute top-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded z-20">
          Click to play video
        </div>
      )}
    </div>
  )
}
