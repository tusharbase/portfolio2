"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CodeIllustration } from "@/components/illustrations/code-illustration"

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      ref={scrollRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
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
                onClick={() => {
                  const experienceSection = document.getElementById("experience");
                  if (experienceSection) {
                    experienceSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Illustration - Hidden on mobile */}
          <div className="hidden lg:block relative h-[400px] lg:h-[500px] illustration-container">
            <CodeIllustration />
          </div>
        </div>
      </div>


      {/* Scroll Indicator - Desktop only */}
      <div className="hidden md:flex flex-col items-center scroll-indicator" onClick={handleScroll}>
        <div className="mouse"></div>
        <div className="mt-2 text-xs font-medium">Scroll</div>
      </div>
    </section>
  )
}
