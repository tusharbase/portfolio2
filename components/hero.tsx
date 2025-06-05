"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CodeIllustration } from "@/components/illustrations/code-illustration"
import { ContactDialog } from "@/components/contact-dialog"

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [contactOpen, setContactOpen] = useState(false)

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="home"
      ref={scrollRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 isolate"
      // `isolate` creates a new stacking context. Hero section itself should not have overflow-hidden.
    >
      {/* Dot pattern background layer - z-0 */}
      <div className="absolute inset-0 dot-pattern z-0"></div>

      {/* Particle Illustration Container */}
      {/* This container is absolute within Hero, takes full height of Hero and 60% width on the right. */}
      {/* CodeIllustration will fill this container. */}
      {/* `overflow-hidden` ensures anything from CodeIllustration (if it somehow exceeded) is clipped. */}
      {/* `pointer-events-none` makes this layer non-interactive if it's purely decorative. */}
      {/* `z-[1]` places it above dot-pattern but below main content. */}
      <div className="hidden lg:block absolute top-0 right-0 w-3/5 h-full z-[1] overflow-hidden pointer-events-none">
        <CodeIllustration />
      </div>

      {/* Content Container - needs a higher z-index (z-10) to be on top of illustration layers */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content Column */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm mb-6">
                <span className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-full mr-2"></span>
                Thinker & Tech Builder
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight">
                Building the <br />
                <span className="gradient-text">digital future</span>
                <br />
                with code
              </h1>
            </div>

            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
              Specialized in cutting-edge technologies including onchain, AI integration, and modern web development
              to create next generation digital solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group"
                onClick={handleScrollToProjects}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group" // Removed lg:hidden to make it always visible, adjust as needed
                onClick={() => setContactOpen(true)}
              >
                Let's Connect!
              </Button>
              <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
            </div>
          </div>

          {/* Grid Placeholder for the right column */}
          {/* This empty div ensures the text content on the left stays in the first grid column
              and doesn't expand to full width. `items-center` on the parent grid will handle
              vertical alignment.
          */}
          <div className="hidden lg:block">
            {/* This space is effectively where the absolutely positioned illustration resides visually. */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop only, ensure it's above particle layer with z-10 */}
      <div className="hidden md:flex flex-col items-center scroll-indicator z-10" onClick={handleScrollToAbout}>
        <div className="mouse"></div>
        <div className="mt-2 text-xs font-medium">Scroll</div>
      </div>
    </section>
  )
}