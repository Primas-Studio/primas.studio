import { NextRequest, NextResponse } from 'next/server'

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    const response = await fetch(`${OLLAMA_BASE_URL}/api/pull`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Failed to pull model: ${errorText}` },
        { status: response.status }
      )
    }

    // For now, return a simple success response
    // In the future, we can implement proper streaming
    return NextResponse.json({ success: true, message: `Pulling model ${name}...` })
  } catch (error) {
    console.error('Model pull error:', error)
    return NextResponse.json(
      { error: 'Failed to pull model from Ollama' },
      { status: 500 }
    )
  }
}
