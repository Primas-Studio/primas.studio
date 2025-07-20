'use client'

import { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export default function GlassPanel({ children, className = '', glow = false }: GlassPanelProps) {
  return (
    <div className={`glass-panel ${glow ? 'pulse-glow' : ''} ${className}`}>
      {children}
    </div>
  )
}
