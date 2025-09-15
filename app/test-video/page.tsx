"use client"

import { useState } from "react"
import { SimpleVideoBackground } from "@/components/ui/simple-video-background"
import { VideoBackground } from "@/components/ui/video-background"
import { ReliableVideoBackground } from "@/components/ui/reliable-video-background"
import { PreloadedVideoBackground } from "@/components/ui/preloaded-video-background"
import { OptimizedVideoBackground } from "@/components/ui/optimized-video-background"
import { DebugVideoInfo } from "@/components/ui/debug-video-info"

type ComponentType = 'optimized' | 'preloaded' | 'reliable' | 'advanced' | 'simple'

export default function TestVideoPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('optimized')

  const testVideos = [
    "/videos/football.mp4",
    "/videos/basketball.mp4",
    "/videos/volleyball.mp4",
    "/videos/handball.mp4"
  ]

  const components = [
    { id: 'optimized' as ComponentType, name: 'Optimized (Recommended)', description: 'Handles autoplay policies and user interaction' },
    { id: 'preloaded' as ComponentType, name: 'Preloaded', description: 'Smooth transitions with preloaded videos' },
    { id: 'reliable' as ComponentType, name: 'Reliable', description: 'Cross-browser compatible video background' },
    { id: 'advanced' as ComponentType, name: 'Advanced', description: 'Video with loading states and error handling' },
    { id: 'simple' as ComponentType, name: 'Simple', description: 'Basic video background implementation' },
  ]

  const renderActiveComponent = () => {
    const commonProps = {
      videos: testVideos,
      className: "absolute inset-0",
      slideInterval: 5000,
    }

    switch (activeComponent) {
      case 'optimized':
        return <OptimizedVideoBackground {...commonProps} showIndicators={true} />
      case 'preloaded':
        return <PreloadedVideoBackground {...commonProps} showIndicators={true} />
      case 'reliable':
        return <ReliableVideoBackground {...commonProps} showIndicators={true} />
      case 'advanced':
        return <VideoBackground {...commonProps} autoSlide={true} />
      case 'simple':
        return <SimpleVideoBackground {...commonProps} />
      default:
        return <OptimizedVideoBackground {...commonProps} showIndicators={true} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Component Selector */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Video Background Components Test</h1>
          <div className="flex flex-wrap gap-2">
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => setActiveComponent(component.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeComponent === component.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {component.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Component Display */}
      <div className="container mx-auto p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            {components.find(c => c.id === activeComponent)?.name}
          </h2>
          <p className="text-gray-600">
            {components.find(c => c.id === activeComponent)?.description}
          </p>
        </div>

        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          {renderActiveComponent()}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Test Content</h3>
              <p className="text-lg opacity-90">Video should be playing behind this text</p>
              <p className="text-sm opacity-75 mt-2">Click anywhere to ensure video plays</p>
            </div>
          </div>
        </div>

        {/* Video File Status */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Video File Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testVideos.map((video, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Video {index + 1}</h3>
                <p className="text-sm text-gray-600 mb-2">{video}</p>
                <video
                  className="w-full h-32 object-cover rounded"
                  controls
                  preload="metadata"
                  suppressHydrationWarning
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Debug Info */}
      <DebugVideoInfo videos={testVideos} />
    </div>
  )
}
