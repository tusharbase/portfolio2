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

    // The parentElement is the div returned by this component's render method
    const parentElement = canvas.parentElement
    if (!parentElement) return

    ctxRef.current = canvas.getContext("2d")
    const ctx = ctxRef.current
    if (!ctx) return

    const codeSnippets = [
      "bolt", "₿", "fork", "lovable", "onchain", "grok", "deploy", "$",
      "tokens", "build", "AI SDK", "ETH", "don't die", "USDC", "base",
      "v0", "cursor", "windsurf", "vercel", "supabase",
    ]

    const createParticlesInternal = () => {
      particlesRef.current = [] // Clear existing particles
      // Adjust particle count based on visual preference for the area
      const totalParticles = 25 // Increased slightly for potentially larger area

      for (let i = 0; i < totalParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height, // Spread particles throughout the canvas height
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

    const resizeCanvasAndParticles = () => {
      if (!canvas || !parentElement || !ctx) return
      
      // Set canvas dimensions based on its direct parent (the div returned by this component)
      // This div gets its size from the container in hero.tsx
      canvas.width = parentElement.offsetWidth
      canvas.height = parentElement.offsetHeight
      
      // Re-create particles when canvas size changes to fit new dimensions
      createParticlesInternal()
    }

    resizeCanvasAndParticles() // Initial setup of canvas size and particles
    
    const animate = () => {
      if (!ctx || !canvas) return // Ensure ctx and canvas are still valid

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Determine stroke style based on current theme
      if (document.documentElement.classList.contains('dark')) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      } else {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.05)"
      }
      
      ctx.beginPath()
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
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
        
        // Draw particle text
        ctx.fillText(particle.text, particle.x, particle.y)
        
        ctx.globalAlpha = 1 // Reset globalAlpha

        // Move particle
        particle.y += particle.speed
        
        // Reset particles that go below the canvas bottom
        // Use particle.size as a small buffer for smoother appearance at edges
        if (particle.y > canvas.height + particle.size) { 
          particle.y = -particle.size // Reset to just above the canvas top
          particle.x = Math.random() * canvas.width // New horizontal position
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate() // Start animation

    // Listen for window resize to adjust canvas and particles
    window.addEventListener("resize", resizeCanvasAndParticles)

    return () => {
      window.removeEventListener("resize", resizeCanvasAndParticles)
      cancelAnimationFrame(animationRef.current)
    }
  }, []) // Empty dependency array, effect runs once on mount and cleans up on unmount

  return (
    // This div is positioned absolutely to fill its parent in Hero.tsx
    // Its parent in Hero.tsx will have overflow:hidden if needed and define the actual visual bounds.
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}