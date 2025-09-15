'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button } from './button'

interface VideoBackgroundSlidesProps {
  videos: string[]
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  showControls?: boolean
  slideInterval?: number
  showIndicators?: boolean
  onVideoChange?: (index: number) => void
}

export function VideoBackgroundSlides({
  videos,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  showControls = true,
  slideInterval = 10000,
  showIndicators = true,
  onVideoChange
}: VideoBackgroundSlidesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const nextVideo = useCallback(() => {
    const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    onVideoChange?.(newIndex)
  }, [currentIndex, videos.length, onVideoChange])

  const prevVideo = useCallback(() => {
    const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    onVideoChange?.(newIndex)
  }, [currentIndex, videos.length, onVideoChange])

  const goToVideo = (index: number) => {
    setCurrentIndex(index)
    onVideoChange?.(index)
  }

  const togglePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play().catch(console.warn)
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Touch/swipe handlers for mobile
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextVideo()
    } else if (isRightSwipe) {
      prevVideo()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Auto-advance videos when playing and not hovered
  useEffect(() => {
    if (isPlaying && !isHovered && videos.length > 1) {
      const interval = setInterval(nextVideo, slideInterval)
      return () => clearInterval(interval)
    }
  }, [isPlaying, isHovered, nextVideo, videos.length, slideInterval])

  // Handle video play/pause state
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.play().catch(console.warn)
      } else {
        video.pause()
      }
    }
  }, [isPlaying, currentIndex])

  if (videos.length === 0) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/25 flex items-center justify-center ${className}`}>
        <span className="text-white text-lg">No videos available</span>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        key={videos[currentIndex]}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        onEnded={nextVideo}
        suppressHydrationWarning
      >
        <source src={videos[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay gradient for better content visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      {/* Navigation Controls */}
      {showControls && videos.length > 1 && (
        <>
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            onClick={prevVideo}
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            onClick={nextVideo}
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </>
      )}

      {/* Video Counter */}
      {videos.length > 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
          {currentIndex + 1} / {videos.length}
        </div>
      )}

      {/* Video Indicators */}
      {showIndicators && videos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToVideo(index)}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
