"use client"

import { useEffect, useRef } from "react"

export function CodeIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<
    {
      x: number
      y: number
      size: number
      speed: number
      text: string
      color: string
      opacity: number
    }[]
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    ctxRef.current = canvas.getContext("2d")
    const ctx = ctxRef.current
    if (!ctx) return

    const codeSnippets = [
      "bolt", "₿", "fork", "lovable", "onchain", "grok", "deploy", "$",
      "tokens", "build", "AI SDK", "ETH", "don't die", "USDC", "base",
      "v0", "cursor", "windsurf", "vercel", "supabase",
    ]

    const createAndInitializeParticles = () => {
      particlesRef.current = [] // Clear existing particles
      const totalParticles = 25 // Adjusted for potentially larger area

      for (let i = 0; i < totalParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height, // Start particles across the entire canvas height
          size: Math.random() * 12 + 10,
          speed: Math.random() * 0.5 + 0.1,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          color: `rgba(${Math.random() * 50 + 50}, ${
            Math.random() * 50 + 50
          }, ${Math.random() * 50 + 50}, 0.8)`,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }
    
    const resizeCanvas = () => {
      if (!canvas) return;
      // Canvas dimensions are based on the viewport for the "fixed" feel
      canvas.width = window.innerWidth * 0.6 // 60% of viewport width
      canvas.height = window.innerHeight      // Full viewport height
      
      createAndInitializeParticles() // Re-initialize particles on resize
    }

    resizeCanvas() // Initial setup

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Theme-aware connections
      if (document.documentElement.classList.contains('dark')) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      } else {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.05)"
      }

      ctx.beginPath()
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
          }
        }
      }
      ctx.stroke()

      particlesRef.current.forEach((particle) => {
        ctx.font = `${particle.size}px monospace`
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        
        ctx.fillText(particle.text, particle.x, particle.y)
        
        ctx.globalAlpha = 1

        particle.y += particle.speed
        
        // Reset particles when they go below the canvas (viewport height)
        if (particle.y > canvas.height + particle.size) { 
          particle.y = -particle.size // Reset to just above the top
          particle.x = Math.random() * canvas.width
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    // Fixed positioning relative to the viewport.
    // `pointer-events-none` ensures this layer doesn't block interactions with content "behind" it
    // (which in this case would be content in other sections, or the scrollbar itself).
    <div className="fixed inset-y-0 left-auto right-0 w-3/5 h-screen pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}