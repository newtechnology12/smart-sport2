"use client"

import { useState, useEffect, useRef } from "react"

interface VideoBackgroundProps {
  videos: string[]
  className?: string
  autoSlide?: boolean
  slideInterval?: number
}

export function VideoBackground({ 
  videos, 
  className = "", 
  autoSlide = true, 
  slideInterval = 8000 
}: VideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!autoSlide || videos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      )
    }, slideInterval)

    return () => clearInterval(interval)
  }, [autoSlide, videos.length, slideInterval])

  useEffect(() => {
    if (videoRef.current) {
      setIsLoading(true)
      videoRef.current.load()
    }
  }, [currentVideoIndex])

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    console.error(`Failed to load video: ${videos[currentVideoIndex]}`)
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
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/30"></div>

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
