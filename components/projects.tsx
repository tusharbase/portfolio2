"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import { ProjectsIllustration } from "@/components/illustrations/projects-illustration"

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "DeFi Protocol Suite",
      description:
        "Advanced DeFi protocol built on Base Layer 2 with automated yield farming and liquidity management.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Base L2", "Solidity", "Next.js", "Coinbase SDK"],
      link: "#",
    },
    {
      title: "AI Trading Engine",
      description:
        "Intelligent trading system powered by AI agents that analyzes market patterns and executes optimal strategies.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["AI Agents", "Python", "TensorFlow", "USDC API"],
      link: "#",
    },
    {
      title: "Web3 Analytics Platform",
      description:
        "Comprehensive analytics dashboard for blockchain data with real-time monitoring and predictive insights.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Supabase", "Web3.js", "D3.js"],
      link: "#",
    },
  ]

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
              Innovative solutions that showcase my expertise in blockchain, AI, and web technologies
            </p>
          </div>

          <div ref={ref}>
            {/* Projects Illustration */}
            <div className="h-[120px] mb-16 illustration-container">
              <ProjectsIllustration animate={inView} />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="project-overlay"></div>
                  <div className="project-content">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-neutral-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-white/20 text-white border-none">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="default" className="bg-white text-neutral-900 hover:bg-neutral-200">
                      View Project
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
