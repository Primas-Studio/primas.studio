'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface TechButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export default function TechButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  glow = false,
  className = '',
  ...props 
}: TechButtonProps) {
  const baseClasses = 'tech-button transition-all duration-300 font-medium relative overflow-hidden'
  
  const variants = {
    primary: 'bg-gradient-to-r from-professional-500/20 to-professional-600/20 border-professional-500/30 text-white hover:border-professional-500/60',
    secondary: 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600/30 text-gray-200 hover:border-gray-500/60',
    ghost: 'bg-transparent border-professional-500/20 text-accent-blue hover:bg-professional-500/10 hover:border-professional-500/40'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-2xl'
  }
  
  const glowClass = glow ? 'pulse-glow' : ''
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${glowClass} ${className}`}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-professional-500 to-professional-600 opacity-0 hover:opacity-20 transition-opacity"></div>
    </button>
  )
}
