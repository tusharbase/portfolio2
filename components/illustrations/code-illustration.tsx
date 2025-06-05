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
    let scrollY = window.scrollY
    
    const handleScroll = () => {
      scrollY = window.scrollY
    }
    
    const resizeCanvas = () => {
      // Take up 60% of the viewport width, positioned to the right
      canvas.width = window.innerWidth * 0.6
      canvas.height = window.innerHeight
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
        
        // Adjust particle position based on scroll
        const yPos = particle.y - scrollY % (canvas.height + 100)
        
        // Only draw particles that are in the viewport
        if (yPos > -50 && yPos < canvas.height + 50) {
          ctx.fillText(particle.text, particle.x, yPos)
        }
        
        ctx.globalAlpha = 1

        // Move particles (relative to scroll position)
        particle.y = (particle.y + particle.speed) % (canvas.height + 100)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 left-auto right-0 w-3/5 h-screen overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
