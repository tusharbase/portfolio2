"use client"

import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { TimelineIllustration } from "@/components/illustrations/timeline-illustration"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      period: "2022 - Present",
      role: "Senior Onchain Developer",
      company: "TechCorp Innovations",
      description:
        "Leading development of DeFi protocols on Base Layer 2, implementing smart contracts, and architecting scalable onchain solutions.",
      achievements: [
        "Built DeFi protocol handling $10M+ TVL",
        "Reduced gas costs by 60% through optimization",
        "Led team of 5 developers",
      ],
      tech: ["Solidity", "Base L2", "Next.js", "TypeScript"],
    },
    {
      period: "2021 - 2022",
      role: "Full Stack Developer",
      company: "AI Solutions Inc",
      description:
        "Developed AI-powered applications using cutting-edge machine learning technologies and modern web frameworks.",
      achievements: [
        "Created AI trading bot with 94% accuracy",
        "Implemented real-time data processing",
        "Optimized application performance by 200%",
      ],
      tech: ["Python", "TensorFlow", "React", "Node.js"],
    },
    {
      period: "2020 - 2021",
      role: "Frontend Developer",
      company: "StartupXYZ",
      description:
        "Built responsive web applications and collaborated with design teams to create exceptional user experiences.",
      achievements: [
        "Delivered 15+ production applications",
        "Improved user engagement by 150%",
        "Mentored junior developers",
      ],
      tech: ["React", "JavaScript", "CSS", "Git"],
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
            <p className="section-subheading">My journey through the tech landscape and key professional milestones</p>
          </div>

          <div ref={ref}>
            {/* Timeline Illustration */}
            <div className="h-[120px] mb-16 illustration-container">
              <TimelineIllustration animate={inView} />
            </div>

            {/* Experience Timeline */}
            <div className="space-y-12 relative">
              <div className="timeline-connector"></div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-12">
                  <div className="timeline-dot"></div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">{exp.period}</div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <div className="text-neutral-600 dark:text-neutral-300 font-medium">{exp.company}</div>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400">{exp.description}</p>

                    <div className="space-y-2">
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

                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
