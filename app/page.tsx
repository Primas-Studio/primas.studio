'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { 
  Send, 
  Menu, 
  Settings, 
  User, 
  Zap, 
  Grid3X3, 
  Plus,
  Server,
  Brain,
  Code,
  BookOpen,
  Bell,
  Search,
  BarChart3,
  MoreVertical,
  TrendingUp,
  Activity,
  Database
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'chat' | 'projects' | 'research'>('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const newChat = () => {
    window.location.reload()
  }

  const sidebarItems = [
    {
      id: 'chat',
      icon: Brain,
      label: 'AI Agent Chat',
      description: 'Interact with the AI coding assistant'
    },
    {
      id: 'projects',
      icon: Code,
      label: 'Projects',
      description: 'Manage your coding projects'
    },
    {
      id: 'research',
      icon: BookOpen,
      label: 'Research',
      description: 'Technical documentation and analysis'
    }
  ]

  const statsCards = [
    {
      title: 'Total Conversations',
      value: messages.filter(m => m.role === 'user').length,
      icon: Activity,
      trend: '+12%',
      color: 'text-blue-400'
    },
    {
      title: 'AI Responses',
      value: messages.filter(m => m.role === 'assistant').length,
      icon: Brain,
      trend: '+8%',
      color: 'text-green-400'
    },
    {
      title: 'Session Time',
      value: '2.5h',
      icon: TrendingUp,
      trend: '+15%',
      color: 'text-purple-400'
    },
    {
      title: 'Code Solutions',
      value: '47',
      icon: Code,
      trend: '+23%',
      color: 'text-orange-400'
    }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-y-0 left-0 z-50 w-64 bg-black/80 backdrop-blur-xl border-r border-white/10 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Primas Studio
              </h1>
              <p className="text-xs text-gray-400">AI Agent Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  currentView === item.id 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={newChat}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Status */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Vercel AI Connected</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">GPT-4 Turbo Ready</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-bold">AI Agent Assistant</h2>
                <p className="text-sm text-gray-400">Powered by GPT-4 Turbo</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {currentView === 'chat' && (
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Welcome to Primas Studio AI</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Your advanced AI coding and research assistant. Ask questions, get help with code, 
                    or explore technical documentation.
                  </p>
                  
                  {/* Quick Start Examples */}
                  <div className="grid gap-3 max-w-2xl mx-auto">
                    {[
                      "Help me build a React component with TypeScript",
                      "Explain async/await in JavaScript with examples",
                      "Review my code for performance optimizations",
                      "Research the latest Next.js 14 features"
                    ].map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleInputChange({ target: { value: example } } as any)}
                        className="text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                      >
                        <span className="text-sm text-gray-300">{example}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-blue-600' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-500'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Brain className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/10 backdrop-blur-sm border border-white/20'
                        }`}>
                          {message.role === 'assistant' ? (
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              className="prose prose-invert prose-sm max-w-none"
                              components={{
                                code(props) {
                                  const {children, className, ...rest} = props
                                  const match = /language-(\w+)/.exec(className || '')
                                  return match ? (
                                    <div className="bg-black/50 rounded-md p-3 my-2 border border-white/10">
                                      <code className="text-sm text-green-400" {...rest}>
                                        {children}
                                      </code>
                                    </div>
                                  ) : (
                                    <code className="bg-black/30 px-1 py-0.5 rounded text-green-400" {...rest}>
                                      {children}
                                    </code>
                                  )
                                }
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(message.createdAt || Date.now()).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-gray-400">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl p-6">
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything about coding, research, or technical problems..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none max-h-32"
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects View */}
        {currentView === 'projects' && (
          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Project Dashboard</h2>
                <p className="text-gray-400">Manage your coding projects and track progress</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((stat, idx) => {
                  const Icon = stat.icon
                  return (
                    <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                        <span className="text-sm text-green-400">{stat.trend}</span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.title}</div>
                    </div>
                  )
                })}
              </div>

              {/* Recent Projects */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
                <div className="space-y-4">
                  {[
                    { name: 'AI Chat Interface', status: 'Active', tech: 'React, TypeScript', updated: '2 hours ago' },
                    { name: 'API Integration', status: 'Completed', tech: 'Next.js, Vercel AI', updated: '1 day ago' },
                    { name: 'Database Optimization', status: 'In Progress', tech: 'PostgreSQL, Prisma', updated: '3 days ago' }
                  ].map((project, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-400">{project.tech}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm px-2 py-1 rounded-full ${
                          project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {project.status}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{project.updated}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Research View */}
        {currentView === 'research' && (
          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Research Hub</h2>
                <p className="text-gray-400">Technical documentation and analysis tools</p>
              </div>

              {/* Research Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Code Analysis',
                    description: 'Analyze code patterns and performance metrics',
                    icon: BarChart3,
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    title: 'Documentation',
                    description: 'Generate and maintain technical documentation',
                    icon: BookOpen,
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    title: 'API Research',
                    description: 'Explore and test various APIs and integrations',
                    icon: Database,
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((tool, idx) => {
                  const Icon = tool.icon
                  return (
                    <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                      <p className="text-gray-400 text-sm">{tool.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
