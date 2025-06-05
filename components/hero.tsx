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
      // `isolate` creates a new stacking context, useful for z-index management.
      // The Hero section itself should NOT have overflow-hidden for this effect.
    >
      {/* Dot pattern background layer - z-0 places it at the bottom of the stacking context */}
      <div className="absolute inset-0 dot-pattern z-0"></div>

      {/* Particle Illustration Clipping Container */}
      {/* This container scrolls with the Hero section. */}
      {/* `overflow-hidden` clips the `fixed` CodeIllustration component inside it. */}
      {/* Positioned absolutely to cover the right 3/5 of the Hero section, full height of Hero. */}
      {/* `z-[1]` to be above dot-pattern, but below main content (z-10). */}
      <div className="hidden lg:block absolute top-0 right-0 w-3/5 h-full overflow-hidden z-[1]">
        {/* CodeIllustration is fixed internally, but will be clipped by this parent */}
        <CodeIllustration />
      </div>

      {/* Content Container - needs a higher z-index to be on top of the particle layer */}
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
                className="group" // Keep or modify responsive classes like lg:hidden as needed
                onClick={() => setContactOpen(true)}
              >
                Let's Connect!
              </Button>
              <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
            </div>
          </div>

          {/* Illustration Placeholder Column (for grid layout consistency) */}
          {/* This div ensures the text content stays in the first column of the grid.
              The actual illustration is now an absolutely positioned layer.
              Its height can influence vertical alignment if `items-center` is used on the grid.
          */}
          <div className="hidden lg:block relative h-[400px] lg:h-[500px]">
            {/* This space is intentionally left empty as CodeIllustration is a background layer. */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop only, ensure it's above particle layer */}
      <div className="hidden md:flex flex-col items-center scroll-indicator z-10" onClick={handleScrollToAbout}>
        <div className="mouse"></div>
        <div className="mt-2 text-xs font-medium">Scroll</div>
      </div>
    </section>
  )
}