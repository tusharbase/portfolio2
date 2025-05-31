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
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth()
      const startYear = 2007 // Updated to match earliest experience
      const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i)
      
      // Define marker type
      type TimelineMarker = {
        label: string
        year: number | string
        isYear: boolean
        isCurrentYear: boolean
        monthIndex?: number
      }

      // Define all markers with their positions and labels
      const allMarkers: TimelineMarker[] = years.flatMap((year): TimelineMarker[] => {
        // For the current year, add monthly markers
        if (year === currentYear) {
          return Array.from({ length: currentMonth + 1 }, (_, monthIndex) => ({
            label: monthIndex === 0 || monthIndex === currentMonth ? [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ][monthIndex] : '',
            year: monthIndex === 0 ? year : '',
            isYear: monthIndex === 0,
            isCurrentYear: true,
            monthIndex
          }))
        }
        
        // For previous years, just add yearly markers
        return [{
          label: year.toString(),
          year,
          isYear: true,
          isCurrentYear: false,
          monthIndex: 0
        }]
      })

      allMarkers.forEach((marker: TimelineMarker, index: number) => {
        const position = (index / Math.max(1, allMarkers.length - 1)) * 100

        // Create marker container
        const markerEl = document.createElement("div")
        markerEl.className = `absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center transition-opacity duration-300 ${
          marker.isCurrentYear ? 'current-year-marker' : ''
        }`
        markerEl.style.left = `${position}%`

        // Create dot (only show for significant markers)
        if (marker.isYear || (marker.isCurrentYear && marker.label)) {
          const dot = document.createElement("div")
          dot.className = `w-2 h-2 rounded-full ${
            marker.isCurrentYear ? 'bg-blue-500 scale-125' : 'bg-neutral-400 dark:bg-neutral-500'
          } mb-2 transform transition-transform duration-300`

          if (animate) {
            dot.classList.add("opacity-0")
            setTimeout(() => {
              dot.classList.remove("opacity-0")
              dot.classList.add("opacity-100")
            }, index * 100)
          }

          markerEl.appendChild(dot)
        }

        // Create label container with improved typography and spacing
        const label = document.createElement("div")
        label.className = `text-xs font-medium text-center transition-colors duration-300 ${
          marker.isCurrentYear ? 'text-blue-500' : 'text-neutral-600 dark:text-neutral-400'
        }`
        
        // Add year and month labels
        if (marker.isYear || (marker.isCurrentYear && marker.label)) {
          if (marker.year) {
            const yearLabel = document.createElement("div")
            yearLabel.textContent = marker.year.toString()
            yearLabel.className = "font-semibold text-sm mb-1"
            label.appendChild(yearLabel)
          }
          
          if (marker.label && !marker.isYear) {
            const monthLabel = document.createElement("div")
            monthLabel.textContent = marker.label
            monthLabel.className = "text-xs opacity-80"
            label.appendChild(monthLabel)
          }
        }

        markerEl.appendChild(label)
        container.appendChild(markerEl)

        // Add hover effects
        markerEl.addEventListener('mouseenter', () => {
          markerEl.classList.add('scale-110')
          markerEl.style.zIndex = '10'
        })
        
        markerEl.addEventListener('mouseleave', () => {
          markerEl.classList.remove('scale-110')
          markerEl.style.zIndex = ''
        })
      })
    }

    createTimelineElements()

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [animate])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative select-none" 
      suppressHydrationWarning 
    />
  )
}