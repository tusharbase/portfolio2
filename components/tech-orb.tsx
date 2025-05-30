"use client"

import type React from "react"

interface TechOrbProps {
  icon: React.ReactNode
  label: string
  position: string
  delay: string
}

export function TechOrb({ icon, label, position, delay }: TechOrbProps) {
  return (
    <div
      className={`absolute ${position} w-16 h-16 bg-slate-800/80 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-500/10 transition-all duration-300 group cursor-pointer`}
      style={{ animationDelay: delay }}
    >
      <div className="relative">
        {icon}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  )
}
