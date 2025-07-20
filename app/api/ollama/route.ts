import { NextRequest, NextResponse } from 'next/server'

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'

export async function GET() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Ollama is not running. Please start Ollama first.' },
        { status: 503 }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to connect to Ollama. Make sure it\'s running on localhost:11434' },
      { status: 503 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { model, messages, stream = false } = await request.json()

    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
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
    console.error('Ollama API error:', error)
    return NextResponse.json(
      { error: 'Failed to communicate with Ollama' },
      { status: 500 }
    )
  }
}
