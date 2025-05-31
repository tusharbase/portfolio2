"use client"

import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  tech: string[];
}

interface ExperienceCardProps {
  exp: ExperienceItem;
  index: number;
  isExpanded: boolean;
  toggleExpand: (index: number) => void;
}

const ExperienceCard = ({ exp, index, isExpanded, toggleExpand }: ExperienceCardProps) => {
  return (
    <div
      key={index}
      className={cn(
        "relative pl-16 mb-8 group transition-all duration-500",
        isExpanded ? "mb-12" : "mb-8",
      )}
    >
      <div
        className={cn(
          "absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 -translate-x-1/2 rounded-full transition-all duration-300 cursor-pointer z-10",
          "bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-500 dark:to-neutral-300",
          "ring-4 ring-white dark:ring-neutral-900 shadow-lg",
          "group-hover:scale-125 group-hover:shadow-xl",
          isExpanded && "scale-125 bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl",
        )}
        onClick={() => toggleExpand(index)}
        style={{ top: '50%' }}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300",
            "group-hover:opacity-20",
            isExpanded && "opacity-30",
          )}
        />
      </div>

      <div
        className={cn(
          "relative bg-white dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl transition-all duration-500 cursor-pointer overflow-hidden",
          "border border-neutral-200/50 dark:border-neutral-700/50",
          "hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
          "hover:border-neutral-300/70 dark:hover:border-neutral-600/70",
          "group-hover:-translate-y-1",
          isExpanded && "shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-neutral-300/70 dark:border-neutral-600/70",
        )}
        onClick={() => toggleExpand(index)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative p-6">
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
              <div className="text-neutral-600 dark:text-neutral-300 font-semibold">
                {exp.company}
              </div>
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

          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            {exp.description}
          </p>

          <div
            className={cn(
              "transition-all duration-500 ease-out",
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
            )}
          >
            <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50">
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                  Key Achievements
                </h4>
                {exp.achievements.map((achievement, achIndex) => (
                  <div
                    key={achIndex}
                    className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 group/achievement"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0 group-hover/achievement:scale-125 transition-transform" />
                    <span className="leading-relaxed">{achievement}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, techIndex) => (
                  <div 
                    key={techIndex}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedItems, setExpandedItems] = useState<number[]>([0]);

  const toggleExpand = (index: number) => {
    setExpandedItems((current: number[]) => 
      current.includes(index) 
        ? current.filter((i: number) => i !== index) 
        : [...current, index]
    );
  };

  const experiences: ExperienceItem[] = [
    {
      period: "Jan 2025 - Present",
      role: "Independent Developer & Entrepreneur",
      company: "Personal Projects",
      description: "Transitioning to full-time independent development, focusing on building innovative web applications and exploring new technologies.",
      achievements: [
        "Launched Decidoodle - An AI-powered decision-making web app (Next.js, TypeScript, Supabase)",
        "Building an AI writing assistant with custom fine-tuned models (Python, PyTorch, FastAPI)",
        "Developing a productivity toolkit for developers with browser extensions (Chrome Extensions API, React)",
        "Contributing to open-source projects and sharing knowledge through technical writing"
      ],
      tech: ["Next.js", "TypeScript", "Python", "AI/ML", "Supabase", "Tailwind CSS", "FastAPI"],
    },
    {
      period: "Oct 2016 - Jan 2025",
      role: "Senior Solution Engineer",
      company: "Edgio",
      description: "Played a key role in bridging the gap between technical solutions and customer needs in the CDN and security space.",
      achievements: [
        "Led technical presentations and demos for enterprise clients, translating complex solutions into business value",
        "Collaborated with sales teams to understand and address customer requirements",
        "Conducted successful product trials and ensured customer success",
      ],
      tech: ["CDN", "Cloud Security", "Pre-sales", "Technical Consulting"],
    },
    {
      period: "Oct 2016 - Jan 2025",
      role: "Advanced Services Engineer",
      company: "Limelight Networks (Edgio)",
      description: "Provided technical expertise in content delivery and security solutions, ensuring optimal performance for clients.",
      achievements: [
        "Executed successful proof of concepts for enterprise clients",
        "Resolved complex technical issues in production environments",
        "Contributed to the evolution of CDN and security solutions",
      ],
      tech: ["Networking", "Troubleshooting", "POC Execution", "System Architecture"],
    },
    {
      period: "2007 - 2016",
      role: "Software Engineering Roles",
      company: "Various Companies",
      description: "Built a strong foundation in software engineering across embedded systems, Linux kernel development, and system programming.",
      achievements: [
        "Developed Linux system software and device drivers",
        "Led technical projects and mentored junior engineers",
        "Gained deep expertise in low-level programming and system architecture",
      ],
      tech: ["C/C++", "Linux Kernel", "Embedded Systems", "System Architecture"],
    },
  ];

  return (
    <section ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Building Experience
        </h2>
        <div className="w-20 h-1 mt-4 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" aria-hidden="true" />

        <div className="mt-8">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              isExpanded={expandedItems.includes(index)}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
