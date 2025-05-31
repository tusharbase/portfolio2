"use client"

import { useEffect, useRef } from "react"

export function ProfileIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create profile elements
    const createProfileElements = () => {
      // Logo container
      const logoContainer = document.createElement("div")
      logoContainer.className =
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center bg-transparent"
      
      const logoImg = document.createElement("img")
      logoImg.src = "/dance.png"
      logoImg.alt = "Profile Logo"
      logoImg.className = "w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
      logoImg.style.webkitUserDrag = 'none'
      logoImg.style.userSelect = 'none'
      logoImg.draggable = false
      logoContainer.appendChild(logoImg)
      container.appendChild(logoContainer)

      // Skill bubbles
      const skills = [
        { name: "Onchain", position: "top-10 left-10" },
        { name: "AI", position: "top-10 right-10" },
        { name: "Webapps", position: "bottom-10 left-10" },
        { name: "Vibe Coding", position: "bottom-10 right-10" },
      ]

      skills.forEach((skill, index) => {
        const bubble = document.createElement("div")
        bubble.className = `absolute ${skill.position} px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm font-medium animate-float`
        bubble.style.animationDelay = `${index * 0.5}s`
        bubble.textContent = skill.name
        container.appendChild(bubble)

        // Create connecting lines
        const line = document.createElement("div")
        line.className = "line-connector"
        container.appendChild(line)

        // Position the line to connect the bubble to the center
        const updateLine = () => {
          const centerX = container.offsetWidth / 2
          const centerY = container.offsetHeight / 2
          const bubbleRect = bubble.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()

          const bubbleCenterX = bubbleRect.left - containerRect.left + bubbleRect.width / 2
          const bubbleCenterY = bubbleRect.top - containerRect.top + bubbleRect.height / 2

          const angle = Math.atan2(bubbleCenterY - centerY, bubbleCenterX - centerX)
          const distance = Math.sqrt(Math.pow(bubbleCenterX - centerX, 2) + Math.pow(bubbleCenterY - centerY, 2))

          line.style.width = `${distance}px`
          line.style.left = `${centerX}px`
          line.style.top = `${centerY}px`
          line.style.transform = `rotate(${angle}rad)`
        }

        updateLine()
        window.addEventListener("resize", updateLine)
      })
    }

    createProfileElements()

    return () => {
      // Clean up
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full relative" suppressHydrationWarning />
}
