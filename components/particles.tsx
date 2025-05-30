"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const { theme } = useTheme()
  const particles = useRef<Particle[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()
    animate()
    window.addEventListener("resize", initCanvas)

    return () => {
      window.removeEventListener("resize", initCanvas)
    }
  }, [])

  useEffect(() => {
    initCanvas()
  }, [refresh, theme])

  const initCanvas = () => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return

    canvasSize.current.w = canvasContainerRef.current.offsetWidth
    canvasSize.current.h = canvasContainerRef.current.offsetHeight
    canvasRef.current.width = canvasSize.current.w * dpr
    canvasRef.current.height = canvasSize.current.h * dpr
    canvasRef.current.style.width = `${canvasSize.current.w}px`
    canvasRef.current.style.height = `${canvasSize.current.h}px`
    context.current.scale(dpr, dpr)

    particles.current = []
    for (let i = 0; i < quantity; i++) {
      particles.current.push(new Particle(canvasSize.current.w, canvasSize.current.h, theme === "dark"))
    }
  }

  const animate = () => {
    if (!context.current || !canvasRef.current) return

    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)

    particles.current.forEach((particle) => {
      const distance = Math.sqrt(Math.pow(particle.x - mouse.current.x, 2) + Math.pow(particle.y - mouse.current.y, 2))

      const particleEase = ease

      if (distance < 120) {
        const angle = Math.atan2(particle.y - mouse.current.y, particle.x - mouse.current.x)
        const force = (120 - distance) / 120

        particle.vx += force * Math.cos(angle) * 0.2
        particle.vy += force * Math.sin(angle) * 0.2
      }

      particle.x += (particle.originX - particle.x) / particleEase + particle.vx
      particle.y += (particle.originY - particle.y) / particleEase + particle.vy

      particle.vx *= 0.92
      particle.vy *= 0.92

      particle.draw(context.current)
    })

    requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasContainerRef.current) return
    const rect = canvasContainerRef.current.getBoundingClientRect()
    mouse.current.x = e.clientX - rect.left
    mouse.current.y = e.clientY - rect.top
  }

  return (
    <div className={className} ref={canvasContainerRef} onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} />
    </div>
  )
}

class Particle {
  x: number
  y: number
  originX: number
  originY: number
  size: number
  color: string
  vx: number
  vy: number
  isDark: boolean

  constructor(canvasWidth: number, canvasHeight: number, isDark: boolean) {
    this.x = this.originX = Math.floor(Math.random() * canvasWidth)
    this.y = this.originY = Math.floor(Math.random() * canvasHeight)
    this.size = Math.floor(Math.random() * 2) + 1
    this.isDark = isDark
    this.color = isDark
      ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`
      : `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.2})`
    this.vx = 0
    this.vy = 0
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fill()
  }
}
