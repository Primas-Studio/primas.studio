import { NextRequest, NextResponse } from 'next/server'

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'

export async function POST(request: NextRequest) {
  try {
    const { prompt, model } = await request.json()

    // Enhanced prompt for agent capabilities
    const agentPrompt = `You are an advanced AI agent integrated into Primas Studio, a professional research and development platform. Your role is to:

1. **Code Analysis & Development**: Analyze, write, debug, and optimize code across multiple programming languages
2. **Research Assistance**: Conduct thorough research, analyze data, and provide evidence-based insights
3. **Problem Solving**: Break down complex problems into manageable steps and provide practical solutions
4. **Technical Documentation**: Create clear, comprehensive documentation and explanations
5. **Project Management**: Help organize and plan development projects and research initiatives

You have access to advanced reasoning capabilities and should provide detailed, actionable responses. When appropriate:
- Show code examples with proper syntax highlighting
- Provide step-by-step implementation guides  
- Include best practices and potential pitfalls
- Suggest testing strategies and validation methods
- Reference relevant research papers or technical resources

Current user query: ${prompt}

Respond as a professional AI agent with deep technical expertise:`

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt: agentPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40,
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Ollama API error: ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Agent API error:', error)
    return NextResponse.json(
      { error: 'Failed to communicate with AI agent' },
      { status: 500 }
    )
  }
}
