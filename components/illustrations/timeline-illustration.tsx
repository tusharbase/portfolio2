"use client"

import { useEffect, useRef } from "react"

interface TimelineIllustrationProps {
  animate?: boolean
}

export function TimelineIllustration({ animate = false }: TimelineIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create timeline illustration elements
    const createTimelineElements = () => {
      // Create central line
      const centralLine = document.createElement("div")
      centralLine.className = "absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-700"
      container.appendChild(centralLine)

      // Create year markers
      const years = ["2020", "2021", "2022", "Present"]

      years.forEach((year, index) => {
        const position = (index / (years.length - 1)) * 100

        // Create marker
        const marker = document.createElement("div")
        marker.className = "absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center"
        marker.style.left = `${position}%`

        // Create dot
        const dot = document.createElement("div")
        dot.className = "w-4 h-4 rounded-full bg-neutral-400 dark:bg-neutral-500 mb-2"

        if (animate) {
          dot.classList.add("animate")
          dot.style.animationDelay = `${index * 0.2}s`
        }

        const label = document.createElement("div")
        label.className = "text-sm font-medium"
        label.textContent = year

        marker.appendChild(dot)
        marker.appendChild(label)
        container.appendChild(marker)
      })
    }

    createTimelineElements()

    return () => {
      // Clean up
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [animate])

  return <div ref={containerRef} className="w-full h-full relative" />
}
