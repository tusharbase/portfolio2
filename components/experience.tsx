"use client"

import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
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
    setExpandedItems((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]))
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
        "Building a product that helps users navigate life's important choices",
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
        "Conducted successful product trials and ensured customer success",
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
        "Contributed to the evolution of CDN and security solutions",
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
        "Gained deep expertise in low-level programming and system architecture",
      ],
      tech: ["C/C++", "Linux Kernel", "Embedded Systems", "System Architecture"],
    },
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
            <p className="section-subheading">
              Explore my professional journey through interactive timeline cards — each role shaped my expertise in
              building exceptional digital experiences
            </p>
          </div>

          <div ref={ref} className="relative">
            {/* Interactive Timeline */}
            <div className="relative mb-12">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-300 dark:from-neutral-600 dark:via-neutral-500 dark:to-neutral-600"></div>

              {experiences.map((exp, index) => {
                const isExpanded = expandedItems.includes(index)
                return (
                  <div
                    key={index}
                    className={cn(
                      "relative pl-16 mb-8 group transition-all duration-500",
                      isExpanded ? "mb-12" : "mb-8",
                    )}
                  >
                    {/* Animated Timeline Dot */}
                    <div
                      className={cn(
                        "absolute left-7 top-6 w-4 h-4 -translate-x-1/2 rounded-full transition-all duration-300 cursor-pointer z-10",
                        "bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-500 dark:to-neutral-300",
                        "ring-4 ring-white dark:ring-neutral-900 shadow-lg",
                        "group-hover:scale-125 group-hover:shadow-xl",
                        isExpanded && "scale-125 bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl",
                      )}
                      onClick={() => toggleExpand(index)}
                    >
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300",
                          "group-hover:opacity-20",
                          isExpanded && "opacity-30",
                        )}
                      ></div>
                    </div>

                    {/* Experience Card with Enhanced Design */}
                    <div
                      className={cn(
                        "relative bg-white dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl transition-all duration-500 cursor-pointer overflow-hidden",
                        "border border-neutral-200/50 dark:border-neutral-700/50",
                        "hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                        "hover:border-neutral-300/70 dark:hover:border-neutral-600/70",
                        "group-hover:-translate-y-1",
                        isExpanded &&
                          "shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-neutral-300/70 dark:border-neutral-600/70",
                      )}
                      onClick={() => toggleExpand(index)}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                      <div className="relative p-6">
                        {/* Header with Better Typography */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                                {exp.period}
                              </span>
                              {index === 0 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                  Current
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {exp.role}
                            </h3>
                            <div className="text-neutral-600 dark:text-neutral-300 font-semibold">{exp.company}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center transition-all duration-200",
                                "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30",
                              )}
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-neutral-500 dark:text-neutral-400 transition-all duration-200",
                                  "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                                  isExpanded && "transform rotate-180",
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Description with Better Spacing */}
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">{exp.description}</p>

                        {/* Expandable Content with Smooth Animation */}
                        <div
                          className={cn(
                            "transition-all duration-500 ease-out",
                            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
                          )}
                        >
                          <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50">
                            {/* Key Achievements with Icons */}
                            <div className="space-y-3 mb-6">
                              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                                Key Achievements
                              </h4>
                              {exp.achievements.map((achievement, achIndex) => (
                                <div
                                  key={achIndex}
                                  className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 group/achievement"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0 group-hover/achievement:scale-125 transition-transform"></div>
                                  <span className="leading-relaxed">{achievement}</span>
                                </div>
                              ))}
                            </div>

                            {/* Technologies with Enhanced Design */}
                            <div>
                              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide mb-3">
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.tech.map((tech, techIndex) => (
                                  <Badge
                                    key={techIndex}
                                    variant="secondary"
                                    className={cn(
                                      "bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600",
                                      "text-neutral-800 dark:text-neutral-200 border-0",
                                      "hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30",
                                      "hover:text-blue-700 dark:hover:text-blue-300",
                                      "transition-all duration-200 hover:scale-105",
                                    )}
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
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
