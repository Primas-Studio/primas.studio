'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Plus, Menu, Monitor, Cpu, User, Bot, Zap, Grid3X3 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateMockResponse = (userInput: string): string => {
    const responses = [
      `**System Analysis Complete** 🔍\n\nProcessing query: "${userInput}"\n\n**Neural Network Response:**\n\nThis is an advanced technological interface designed to simulate futuristic AI interactions. The system features:\n\n\`\`\`typescript\n// Core System Architecture\ninterface AIResponse {\n  query: string;\n  confidence: number;\n  responseTime: string;\n  systemStatus: 'OPTIMAL' | 'PROCESSING' | 'STANDBY';\n}\n\`\`\`\n\n**Key Features:**\n- **Quantum Processing**: Enhanced response algorithms\n- **Neural Networks**: Advanced pattern recognition\n- **Cybernetic Interface**: Futuristic UI/UX design\n- **Real-time Analysis**: Instantaneous data processing\n\n**Status**: ✅ OPERATIONAL\n**Confidence**: 98.7%\n**Response Time**: 0.003ms`,
      
      `**🚀 CYBER PROTOCOL INITIATED**\n\nAnalyzing input: "${userInput}"\n\n**System Report:**\n\n\`\`\`bash\n$ ./analyze_query --input="${userInput}" --mode=advanced\n\n[████████████████████████████████] 100%\n\nStatus: ANALYSIS_COMPLETE\nThreat Level: MINIMAL\nConfidence Score: 97.2%\n\`\`\`\n\n**Advanced Response Matrix:**\n\n1. **Data Processing** ⚡ Real-time neural analysis\n2. **Pattern Recognition** 🧠 Deep learning algorithms  \n3. **Response Generation** 🔮 Quantum-enhanced output\n4. **Quality Assurance** ✨ Multi-layer validation\n\n**Technological Stack:**\n- Next.js 14 with App Router\n- TypeScript for type safety\n- Tailwind CSS with custom cyber theme\n- Advanced 3D button interactions\n\n**Next Actions:** Ready for your next query, commander.`,
      
      `**⚡ QUANTUM RESPONSE ENGINE ACTIVE ⚡**\n\nProcessing: "${userInput}"\n\n**🔬 Technical Analysis:**\n\nYour query has been processed through our advanced AI matrix. This interface represents the convergence of cutting-edge web technologies and futuristic design principles.\n\n**System Specifications:**\n\`\`\`json\n{\n  "interface": "PRIMAS_NEURAL_NET_v2.1",\n  "processing_power": "10.7 TFLOPS",\n  "response_time": "< 50ms",\n  "accuracy": "99.3%",\n  "ui_framework": "CYBER_GLASS_MORPHISM"\n}\n\`\`\`\n\n**Interface Features:**\n- 🌐 **Glass Morphism**: Advanced transparency effects\n- 🎯 **3D Interactions**: Elevated button experiences\n- ⚡ **Neon Accents**: Cyber-punk inspired highlights\n- 🔮 **Neural Animations**: Smooth micro-interactions\n\n**Status**: All systems operational. Ready for next command.`
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const newChat = () => {
    setMessages([])
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-cyber-gradient cyber-grid">
      <div className="flex h-screen text-white relative">
        
        {/* Enhanced Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-80 glass-panel transform transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neon-green/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg flex items-center justify-center pulse-glow">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold glow-text">PRIMAS.AI</h1>
                  <p className="text-xs text-gray-400">Neural Interface v2.1</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg tech-button"
              >
                ✕
              </button>
            </div>
            
            {/* New Chat Button */}
            <div className="p-6">
              <button
                onClick={newChat}
                className="flex items-center w-full p-4 text-left rounded-xl tech-button hover:scale-[1.02] transition-transform group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg flex items-center justify-center mr-3 group-hover:shadow-cyber">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="font-medium">Initialize New Session</span>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neon-green uppercase tracking-wider">Neural History</h3>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg glass-panel hover:bg-white/10 cursor-pointer transition-all group">
                    <div className="flex items-center space-x-3">
                      <Grid3X3 className="w-4 h-4 text-neon-green/60" />
                      <div>
                        <p className="text-sm text-white/80 group-hover:text-white">Session {i}</p>
                        <p className="text-xs text-gray-500">Neural analysis completed</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="p-6 border-t border-neon-green/20">
              <div className="glass-panel p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">System Status</span>
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-neon-green">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Neural Load</span>
                    <span className="text-neon-blue">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-neon-green">0.03ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {/* Mobile Header */}
          <header className="flex items-center justify-between p-4 glass-panel lg:hidden border-b border-neon-green/20">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 rounded-xl tech-button"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-neon-green" />
              <h1 className="text-lg font-bold glow-text">PRIMAS.AI</h1>
            </div>
            <div className="w-11"></div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-neon-green to-neon-blue rounded-2xl flex items-center justify-center pulse-glow animate-float">
                    <Bot className="w-12 h-12 text-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-green rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-black" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 glow-text">PRIMAS NEURAL INTERFACE</h2>
                <p className="text-gray-400 max-w-md mb-6">
                  Advanced AI system ready for deployment. Initialize neural connection to begin quantum processing.
                </p>
                <div className="glass-panel p-6 rounded-xl max-w-lg">
                  <h3 className="text-lg font-semibold mb-3 text-neon-green">System Capabilities</h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <span>Quantum processing algorithms</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      <span>Neural network integration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <span>Real-time data analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start space-x-4 max-w-4xl">
                      {message.role === 'assistant' && (
                        <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-blue rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow">
                          <Bot className="w-5 h-5 text-black" />
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
                              code({children, className, ...props}) {
                                const isInline = !className
                                return isInline ? (
                                  <code className="bg-black/50 border border-neon-green/30 px-2 py-1 rounded text-sm text-neon-green font-mono" {...props}>
                                    {children}
                                  </code>
                                ) : (
                                  <pre className="bg-black/50 border border-neon-green/30 p-4 rounded-xl overflow-x-auto my-4">
                                    <code className="text-neon-green font-mono text-sm" {...props}>{children}</code>
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
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-4 max-w-4xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-blue rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow">
                        <Bot className="w-5 h-5 text-black" />
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
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Enhanced Input */}
          <div className="glass-panel border-t border-neon-green/20 p-6">
            <form onSubmit={handleSubmit} className="relative max-w-5xl mx-auto">
              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                    placeholder="Initialize neural command sequence..."
                    className="w-full p-4 pr-16 tech-input rounded-2xl resize-none text-white placeholder-gray-500 font-medium"
                    rows={1}
                    style={{ minHeight: '56px', maxHeight: '200px' }}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    {input.length > 0 && `${input.length} chars`}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-4 tech-button rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-6 h-6 text-neon-green group-hover:text-white transition-colors" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Press Enter to send • Shift + Enter for new line</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
              </div>
            </form>
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
