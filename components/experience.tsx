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
