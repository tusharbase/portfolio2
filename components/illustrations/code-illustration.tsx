"use client"

import { useEffect, useRef } from "react"

export function CodeIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Get context
    ctxRef.current = canvas.getContext("2d")
    const ctx = ctxRef.current
    if (!ctx) return

    // Code particles
    const particles: {
      x: number
      y: number
      size: number
      speed: number
      text: string
      color: string
      opacity: number
    }[] = []

    // Create particles
    const createParticles = () => {
      const codeSnippets = [
        "bolt",
        "₿",
        "fork",
        "lovable",
        "onchain",
        "grok",
        "deploy",
        "$",
        "tokens",
        "build",
        "AI SDK",
        "ETH",
        "don't die",
        "USDC",
        "base",
        "v0",
        "cursor",
        "windsurf",
        "vercel",
        "supabase",
      ]

      const totalParticles = 20

      for (let i = 0; i < totalParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 12 + 10,
          speed: Math.random() * 0.5 + 0.1,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          color: `rgba(${Math.random() * 50 + 50}, ${Math.random() * 50 + 50}, ${Math.random() * 50 + 50}, 0.8)`,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)"
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      }

      ctx.beginPath()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
          }
        }
      }
      ctx.stroke()

      // Draw particles
      particles.forEach((particle) => {
        ctx.font = `${particle.size}px monospace`
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fillText(particle.text, particle.x, particle.y)
        ctx.globalAlpha = 1

        // Move particles
        particle.y += particle.speed

        // Reset particles that go off screen
        if (particle.y > canvas.height + 50) {
          particle.y = -50
          particle.x = Math.random() * canvas.width
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
