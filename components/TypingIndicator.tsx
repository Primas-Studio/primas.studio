'use client'

import { Bot } from 'lucide-react'

interface TypingIndicatorProps {
  isVisible: boolean
}

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-3xl">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
