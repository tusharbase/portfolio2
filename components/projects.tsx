"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import { ProjectsIllustration } from "@/components/illustrations/projects-illustration"
import { useEffect, useRef } from "react"
import Image from "next/image"

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projectsData = [
    {
      title: "Decidoodle",
      description:
        "AI-copilot for decision making.",
      image: "/desidoodle.png",
      tags: ["Next.js", "AI", "Vercel", "Supabase"],
      link: "https://decidoodle.vercel.app",
    },
    {
      title: "Zero Now",
      description:
        "Fitness/Gym exercise tracker.",
      image: "/zeronow.png",
      tags: ["Next.js", "Supabase", "Vercel"],
      link: "https://zero-now.vercel.app",
    },
    {
      title: "AI CodeFlow",
      description:
        "Comprehensive analytics dashboard for onchain data with real-time monitoring and predictive insights.",
      image: "/aicodeflow.png",
      tags: ["Next.js", "Supabase", "AI", "Vercel"],
      link: "https://aicodeflow0.vercel.app",
    },
    {
      title: "PrimePDF",
      description:
        "PDF transformation and AI analysis tool.",
      image: "/primepdf.png",
      tags: ["Next.js", "Supabase", "AI", "Vercel"],
      link: "https://primepdf.vercel.app",
    },
  ]

  // Duplicate projects for seamless looping
  const projects = [...projectsData, ...projectsData]
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollSpeed = 1 // pixels per frame
  let animationFrameId: number
  let scrollPosition = 0
  let isPaused = false

  const animateScroll = () => {
    if (!containerRef.current || isPaused) return
    
    const container = containerRef.current
    const containerWidth = container.scrollWidth / 2 // Since we duplicated the items
    
    scrollPosition += scrollSpeed
    
    // Reset scroll position when we've scrolled one full width
    if (scrollPosition >= containerWidth) {
      scrollPosition = 0
    }
    
    container.scrollLeft = scrollPosition
    animationFrameId = requestAnimationFrame(animateScroll)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    // Start animation
    animationFrameId = requestAnimationFrame(animateScroll)
    
    // Pause on hover
    const handleMouseEnter = () => { isPaused = true }
    const handleMouseLeave = () => { isPaused = false; animateScroll() }
    
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-20 h-1 mt-4 mb-8 accent-gradient rounded-full mx-auto"></div>
            <p className="section-subheading">
              Innovative solutions that showcase my expertise in onchain, AI, and web technologies
            </p>
          </div>

          <div ref={ref}>
            {/* Projects Illustration */}
            <div className="h-[120px] mb-16 illustration-container">
              <ProjectsIllustration animate={inView} />
            </div>

            {/* Horizontal Scroll Container */}
            <div 
              ref={containerRef}
              className="flex overflow-x-hidden py-4 gap-6 scrollbar-hide"
              style={{
                maskImage: 'linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent)',
                WebkitMaskImage: '-webkit-linear-gradient(left, transparent, #000 20px, #000 calc(100% - 20px), transparent)',
              }}
            >
              {projects.map((project, index) => (
                <div 
                  key={`${index}-${project.title}`} 
                  className="project-card flex-shrink-0 w-[300px] group relative rounded-xl overflow-hidden transition-transform hover:scale-105"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3} // Only prioritize first few images
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-neutral-200 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-white/20 text-white border-none">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="default" className="bg-white text-neutral-900 hover:bg-neutral-200 w-fit" onClick={() => window.open(project.link, '_blank')}>
                      View Project
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="mt-2">
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
