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
        // Adjust spacing for mobile to prevent overflow
        let position = padding + (index / (technologies.length - 1)) * range
        
        // Add responsive adjustments for mobile
        const isMobile = window.innerWidth < 768 // Tailwind's md breakpoint
        if (isMobile) {
          // Slightly reduce the range on mobile to prevent edge crowding
          const mobilePadding = 12
          const mobileRange = 100 - (mobilePadding * 2)
          position = mobilePadding + (index / (technologies.length - 1)) * mobileRange
        }

        const node = document.createElement("div")
        node.className = "absolute left-0 flex flex-col items-center"
        node.style.left = `${position}%`
        node.style.top = "30%" // Position higher up in the container

        const iconCircle = document.createElement("div")
        iconCircle.className =
"w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-1 md:mb-2"
        if (tech.isSvg || tech.icon.startsWith('/')) {
          // Create a container for the Next.js Image component
          const imgContainer = document.createElement("div")
          imgContainer.className = "relative w-8 h-8 md:w-10 md:h-10"
          
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
        label.className = "text-xs md:text-sm font-medium"
        label.textContent = tech.name

        node.appendChild(iconCircle)
        node.appendChild(label)
        container.appendChild(node)

        if (animate) {
          iconCircle.classList.add("animate")
          iconCircle.style.animationDelay = `${index * 0.2}s`
        }
      })

      // Create flowing dots from each technology
      if (animate) {
        technologies.forEach((tech, techIndex) => {
          // Calculate position with the same logic as the tech nodes
          const padding = window.innerWidth < 768 ? 14 : 10 // Increased padding to shift content left
          const range = 100 - (padding * 2)
          const position = padding + (techIndex / (technologies.length - 1)) * range
          
          // Create dots for this technology
          // Add a small offset to center the origin on the icon
          const iconCenterOffset = 1.2 // Adjusted to move origin left
          const centeredPosition = position + iconCenterOffset
          
          for (let i = 0; i < 3; i++) {
            // Create dot moving to the right
            createDot(container, centeredPosition, 'right', i * 0.8, techIndex * 0.3)
            
            // Create dot moving to the left
            createDot(container, centeredPosition, 'left', i * 0.8, techIndex * 0.3)
          }
        })
        
        // Helper function to create a single dot
        function createDot(container: HTMLElement, originPosition: number, direction: 'left' | 'right', delay: number, techDelay: number) {
          const dot = document.createElement("div")
          dot.className = "absolute top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neutral-400/80 dark:bg-neutral-500/80"
          
          // Start and end positions based on direction
          const travelDistance = 15 // Distance to travel in %
          const startPos = originPosition
          const endPos = direction === 'right' 
            ? startPos + travelDistance 
            : startPos - travelDistance
          
          // Animation keyframes
          const keyframes = [
            { left: `${startPos}%`, opacity: 1 },
            { left: `${endPos}%`, opacity: 0 },
          ]
          
          // Create and start animation
          const animation = dot.animate(keyframes, {
            duration: 3500, // Slower animation (3.5 seconds)
            iterations: Number.POSITIVE_INFINITY,
            delay: (delay * 1000) + (techDelay * 1000),
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
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

  return <div ref={containerRef} className="w-full h-32 md:h-40 relative overflow-visible" />
}
