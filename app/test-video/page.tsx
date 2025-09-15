"use client"

import { SimpleVideoBackground } from "@/components/ui/simple-video-background"
import { VideoBackground } from "@/components/ui/video-background"

export default function TestVideoPage() {
  const testVideos = [
    "/videos/football.mp4",
    "/videos/basketball.mp4",
    "/videos/volleyball.mp4",
    "/videos/handball.mp4"
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Video Background Test</h1>
        
        {/* Simple Video Background Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Simple Video Background</h2>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <SimpleVideoBackground
              videos={testVideos}
              className="absolute inset-0"
              slideInterval={5000}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Test Content</h3>
                <p className="text-lg opacity-90">Video should be playing behind this text</p>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Video Background Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Advanced Video Background</h2>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <VideoBackground
              videos={testVideos}
              className="absolute inset-0"
              slideInterval={5000}
              autoSlide={true}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Advanced Test Content</h3>
                <p className="text-lg opacity-90">Video with loading states and error handling</p>
              </div>
            </div>
          </div>
        </section>

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
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
