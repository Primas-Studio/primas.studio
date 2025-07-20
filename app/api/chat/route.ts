import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Create the system message for the AI agent
    const systemMessage = {
      role: 'system',
      content: `You are an advanced AI coding and research assistant created by Primas Studio. You are an expert in:

🔧 Programming & Development:
- Full-stack web development (React, Next.js, Node.js, Python, etc.)
- Database design and optimization
- API development and integration
- DevOps and deployment strategies

🔍 Research & Analysis:
- Technical research and documentation
- Code analysis and optimization
- Architecture planning and design patterns
- Best practices and industry standards

💡 Problem Solving:
- Debugging and troubleshooting
- Performance optimization
- Security implementation
- Scalable solution design

Always provide:
- Clear, actionable solutions
- Code examples when relevant
- Step-by-step explanations
- Best practice recommendations
- Professional, concise communication

You have access to the latest information and can help with coding, research, analysis, and technical decision-making.`
    };

    const allMessages = [systemMessage, ...messages];

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      messages: allMessages,
      temperature: 0.7,
      maxTokens: 2048,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
