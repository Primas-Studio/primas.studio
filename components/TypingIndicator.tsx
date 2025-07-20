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
        <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-blue rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow relative">
          <Bot className="w-5 h-5 text-black" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center">
            <Zap className="w-2 h-2 text-black animate-pulse" />
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-neon-green rounded-full typing-animation"></div>
              <div className="w-3 h-3 bg-neon-blue rounded-full typing-animation"></div>
              <div className="w-3 h-3 bg-neon-green rounded-full typing-animation"></div>
            </div>
            <span className="text-sm text-gray-400">Neural processing active...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
