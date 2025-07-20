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

    // For streaming responses, we need to handle them properly
    if (response.headers.get('content-type')?.includes('application/x-ndjson')) {
      // Create a readable stream to handle Ollama's streaming response
      const stream = new ReadableStream({
        start(controller) {
          const reader = response.body?.getReader()
          
          function pump() {
            return reader?.read().then(({ done, value }) => {
              if (done) {
                controller.close()
                return
              }
              controller.enqueue(value)
              return pump()
            })
          }
          
          return pump()
        }
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Model pull error:', error)
    return NextResponse.json(
      { error: 'Failed to pull model from Ollama' },
      { status: 500 }
    )
  }
}
