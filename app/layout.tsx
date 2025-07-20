import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Primas Studio - AI Research & Development Platform',
  description: 'Professional AI research platform for developers, researchers, and enthusiasts. Download, experiment, and collaborate with Ollama LLM models including Llama 3, Mistral, and Gemma.',
  keywords: 'AI research, LLM models, Ollama, Llama 3, Mistral, Gemma, AI development, machine learning, research platform, AI collaboration',
  authors: [{ name: 'Primas Studio' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="https://exbjkocdbrfniwmdrdih.supabase.co/storage/v1/object/public/assets/primas.png" />
        <link rel="apple-touch-icon" href="https://exbjkocdbrfniwmdrdih.supabase.co/storage/v1/object/public/assets/primas.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
