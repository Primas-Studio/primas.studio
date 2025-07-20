'use client'

import { User, Bot, Zap } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Message } from '@/lib/types'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-start space-x-4 max-w-4xl">
        {message.role === 'assistant' && (
          <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-blue rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow relative">
            <Bot className="w-5 h-5 text-black" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center">
              <Zap className="w-2 h-2 text-black" />
            </div>
          </div>
        )}
        
        <div className={`rounded-2xl p-6 ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-green/30 ml-auto tech-button'
            : 'glass-panel'
        }`}>
          {message.role === 'assistant' ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              className="prose prose-sm prose-invert max-w-none"
              components={{
                code({children, className}) {
                  const isInline = !className
                  return isInline ? (
                    <code className="bg-black/50 border border-neon-green/30 px-2 py-1 rounded text-sm text-neon-green font-mono">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-black/50 border border-neon-green/30 p-4 rounded-xl overflow-x-auto my-4">
                      <code className="text-neon-green font-mono text-sm">{children}</code>
                    </pre>
                  )
                },
                h1: ({children}) => <h1 className="text-2xl font-bold text-neon-green mb-4 glow-text">{children}</h1>,
                h2: ({children}) => <h2 className="text-xl font-bold text-neon-green mb-3 glow-text">{children}</h2>,
                h3: ({children}) => <h3 className="text-lg font-bold text-neon-blue mb-2">{children}</h3>,
                strong: ({children}) => <strong className="text-neon-green font-semibold">{children}</strong>,
                ul: ({children}) => <ul className="list-none space-y-2 my-4">{children}</ul>,
                li: ({children}) => (
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full mt-2 flex-shrink-0"></div>
                    <span>{children}</span>
                  </li>
                )
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className="text-white font-medium">{message.content}</p>
          )}
        </div>

        {message.role === 'user' && (
          <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}
