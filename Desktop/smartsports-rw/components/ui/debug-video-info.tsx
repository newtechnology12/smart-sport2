"use client"

import { useState, useEffect } from "react"

interface DebugVideoInfoProps {
  videos: string[]
}

export function DebugVideoInfo({ videos }: DebugVideoInfoProps) {
  const [videoStatus, setVideoStatus] = useState<Record<string, string>>({})

  useEffect(() => {
    const checkVideoStatus = async () => {
      const status: Record<string, string> = {}
      
      for (const video of videos) {
        try {
          const response = await fetch(video, { method: 'HEAD' })
          status[video] = response.ok ? 'Available' : `Error: ${response.status}`
        } catch (error) {
          status[video] = `Error: ${error}`
        }
      }
      
      setVideoStatus(status)
    }

    checkVideoStatus()
  }, [videos])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Video Debug Info</h3>
      {videos.map((video, index) => (
        <div key={video} className="mb-1">
          <div className="font-semibold">Video {index + 1}:</div>
          <div className="text-gray-300">{video}</div>
          <div className={`text-sm ${videoStatus[video]?.includes('Available') ? 'text-green-400' : 'text-red-400'}`}>
            {videoStatus[video] || 'Checking...'}
          </div>
        </div>
      ))}
    </div>
  )
}
