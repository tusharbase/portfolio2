"use client"

import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { TimelineIllustration } from "@/components/illustrations/timeline-illustration"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedItems, setExpandedItems] = useState<number[]>([0]) // Start with first item expanded

  const toggleExpand = (index: number) => {
    setExpandedItems((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    )
  }

  const experiences = [
    {
      period: "Jan 2025 - Present",
      role: "Founder & Creator",
      company: "Decidoodle",
      description:
        "Building an AI-powered web application that transforms complex decision-making into simple, actionable insights. Leading all aspects from concept to launch with a focus on intuitive user experiences.",
      achievements: [
        "Developing AI-driven features that make complex decision-making accessible",
        "Creating a seamless, intuitive interface using modern web technologies",
        "Building a product that helps users navigate life's important choices"
      ],
      tech: ["AI/ML", "Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    },
    {
      period: "Jun 2023 - Jan 2025",
      role: "Senior Solution Engineer",
      company: "Edgio",
      description:
        "Played a key role in bridging the gap between technical solutions and customer needs in the CDN and security space.",
      achievements: [
        "Led technical presentations and demos for enterprise clients, translating complex solutions into business value",
        "Collaborated with sales teams to understand and address customer requirements",
        "Conducted successful product trials and ensured customer success"
      ],
      tech: ["CDN", "Cloud Security", "Pre-sales", "Technical Consulting"],
    },
    {
      period: "Oct 2016 - Jun 2023",
      role: "Advanced Services Engineer", 
      company: "Limelight Networks (Edgio)",
      description:
        "Provided technical expertise in content delivery and security solutions, ensuring optimal performance for clients.",
      achievements: [
        "Executed successful proof of concepts for enterprise clients",
        "Resolved complex technical issues in production environments",
        "Contributed to the evolution of CDN and security solutions"
      ],
      tech: ["Networking", "Troubleshooting", "POC Execution", "Technical Support"],
    },
    {
      period: "2007 - 2016",
      role: "Software Engineering Roles",
      company: "Various Companies",
      description:
        "Built a strong foundation in software engineering across embedded systems, Linux kernel development, and system programming.",
      achievements: [
        "Developed Linux system software and device drivers",
        "Led technical projects and mentored junior engineers",
        "Gained deep expertise in low-level programming and system architecture"
      ],
      tech: ["C/C++", "Linux Kernel", "Embedded Systems", "System Architecture"],
    }
  ]

  return (
    <section id="experience" className="py-20 bg-neutral-100 dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <div className="w-20 h-1 mt-4 mb-8 accent-gradient rounded-full mx-auto"></div>
            <p className="section-subheading">My journey through the tech landscape and key professional milestones</p>
          </div>

          <div ref={ref} className="relative">
            {/* Timeline Illustration */}
            <div className="h-[120px] mb-16">
              <TimelineIllustration animate={inView} />
            </div>

            {/* Experience Timeline */}
            <div className="space-y-6 relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800"></div>

              {experiences.map((exp, index) => {
                const isExpanded = expandedItems.includes(index)
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "relative pl-16 transition-all duration-300",
                      isExpanded ? "pb-8" : "pb-4"
                    )}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-7 top-3 w-3 h-3 -translate-x-1/2 rounded-full bg-neutral-400 dark:bg-neutral-600 ring-4 ring-neutral-100 dark:ring-neutral-900"></div>
                    
                    {/* Content Card */}
                    <div 
                      className={cn(
                        "relative bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700",
                        isExpanded && "shadow-md"
                      )}
                      onClick={() => toggleExpand(index)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">{exp.period}</div>
                          <h3 className="text-xl font-semibold mt-1">{exp.role}</h3>
                          <div className="text-neutral-600 dark:text-neutral-300 font-medium">{exp.company}</div>
                        </div>
                        <ChevronDown className={cn(
                          "h-5 w-5 text-neutral-400 transition-transform duration-200",
                          isExpanded && "transform rotate-180"
                        )} />
                      </div>

                      {/* Description */}
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">{exp.description}</p>

                      {/* Expandable Content */}
                      <div className={cn(
                        "grid transition-all duration-200",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}>
                        <div className="overflow-hidden">
                          {/* Achievements */}
                          <div className="space-y-2 mb-4">
                            {exp.achievements.map((achievement, achIndex) => (
                              <div
                                key={achIndex}
                                className="flex items-center text-sm text-neutral-600 dark:text-neutral-400"
                              >
                                <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full mr-3"></div>
                                {achievement}
                              </div>
                            ))}
                          </div>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech, techIndex) => (
                              <Badge 
                                key={techIndex} 
                                variant="secondary"
                                className="bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}