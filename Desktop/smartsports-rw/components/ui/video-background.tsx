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
  const [hasError, setHasError] = useState(false)
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
    if (videoRef.current && videos.length > 0) {
      console.log("Loading video:", videos[currentVideoIndex])
      setIsLoading(true)
      setHasError(false)
      const video = videoRef.current

      // Reset video and load new source
      video.pause()
      video.currentTime = 0
      video.load()

      // Add a timeout to handle loading issues
      const loadTimeout = setTimeout(() => {
        console.warn("Video loading timeout for:", videos[currentVideoIndex])
        setIsLoading(false)
        setHasError(true)
      }, 8000)

      // Try to play the video after a short delay
      setTimeout(() => {
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Video playing successfully:", videos[currentVideoIndex])
                clearTimeout(loadTimeout)
                setIsLoading(false)
                setHasError(false)
              })
              .catch(error => {
                if (error.name === 'AbortError') {
                  console.warn("Video play interrupted (power saving):", videos[currentVideoIndex])
                  // Try again after a longer delay for AbortError
                  setTimeout(() => {
                    if (video && video.paused && video.readyState >= 3) {
                      video.play().catch(() => {
                        console.warn("Retry autoplay failed")
                        setHasError(true)
                      })
                    }
                  }, 1000)
                } else {
                  console.error("Video play failed:", error, videos[currentVideoIndex])
                  clearTimeout(loadTimeout)
                  setIsLoading(false)
                  setHasError(true)
                }
              })
          }
        }
      }, 100)

      return () => clearTimeout(loadTimeout)
    }
  }, [currentVideoIndex, videos])

  const handleVideoLoad = () => {
    console.log("Video loaded:", videos[currentVideoIndex])
    setIsLoading(false)
    setHasError(false)
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error)
        setHasError(true)
      })
    }
  }

  const handleVideoError = (e: any) => {
    console.error(`Failed to load video: ${videos[currentVideoIndex]}`, e)
    setIsLoading(false)
    setHasError(true)
  }

  const handleCanPlay = () => {
    console.log("Video can play:", videos[currentVideoIndex])
    setIsLoading(false)
    setHasError(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Element */}
      {videos.length > 0 && (
        <video
          key={videos[currentVideoIndex]} // Force re-render when video changes
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleCanPlay}
          onError={handleVideoError}
          onLoadStart={() => {
            console.log("Video load start:", videos[currentVideoIndex])
            setIsLoading(true)
          }}
          suppressHydrationWarning={true} // Prevent hydration warnings
          style={{ display: hasError ? 'none' : 'block' }}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Background */}
      {(isLoading || hasError || videos.length === 0) && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25 animate-gradient-x" />
      )}

      {/* Loading Overlay */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/35 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <p className="text-sm font-medium opacity-75">Video unavailable</p>
          </div>
        </div>
      )}

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>

      {/* Video Indicators */}
      {videos.length > 1 && !hasError && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
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
