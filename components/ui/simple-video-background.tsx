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
  const videoRef = useRef<HTMLVideoElement>(null)

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
    if (videoRef.current) {
      setIsLoaded(false)
      const video = videoRef.current

      const handleLoadedData = () => {
        console.log("Video loaded successfully:", videos[currentVideoIndex])
        setIsLoaded(true)
        video.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(error => {
            console.warn("Video autoplay failed:", error)
            setIsPlaying(false)
            setIsLoaded(true) // Still show as loaded even if autoplay fails
          })
      }

      const handleError = () => {
        console.error("Video failed to load:", videos[currentVideoIndex])
        setIsLoaded(true) // Show fallback
      }

      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('error', handleError)
      video.load()

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
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
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25 animate-gradient-x" />
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
