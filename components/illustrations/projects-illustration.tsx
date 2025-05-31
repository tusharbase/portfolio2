"use client"

import { useEffect, useRef } from "react"

interface ProjectsIllustrationProps {
  animate?: boolean
}

export function ProjectsIllustration({ animate = false }: ProjectsIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create projects illustration elements
    const createProjectsElements = () => {
      // Create central line
      const centralLine = document.createElement("div")
      centralLine.className = "absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-700"
      container.appendChild(centralLine)

      // Create project nodes
      const projects = ["DeFi", "AI", "Onchain"]

      projects.forEach((project, index) => {
        const position = ((index + 1) / (projects.length + 1)) * 100

        // Create node
        const node = document.createElement("div")
        node.className = "absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center"
        node.style.left = `${position}%`

        // Create hexagon
        const hexagon = document.createElement("div")
        hexagon.className = "w-16 h-16 bg-white dark:bg-neutral-800 shadow-md mb-2 flex items-center justify-center"
        hexagon.style.clipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

        const label = document.createElement("div")
        label.className = "text-sm font-medium"
        label.textContent = project

        node.appendChild(hexagon)
        node.appendChild(label)
        container.appendChild(node)

        if (animate) {
          hexagon.classList.add("animate")
          hexagon.style.animationDelay = `${index * 0.2}s`
        }

        // Create connecting dots
        for (let i = 1; i <= 3; i++) {
          const dot = document.createElement("div")
          dot.className =
            "absolute top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500"

          const prevPosition = index === 0 ? 0 : (index / (projects.length + 1)) * 100
          const dotPosition = prevPosition + (position - prevPosition) * (i / 4)

          dot.style.left = `${dotPosition}%`
          container.appendChild(dot)
        }
      })
    }

    createProjectsElements()

    return () => {
      // Clean up
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [animate])

  return <div ref={containerRef} className="w-full h-full relative" suppressHydrationWarning />
}