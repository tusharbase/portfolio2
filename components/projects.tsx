"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  link: string
  features?: string[]
}

const ProjectCard = ({ 
  project, 
  isExpanded, 
  onToggle 
}: { 
  project: ProjectCardProps, 
  isExpanded: boolean, 
  onToggle: () => void 
}) => (
  <a 
    href={project.link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="relative group h-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-2 hover:ring-neutral-300 dark:hover:ring-neutral-600"
    onClick={(e) => {
      // Prevent the click from bubbling up to parent elements
      e.stopPropagation();
    }}
  >
    <div className={`relative aspect-video w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden ${project.title === 'Zero Now' ? 'pt-4' : ''}`}>
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${project.title === 'Zero Now' ? 'object-top' : 'object-center'}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
    
    <div className="p-6 flex flex-col flex-1">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{project.title}</h3>
        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 mt-1 transition-colors" />
      </div>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        {project.description}
      </p>
      
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </a>
)

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const projectsData: ProjectCardProps[] = [
    {
      title: "Decidoodle",
      description: "AI-powered decision making assistant that helps you make better choices.",
      longDescription: "Decidoodle is an AI copilot that helps you make better decisions by analyzing your options and providing data-driven recommendations. It uses machine learning to understand your preferences and suggest the best course of action.",
      image: "/desidoodle.png",
      tags: ["Next.js", "AI", "Vercel", "Supabase"],
      link: "https://decidoodle.vercel.app",
      features: [
        "AI-powered decision analysis",
        "Customizable decision criteria",
        "Real-time collaboration",
        "Data visualization"
      ]
    },
    {
      title: "Zero Now",
      description: "Comprehensive fitness tracker for gym enthusiasts and athletes.",
      longDescription: "Zero Now is a fitness and gym exercise tracker that helps you stay on top of your workout routine, track your progress, and achieve your fitness goals with personalized insights and analytics.",
      image: "/zeronow.png",
      tags: ["Next.js", "Supabase", "Vercel"],
      link: "https://zero-now.vercel.app",
      features: [
        "Workout tracking",
        "Exercise library",
        "Progress analytics",
        "Custom workout plans"
      ]
    },
    {
      title: "AI CodeFlow",
      description: "Advanced analytics dashboard for onchain data with real-time insights.",
      longDescription: "AI CodeFlow provides comprehensive analytics and monitoring for onchain data, offering real-time insights and predictive analytics to help developers and analysts understand blockchain data patterns and trends.",
      image: "/aicodeflow.png",
      tags: ["Next.js", "Supabase", "AI", "Vercel"],
      link: "https://aicodeflow0.vercel.app",
      features: [
        "Real-time data visualization",
        "Custom dashboards",
        "Predictive analytics",
        "Smart alerts"
      ]
    },
    {
      title: "PrimePDF",
      description: "Transform and analyze PDF documents with AI-powered tools.",
      longDescription: "PrimePDF is a powerful tool for working with PDF documents. It offers advanced features for transforming, editing, and analyzing PDFs using AI to extract valuable information and automate document workflows.",
      image: "/primepdf.png",
      tags: ["Next.js", "Supabase", "AI", "Vercel", "Coinbase", "USDC"],
      link: "https://primepdf.vercel.app",
      features: [
        "PDF to text/image conversion",
        "AI-powered analysis",
        "Document editing",
        "Batch processing"
      ]
    },
  ]

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="section-heading gradient-text">
            My Projects
          </h2>
          <div className="w-20 h-1 rounded-full mx-auto mb-6 accent-gradient"></div>
          <p className="section-subheading">
            A collection of my latest projects showcasing my skills in web development, AI, and modern technologies.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={project.title}
                project={project}
                isExpanded={expandedProject === index}
                onToggle={() => toggleProject(index)}
              />
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -z-20 top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -z-20 -bottom-8 left-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>
    </section>
  )
}
