"use client"

import { useEffect, useRef } from "react"

export function ContactIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create contact illustration elements
    const createContactElements = () => {
      // Create envelope
      const envelope = document.createElement("div")
      envelope.className =
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg flex items-center justify-center overflow-hidden"

      // Create envelope flap
      const flap = document.createElement("div")
      flap.className = "absolute top-0 left-0 right-0 h-24 bg-neutral-100 dark:bg-neutral-700"
      flap.style.clipPath = "polygon(0 0, 100% 0, 50% 100%)"
      envelope.appendChild(flap)

      // Create envelope body
      const body = document.createElement("div")
      body.className =
        "absolute bottom-0 left-0 right-0 h-36 border-t border-neutral-200 dark:border-neutral-600 flex items-center justify-center"

      // Create message
      const message = document.createElement("div")
      message.className =
        "w-48 h-28 bg-neutral-50 dark:bg-neutral-900 rounded shadow-sm p-3 transform translate-y-[-8px]"

      // Create message lines
      for (let i = 0; i < 4; i++) {
        const line = document.createElement("div")
        line.className = "w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"
        message.appendChild(line)
      }

      body.appendChild(message)
      envelope.appendChild(body)
      container.appendChild(envelope)

      // Create floating elements
      const elements = [
        { icon: "📧", position: "top-10 left-10" },
        { icon: "💬", position: "top-10 right-10" },
        { icon: "📱", position: "bottom-10 left-10" },
        { icon: "🔗", position: "bottom-10 right-10" },
      ]

      elements.forEach((element, index) => {
        const el = document.createElement("div")
        el.className = `absolute ${element.position} w-10 h-10 bg-white dark:bg-neutral-800 rounded-full shadow-md flex items-center justify-center animate-float`
        el.style.animationDelay = `${index * 0.5}s`
        el.textContent = element.icon
        container.appendChild(el)
      })
    }

    createContactElements()

    return () => {
      // Clean up
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full relative" />
}
