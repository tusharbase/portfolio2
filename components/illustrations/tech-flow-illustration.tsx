"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

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
        { name: "Onchain", icon: "/base-logo.png", isSvg: false },
        { name: "AI", icon: "🧠", isSvg: false },
        { name: "Web", icon: "🌐", isSvg: false },
        { name: "USDC", icon: "/usd-logo.svg", isSvg: true },
        { name: "Cursor", icon: "/cursor-logo.svg", isSvg: true },
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
          "w-16 h-16 flex items-center justify-center mb-2"
        if (tech.isSvg || tech.icon.startsWith('/')) {
          // Create a container for the Next.js Image component
          const imgContainer = document.createElement("div")
          imgContainer.className = "relative w-10 h-10"
          
          // We'll add a data attribute with the image source
          imgContainer.setAttribute('data-src', tech.icon)
          imgContainer.setAttribute('data-alt', tech.name)
          
          // Add a temporary loader
          const loader = document.createElement("div")
          loader.className = "absolute inset-0 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"
          imgContainer.appendChild(loader)
          
          // Store reference to load the actual image after component mounts
          const loadImage = () => {
            const img = new window.Image()
            img.src = tech.icon
            img.onload = () => {
              // Replace loader with actual image
              const imageElement = document.createElement('div')
              imageElement.className = "relative w-full h-full"
              
              // Create image element
              const imgElement = document.createElement('img')
              imgElement.src = tech.icon
              imgElement.alt = tech.name
              imgElement.className = "w-full h-full object-contain"
              
              imageElement.appendChild(imgElement)
              imgContainer.innerHTML = ''
              imgContainer.appendChild(imageElement)
            }
          }
          
          // Load image after a small delay to prevent layout shifts
          setTimeout(loadImage, 100)
          iconCircle.appendChild(imgContainer)
        } else {
          // Handle emoji icons
          iconCircle.innerHTML = `<span class="text-4xl">${tech.icon}</span>`
        }

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
