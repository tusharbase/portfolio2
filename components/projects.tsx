"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Github, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define the shape of our project data
interface ProjectCardProps {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  link: string
  githubLink?: string // Optional link to the code repository
  features: string[]
}

/**
 * ProjectDetailDialog Component
 * A modal that displays a detailed case study for a selected project.
 */
const ProjectDetailDialog = ({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectCardProps | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 md:p-8">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-3xl font-bold font-display">{project.title}</DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">{project.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Long Description / The Story */}
              <div>
                <h3 className="text-xl font-semibold mb-3">About This Project</h3>
                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-6 border-t mt-6">
            <div className="flex w-full justify-end gap-3">
              {project.githubLink && (
                 <Button variant="outline" asChild>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
              <Button asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Live Site
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

/**
 * ProjectCard Component
 * A visually appealing card to summarize a project. Uses the new unified-card style.
 */
const ProjectCard = ({ project, onClick }: { project: ProjectCardProps; onClick: () => void }) => (
  <div
    className="unified-card group h-full flex flex-col cursor-pointer"
    onClick={onClick}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    role="button"
    tabIndex={0}
  >
    <div className="relative aspect-video w-full overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>

    <div className="p-6 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{project.title}</h3>
      </div>
      <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
)

/**
 * Projects Section Component
 * Manages the state for displaying project details and renders the grid.
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectCardProps | null>(null)

  const projectsData: ProjectCardProps[] = [
    {
      title: "Decidoodle",
      description: "An AI-powered decision-making assistant to help you make better, data-driven choices.",
      longDescription: "Decidoodle is an AI copilot designed to demystify complex decisions. By allowing users to define options and criteria, it leverages machine learning models to analyze inputs, weigh factors, and provide clear, actionable recommendations. The goal was to create an intuitive tool that moves beyond simple pros-and-cons lists into intelligent, personalized guidance.",
      image: "/desidoodle.png",
      tags: ["Next.js", "AI", "Vercel", "Supabase"],
      link: "https://decidoodle.vercel.app",
      githubLink: "https://github.com/tusharbase/decidoodle",
      features: [
        "AI-powered decision analysis and scoring.",
        "Customizable criteria and weighting for personalized results.",
        "Secure user authentication and data storage with Supabase.",
        "Interactive and responsive interface built with Radix UI.",
      ],
    },
    {
      title: "Zero Now",
      description: "A comprehensive fitness and workout tracker for gym enthusiasts and athletes.",
      longDescription: "Zero Now is a fitness tracker built to be the perfect companion for anyone serious about their gym routine. It allows users to log workouts, track progress over time with detailed analytics, and discover new exercises. The focus was on a fast, clean UI that makes tracking effortless, so users can focus on their workout, not the app.",
      image: "/zeronow.png",
      tags: ["Next.js", "Supabase", "Vercel", "Charts"],
      link: "https://zero-now.vercel.app",
      githubLink: "https://github.com/tusharbase/zero-now",
      features: [
        "Detailed workout and exercise logging.",
        "Progress visualization with dynamic charts.",
        "Extensive library of exercises with instructions.",
        "User-specific data tracking for sets, reps, and weight.",
      ],
    },
    {
      title: "AI CodeFlow",
      description: "Advanced analytics dashboard for on-chain data with real-time insights.",
      longDescription: "AI CodeFlow provides a comprehensive analytics and monitoring solution for on-chain data. It offers real-time insights and predictive analytics to help developers and analysts understand complex blockchain data patterns and trends. The platform is designed to make web3 data accessible and actionable.",
      image: "/aicodeflow.png",
      tags: ["Next.js", "Supabase", "AI", "Vercel"],
      link: "https://aicodeflow0.vercel.app",
      githubLink: "https://github.com/tusharbase/aicodeflow",
      features: [
        "Real-time data visualization and custom dashboards.",
        "Predictive analytics for trend forecasting.",
        "Smart contract interaction and event monitoring.",
        "User-friendly interface for non-technical users.",
      ],
    },
    {
      title: "PrimePDF",
      description: "Transform and analyze your PDF documents with powerful AI-powered tools.",
      longDescription: "PrimePDF is a powerful tool for interacting with PDF documents. It leverages the Vercel AI SDK to enable conversational analysis, allowing users to 'chat' with their documents. It also integrates Coinbase Commerce for processing payments with USDC, showcasing a full-stack, AI-driven, on-chain application.",
      image: "/primepdf.png",
      tags: ["Next.js", "AI SDK", "Vercel", "Coinbase", "USDC"],
      link: "https://primepdf.vercel.app",
      githubLink: "https://github.com/tusharbase/prime-pdf",
      features: [
        "Conversational PDF analysis using the Vercel AI SDK.",
        "Secure PDF uploads and processing.",
        "On-chain payment integration with Coinbase Commerce.",
        "Streamed responses for a real-time chat experience.",
      ],
    },
  ]

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 rounded-full mx-auto mt-4 mb-6 accent-gradient"></div>
          <p className="section-subheading">
            A selection of projects where I've turned complex problems into elegant, user-friendly solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>
      
      <ProjectDetailDialog
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      />
    </section>
  )
}