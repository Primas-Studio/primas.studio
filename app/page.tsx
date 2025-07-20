'use client'

import { useState, useRef, useEffect } from 'react'
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
  Download,
  RefreshCcw,
  BarChart3,
  MoreVertical,
  TrendingUp,
  Activity,
  Database
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  model?: string
}

interface OllamaModel {
  id: string
  name: string
  size: string
  description: string
  parameters: string
  type: string
  installed: boolean
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'models' | 'chat' | 'projects' | 'research'>('models')
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({})
  const [ollamaModels, setOllamaModels] = useState<OllamaModel[]>([])
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Check Ollama connection and load models on mount
  useEffect(() => {
    checkOllamaConnection()
  }, [])

  const checkOllamaConnection = async () => {
    try {
      const response = await fetch('/api/ollama')
      if (response.ok) {
        const data = await response.json()
        setOllamaStatus('connected')
        // Transform Ollama response to our format
        const models: OllamaModel[] = data.models?.map((model: any) => ({
          id: model.name,
          name: model.name,
          size: model.size ? formatBytes(model.size) : 'Unknown',
          description: `${model.name} - Ollama model`,
          parameters: model.details?.parameter_size || 'Unknown',
          type: model.name.includes('code') ? 'Code' : 'Chat',
          installed: true
        })) || []
        setOllamaModels(models)
      } else {
        setOllamaStatus('disconnected')
        // Fallback to example models when Ollama is not connected
        setOllamaModels([
          {
            id: 'llama3.2',
            name: 'Llama 3.2 3B',
            size: '2.0GB',
            description: 'Latest Llama model optimized for coding and reasoning',
            parameters: '3B',
            type: 'Chat',
            installed: false
          },
          {
            id: 'codellama',
            name: 'CodeLlama 7B',
            size: '3.8GB',
            description: 'Specialized for code generation and programming tasks',
            parameters: '7B',
            type: 'Code',
            installed: false
          }
        ])
      }
    } catch (error) {
      console.error('Failed to connect to Ollama:', error)
      setOllamaStatus('disconnected')
      setOllamaModels([])
    }
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !selectedModel) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
      model: selectedModel
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Use real AI agent API instead of mock responses
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage.content,
          model: selectedModel
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'Sorry, I encountered an issue processing your request.',
        role: 'assistant',
        timestamp: new Date(),
        model: selectedModel
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Agent communication error:', error)
      
      // Provide helpful error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: ollamaStatus === 'disconnected' 
          ? `**⚠️ Ollama Connection Required**\n\nTo use the AI agent capabilities, please:\n\n1. **Install Ollama**: Download from [ollama.ai](https://ollama.ai)\n2. **Start Ollama**: Run \`ollama serve\` in your terminal\n3. **Pull a model**: Run \`ollama pull llama3.2\` or similar\n4. **Refresh this page** to reconnect\n\n**Current Status**: Ollama is not running on localhost:11434`
          : `**❌ Agent Error**\n\nFailed to communicate with the AI agent. Please check:\n\n- Ollama is running (\`ollama serve\`)\n- The selected model (${selectedModel}) is available\n- Try refreshing the connection\n\n**Error**: ${error}`,
        role: 'assistant',
        timestamp: new Date(),
        model: selectedModel
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const newChat = () => {
    setMessages([])
    setSidebarOpen(false)
  }

  const downloadModel = async (modelId: string) => {
    if (ollamaStatus !== 'connected') {
      alert('Ollama is not connected. Please start Ollama first.')
      return
    }

    setIsDownloading(true)
    setDownloadProgress({...downloadProgress, [modelId]: 0})
    
    try {
      const response = await fetch('/api/models/pull', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: modelId }),
      })

      if (!response.ok) {
        throw new Error(`Failed to pull model: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success) {
        // Simulate progress for user experience
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 500))
          setDownloadProgress(prev => ({...prev, [modelId]: progress}))
        }
        
        // Mark model as installed and refresh model list
        setDownloadProgress(prev => {
          const updated = {...prev}
          delete updated[modelId]
          return updated
        })
        
        // Update the model as installed
        setOllamaModels(prev => prev.map(model => 
          model.id === modelId ? {...model, installed: true} : model
        ))
        
        console.log(`Model ${modelId} download initiated successfully`)
        
        // Refresh the complete model list from Ollama after a delay
        setTimeout(() => {
          checkOllamaConnection()
        }, 2000)
      }
      
    } catch (error) {
      console.error('Download error:', error)
      alert(`Failed to download model: ${error}`)
      setDownloadProgress(prev => {
        const updated = {...prev}
        delete updated[modelId]
        return updated
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const selectModel = (modelId: string) => {
    setSelectedModel(modelId)
    setCurrentView('chat')
  }

  return (
    <div className="min-h-screen bg-professional-gradient professional-grid">
      <div className="flex h-screen text-white relative">
        
        {/* Enhanced Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-80 glass-panel transform transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-professional-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-professional-500 to-professional-600 rounded-lg flex items-center justify-center pulse-glow overflow-hidden">
                  <img 
                    src="https://exbjkocdbrfniwmdrdih.supabase.co/storage/v1/object/public/assets/primas.png" 
                    alt="Primas Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold glow-text">PRIMAS STUDIO</h1>
                  <p className="text-xs text-gray-400">AI Agent Platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  ollamaStatus === 'connected' ? 'bg-green-400 animate-pulse' : 
                  ollamaStatus === 'checking' ? 'bg-yellow-400 animate-pulse' :
                  'bg-red-400'
                }`}></div>
                <span className="text-xs text-gray-400">
                  {ollamaStatus === 'connected' ? 'Ollama Ready' : 
                   ollamaStatus === 'checking' ? 'Connecting...' : 
                   'Ollama Offline'}
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-lg tech-button ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="p-6 border-b border-professional-500/20">
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentView('models')}
                  className={`flex items-center w-full p-3 text-left rounded-xl tech-button transition-all group ${
                    currentView === 'models' ? 'bg-professional-500/20 border-professional-500/40' : ''
                  }`}
                >
                  <Server className="w-5 h-5 mr-3 text-accent-blue" />
                  <span className="font-medium">Agent Models</span>
                </button>
                
                <button
                  onClick={() => setCurrentView('chat')}
                  className={`flex items-center w-full p-3 text-left rounded-xl tech-button transition-all group ${
                    currentView === 'chat' ? 'bg-professional-500/20 border-professional-500/40' : ''
                  }`}
                  disabled={!selectedModel}
                >
                  <Brain className="w-5 h-5 mr-3 text-accent-light" />
                  <span className="font-medium">Agent Chat</span>
                  {selectedModel && <span className="ml-auto text-xs text-accent-blue">{selectedModel}</span>}
                </button>
                
                <button
                  onClick={() => setCurrentView('projects')}
                  className={`flex items-center w-full p-3 text-left rounded-xl tech-button transition-all group ${
                    currentView === 'projects' ? 'bg-professional-500/20 border-professional-500/40' : ''
                  }`}
                >
                  <Code className="w-5 h-5 mr-3 text-accent-blue" />
                  <span className="font-medium">Projects</span>
                </button>
                
                <button
                  onClick={() => setCurrentView('research')}
                  className={`flex items-center w-full p-3 text-left rounded-xl tech-button transition-all group ${
                    currentView === 'research' ? 'bg-professional-500/20 border-professional-500/40' : ''
                  }`}
                >
                  <BookOpen className="w-5 h-5 mr-3 text-accent-light" />
                  <span className="font-medium">Research Lab</span>
                </button>
              </div>
            </div>

            {/* Model Status */}
            {selectedModel && (
              <div className="p-6 border-b border-professional-500/20">
                <div className="glass-panel p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Active Model</span>
                    <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model</span>
                      <span className="text-accent-blue">{ollamaModels.find(m => m.id === selectedModel)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="text-green-400">Ready</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Memory</span>
                      <span className="text-accent-light">4.2GB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-accent-blue uppercase tracking-wider">Platform Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-panel p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-accent-blue">12</div>
                    <div className="text-xs text-gray-400">Models Available</div>
                  </div>
                  <div className="glass-panel p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-accent-light">3</div>
                    <div className="text-xs text-gray-400">Installed</div>
                  </div>
                  <div className="glass-panel p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-accent-blue">847</div>
                    <div className="text-xs text-gray-400">Experiments</div>
                  </div>
                  <div className="glass-panel p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-accent-light">24</div>
                    <div className="text-xs text-gray-400">Collaborators</div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="p-6 border-t border-professional-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Dr. AI Researcher</p>
                  <p className="text-xs text-gray-400">Premium Account</p>
                </div>
                <button className="ml-auto p-2 rounded-lg tech-button">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-professional-500/20 glass-panel/50">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg tech-button"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {currentView === 'models' && 'AI Agent Models'}
                  {currentView === 'chat' && 'AI Agent Interface'}
                  {currentView === 'projects' && 'Research Projects'}
                  {currentView === 'research' && 'Research Laboratory'}
                </h2>
                <p className="text-sm text-gray-400">
                  {currentView === 'models' && 'Manage AI models for coding, research, and problem-solving'}
                  {currentView === 'chat' && 'Interact with your AI agent for real coding and research tasks'}
                  {currentView === 'projects' && 'Manage your research projects and experiments'}
                  {currentView === 'research' && 'Advanced research tools and analytics'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg tech-button relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-blue rounded-full text-xs"></span>
              </button>
              <button className="p-2 rounded-lg tech-button">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Views */}
          <div className="flex-1 overflow-hidden">
            
            {/* Model Hub View */}
            {currentView === 'models' && (
              <div className="h-full p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-accent-blue/20 to-accent-light/20 rounded-xl flex items-center justify-center">
                          <Download className="w-6 h-6 text-accent-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Install Model</h3>
                          <p className="text-sm text-gray-400">Download new AI models</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-accent-light/20 to-accent-blue/20 rounded-xl flex items-center justify-center">
                          <RefreshCcw className="w-6 h-6 text-accent-light" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Update Models</h3>
                          <p className="text-sm text-gray-400">Check for updates</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Benchmarks</h3>
                          <p className="text-sm text-gray-400">Compare performance</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Available Models */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Available Models</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {ollamaModels.map((model) => (
                        <div key={model.id} className="glass-panel p-6 rounded-xl hover:border-professional-500/40 transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-professional-500 to-professional-600 rounded-xl flex items-center justify-center">
                                <Brain className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{model.name}</h4>
                                <p className="text-sm text-accent-blue">{model.size}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              model.installed ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {model.installed ? 'Installed' : 'Available'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-300 mb-4">{model.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-4 text-xs text-gray-400">
                              <span>Parameters: {model.parameters}</span>
                              <span>Type: {model.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-3 mt-4">
                            {model.installed ? (
                              <>
                                <button
                                  onClick={() => {setSelectedModel(model.id); setCurrentView('chat');}}
                                  className="flex-1 py-2 px-4 bg-gradient-to-r from-accent-blue to-accent-light text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
                                >
                                  Use Model
                                </button>
                                <button className="p-2 rounded-lg tech-button">
                                  <Settings className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => downloadModel(model.id)}
                                disabled={isDownloading}
                                className="flex-1 py-2 px-4 bg-gradient-to-r from-professional-500 to-professional-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
                              >
                                {isDownloading ? 'Downloading...' : 'Download'}
                              </button>
                            )}
                          </div>
                          
                          {downloadProgress[model.id] && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Downloading...</span>
                                <span className="text-accent-blue">{downloadProgress[model.id]}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-accent-blue to-accent-light h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${downloadProgress[model.id]}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Interface View */}
            {currentView === 'chat' && (
              <div className="flex flex-col h-full">
                {selectedModel ? (
                  <>
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 professional-scrollbar">
                      {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className="flex items-start space-x-4 max-w-4xl">
                            {message.role === 'assistant' && (
                              <div className="w-10 h-10 bg-gradient-to-r from-professional-500 to-professional-600 rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow overflow-hidden">
                                <img 
                                  src="https://exbjkocdbrfniwmdrdih.supabase.co/storage/v1/object/public/assets/primas.png" 
                                  alt="Primas Logo" 
                                  className="w-6 h-6 object-contain"
                                />
                              </div>
                            )}
                            
                            <div className={`rounded-2xl p-6 ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-professional-500/20 to-professional-600/20 border border-professional-500/30 ml-auto tech-button'
                                : 'glass-panel'
                            }`}>
                              {message.role === 'assistant' ? (
                                <ReactMarkdown 
                                  remarkPlugins={[remarkGfm]}
                                  className="prose prose-sm prose-invert max-w-none"
                                  components={{
                                    code({children, className, ...props}) {
                                      const isInline = !className
                                      return isInline ? (
                                        <code className="bg-black/50 border border-professional-500/30 px-2 py-1 rounded text-sm text-accent-blue font-mono" {...props}>
                                          {children}
                                        </code>
                                      ) : (
                                        <pre className="bg-black/50 border border-professional-500/30 p-4 rounded-xl overflow-x-auto my-4">
                                          <code className="text-accent-blue font-mono text-sm" {...props}>{children}</code>
                                        </pre>
                                      )
                                    },
                                    h1: ({children}) => <h1 className="text-2xl font-bold text-accent-blue mb-4 glow-text">{children}</h1>,
                                    h2: ({children}) => <h2 className="text-xl font-bold text-accent-blue mb-3 glow-text">{children}</h2>,
                                    h3: ({children}) => <h3 className="text-lg font-bold text-accent-light mb-2">{children}</h3>,
                                    strong: ({children}) => <strong className="text-accent-blue font-semibold">{children}</strong>
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
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-4 max-w-4xl">
                            <div className="w-10 h-10 bg-gradient-to-r from-professional-500 to-professional-600 rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow overflow-hidden">
                              <img 
                                src="https://exbjkocdbrfniwmdrdih.supabase.co/storage/v1/object/public/assets/primas.png" 
                                alt="Primas Logo" 
                                className="w-6 h-6 object-contain"
                              />
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
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="border-t border-professional-500/20 p-6 glass-panel/30">
                      <div className="max-w-4xl mx-auto">
                        <div className="relative">
                          <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                              }
                            }}
                            placeholder="Ask your AI agent to write code, conduct research, solve problems..."
                            className="w-full p-4 pr-16 bg-professional-800/50 border border-professional-500/30 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-accent-blue/50 focus:shadow-professional transition-all"
                            rows={3}
                            disabled={isLoading}
                          />
                          <button
                            onClick={handleSubmit}
                            disabled={!input.trim() || isLoading}
                            className="absolute bottom-4 right-4 p-2 bg-gradient-to-r from-accent-blue to-accent-light text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-professional-500 to-professional-600 rounded-3xl flex items-center justify-center mx-auto mb-6 pulse-glow">
                        <img 
                          src="https://exbjkocdbrfniwmdrdih.supabase.co/storage/v1/object/public/assets/primas.png" 
                          alt="Primas Logo" 
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Select an AI Agent Model</h3>
                      <p className="text-gray-400 mb-6">Choose a model to start your AI agent for coding, research, and problem-solving</p>
                      <button
                        onClick={() => setCurrentView('models')}
                        className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-light text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Browse Agent Models
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Projects View */}
            {currentView === 'projects' && (
              <div className="h-full p-6 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Research Projects</h3>
                    <button className="px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-light text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
                      New Project
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="glass-panel p-6 rounded-xl hover:border-professional-500/40 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-white">Project Alpha {i}</h4>
                          <span className="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-xs font-medium">Active</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Advanced language model fine-tuning for scientific research applications.</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400 mb-4">
                          <span>• 12 experiments</span>
                          <span>• 3 collaborators</span>
                          <span>• Updated 2h ago</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 py-2 px-3 bg-professional-700/50 text-white rounded-lg text-sm hover:bg-professional-600/50 transition-colors">
                            Open
                          </button>
                          <button className="p-2 tech-button">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Research Lab View */}
            {currentView === 'research' && (
              <div className="h-full p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <div className="glass-panel p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Inference Speed</h4>
                          <p className="text-2xl font-bold text-accent-blue">1.2ms</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Average response time</p>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Accuracy</h4>
                          <p className="text-2xl font-bold text-green-400">94.7%</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Model performance score</p>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">GPU Usage</h4>
                          <p className="text-2xl font-bold text-purple-400">67%</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Current utilization</p>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                          <Database className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Dataset Size</h4>
                          <p className="text-2xl font-bold text-orange-400">2.4TB</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Total research data</p>
                    </div>
                  </div>

                  {/* Research Tools */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-panel p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-white mb-4">Experiment Runner</h4>
                      <p className="text-gray-400 mb-6">Run automated experiments and benchmark tests on your models.</p>
                      <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-gradient-to-r from-accent-blue to-accent-light text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all">
                          Start New Experiment
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-2 px-3 bg-professional-700/50 text-white rounded-lg text-sm hover:bg-professional-600/50 transition-colors">
                            Load Template
                          </button>
                          <button className="py-2 px-3 bg-professional-700/50 text-white rounded-lg text-sm hover:bg-professional-600/50 transition-colors">
                            View Results
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-white mb-4">Model Comparison</h4>
                      <p className="text-gray-400 mb-6">Compare performance metrics across different AI models.</p>
                      <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-gradient-to-r from-professional-500 to-professional-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all">
                          Compare Models
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-2 px-3 bg-professional-700/50 text-white rounded-lg text-sm hover:bg-professional-600/50 transition-colors">
                            Benchmarks
                          </button>
                          <button className="py-2 px-3 bg-professional-700/50 text-white rounded-lg text-sm hover:bg-professional-600/50 transition-colors">
                            Export Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
