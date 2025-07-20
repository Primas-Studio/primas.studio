'use client'

import { Bot, Zap } from 'lucide-react'

interface TypingIndicatorProps {
  isVisible: boolean
}

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-4 max-w-4xl">
        <div className="w-10 h-10 bg-gradient-to-r from-professional-500 to-professional-600 rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow relative overflow-hidden">
          <img 
            src="https://exbjkocdbrfniwmdrdih.supabase.co/storage/v1/object/public/assets/primas.png" 
            alt="Primas Logo" 
            className="w-6 h-6 object-contain"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-blue rounded-full flex items-center justify-center">
            <Zap className="w-2 h-2 text-white animate-pulse" />
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-accent-blue rounded-full typing-animation"></div>
              <div className="w-3 h-3 bg-accent-light rounded-full typing-animation"></div>
              <div className="w-3 h-3 bg-accent-blue rounded-full typing-animation"></div>
            </div>
            <span className="text-sm text-gray-400">Neural processing active...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
