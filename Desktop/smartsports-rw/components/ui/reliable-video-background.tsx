"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface ReliableVideoBackgroundProps {
  videos: string[]
  className?: string
  slideInterval?: number
  showIndicators?: boolean
}

export function ReliableVideoBackground({
  videos,
  className = "",
  slideInterval = 10000,
  showIndicators = true
}: ReliableVideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Ensure video plays reliably with better error handling
  const playVideo = useCallback(async () => {
    const video = videoRef.current
    if (!video) return

    try {
      // Reset video state
      video.currentTime = 0

      // Check if video is ready to play
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsVideoReady(true)
          return
        }
      }
    } catch (error) {
      // Handle different types of autoplay errors
      if (error.name === 'NotAllowedError') {
        console.warn("Autoplay blocked by browser policy. User interaction required.")
      } else if (error.name === 'AbortError') {
        console.warn("Video play interrupted:", error.message)
        // Try again after a short delay for AbortError
        setTimeout(() => {
          if (video && video.paused && video.readyState >= 3) {
            video.play().catch(() => {
              console.warn("Retry autoplay failed")
            })
          }
        }, 1000)
      } else {
        console.warn("Video autoplay failed:", error)
      }
    }
  }, [])

  // Handle video change
  useEffect(() => {
    const video = videoRef.current
    if (!video || videos.length === 0) return

    setIsVideoReady(false)

    const handleCanPlayThrough = () => {
      playVideo()
    }

    const handleLoadedData = () => {
      playVideo()
    }

    const handleError = (e: Event) => {
      console.error("Video error:", e)
      setIsVideoReady(false)
    }

    // Add event listeners
    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    // Force load the new video
    video.load()

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [currentVideoIndex, videos, playVideo])

  // Auto-slide functionality
  useEffect(() => {
    if (videos.length <= 1) return

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set new interval
    intervalRef.current = setInterval(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      )
    }, slideInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [videos.length, slideInterval])

  // Manual video switch
  const switchToVideo = useCallback((index: number) => {
    if (index >= 0 && index < videos.length && index !== currentVideoIndex) {
      setCurrentVideoIndex(index)
      
      // Reset auto-slide timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
          setCurrentVideoIndex((prevIndex) =>
            prevIndex === videos.length - 1 ? 0 : prevIndex + 1
          )
        }, slideInterval)
      }
    }
  }, [currentVideoIndex, videos.length, slideInterval])

  if (videos.length === 0) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
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
        // Additional attributes for better compatibility
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background when video is loading */}
      {!isVideoReady && (
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
    </div>
  )
}
