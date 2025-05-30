"use client"

import { useEffect, useRef } from "react"

interface TechFlowIllustrationProps {
  animate?: boolean
}

export function TechFlowIllustration({ animate = false }: TechFlowIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create tech flow elements
    const createTechFlowElements = () => {
      const technologies = [
        { name: "Onchain", icon: "⛓️" },
        { name: "AI", icon: "🧠" },
        { name: "Web", icon: "🌐" },
        { name: "DeFi", icon: "💰" },
        { name: "Cloud", icon: "☁️" },
      ]

      // Create central flow line
      const flowLine = document.createElement("div")
      flowLine.className = "absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-700"
      container.appendChild(flowLine)

      // Create tech nodes
      technologies.forEach((tech, index) => {
        // Calculate position with padding to prevent edge cutoff
        const padding = 8 // 8% padding on each side
        const range = 100 - (padding * 2)
        const position = padding + (index / (technologies.length - 1)) * range

        const node = document.createElement("div")
        node.className = "absolute top-1/2 left-0 transform -translate-y-1/2 flex flex-col items-center"
        node.style.left = `${position}%`

        const iconCircle = document.createElement("div")
        iconCircle.className =
          "w-12 h-12 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-md mb-2"
        iconCircle.innerHTML = `<span class="text-xl">${tech.icon}</span>`

        const label = document.createElement("div")
        label.className = "text-sm font-medium"
        label.textContent = tech.name

        node.appendChild(iconCircle)
        node.appendChild(label)
        container.appendChild(node)

        if (animate) {
          iconCircle.classList.add("animate")
          iconCircle.style.animationDelay = `${index * 0.2}s`
        }
      })

      // Create flowing dots
      if (animate) {
        for (let i = 0; i < 5; i++) {
          const dot = document.createElement("div")
          dot.className =
            "absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500"
          dot.style.left = "-10px"
          dot.style.animationDelay = `${i * 1}s`

          // Create animation
          const keyframes = [
            { left: "-10px", opacity: 0 },
            { left: "10%", opacity: 1 },
            { left: "30%", opacity: 1 },
            { left: "50%", opacity: 1 },
            { left: "70%", opacity: 1 },
            { left: "90%", opacity: 1 },
            { left: "110%", opacity: 0 },
          ]

          dot.animate(keyframes, {
            duration: 5000,
            iterations: Number.POSITIVE_INFINITY,
            delay: i * 1000,
          })

          container.appendChild(dot)
        }
      }
    }

    createTechFlowElements()

    return () => {
      // Clean up
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [animate])

  return <div ref={containerRef} className="w-full h-40 relative overflow-visible" />
}
