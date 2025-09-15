"use client"

import { useState, useEffect, useRef } from "react"
import { Play } from "lucide-react"

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
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log("SimpleVideoBackground render:", {
      videos,
      currentVideoIndex,
      currentVideo: videos[currentVideoIndex],
      isLoaded,
      isPlaying,
      hasError
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

  // Handle video change
  useEffect(() => {
    console.log("useEffect triggered:", {
      hasVideoRef: !!videoRef.current,
      videosLength: videos.length,
      currentVideoIndex,
      currentVideo: videos[currentVideoIndex]
    })

    if (videoRef.current && videos.length > 0) {
      console.log("Starting video load process for:", videos[currentVideoIndex])
      setIsLoaded(false)
      setIsPlaying(false)
      setHasError(false)
      const video = videoRef.current

      const handleLoadedData = () => {
        console.log("Video loaded successfully:", videos[currentVideoIndex])
        setIsLoaded(true)
        setHasError(false)
        // Try to play the video
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Video playing successfully:", videos[currentVideoIndex])
              setIsPlaying(true)
            })
            .catch(error => {
              console.warn("Video autoplay failed:", error)
              setIsPlaying(false)
              setIsLoaded(true) // Still show as loaded even if autoplay fails
            })
        }
      }

      const handleError = (e: Event) => {
        console.error("Video failed to load:", videos[currentVideoIndex], e)
        setHasError(true)
        setIsLoaded(true) // Show fallback
        setIsPlaying(false)
      }

      const handleCanPlay = () => {
        console.log("Video can play:", videos[currentVideoIndex])
        if (!isLoaded) {
          setIsLoaded(true)
        }
      }

      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('error', handleError)
      video.addEventListener('canplay', handleCanPlay)

      // Add more event listeners for debugging
      video.addEventListener('loadstart', () => {
        console.log("Video load start:", videos[currentVideoIndex])
      })
      video.addEventListener('loadedmetadata', () => {
        console.log("Video metadata loaded:", videos[currentVideoIndex])
      })
      video.addEventListener('canplaythrough', () => {
        console.log("Video can play through:", videos[currentVideoIndex])
      })

      // Force reload the video
      console.log("Loading video:", videos[currentVideoIndex])
      video.load()

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('loadstart', () => {})
        video.removeEventListener('loadedmetadata', () => {})
        video.removeEventListener('canplaythrough', () => {})
      }
    }
  }, [currentVideoIndex, videos])

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        suppressHydrationWarning={true} // Prevent hydration warnings
        style={{
          display: hasError ? 'none' : 'block',
          visibility: isLoaded && !hasError ? 'visible' : 'hidden'
        }} // Ensure consistent styling and proper visibility
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25 animate-gradient-x">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm opacity-75">Loading video...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/35">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-sm opacity-75">Video unavailable</p>
            </div>
          </div>
        </div>
      )}

      {/* Play Button (when autoplay fails) */}
      {isLoaded && !isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-20"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Play className="h-8 w-8 text-white ml-1" />
          </div>
        </button>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Video Indicators */}
      {videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
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
