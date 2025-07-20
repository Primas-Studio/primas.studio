import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Primas.AI - Neural Interface',
  description: 'Advanced AI neural interface powered by Primas technology - Professional chat assistant with quantum processing capabilities',
  keywords: 'AI, neural interface, chat, assistant, Primas, quantum processing',
  authors: [{ name: 'Primas Studio' }],
  viewport: 'width=device-width, initial-scale=1',
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
