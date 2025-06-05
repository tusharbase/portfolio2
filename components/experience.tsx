"use client"

import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown, ExternalLink, CheckCircle, Zap, BookOpen, Users, Edit3, Star } from "lucide-react" // Added more icons
import { cn } from "@/lib/utils"

// Interface for company experiences (pre-Jan 2025)
interface CompanyExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  tech: string[];
}

// Interface for project/event timeline (Jan 2025 onwards)
interface ProjectEventItem {
  id: string;
  date: string; // e.g., "Jan 2025", "Feb 15, 2025", "Q1 2025"
  type: "project" | "event" | "milestone" | "learning" | "oss" | "post";
  title: string;
  description: string;
  status?: "Ongoing" | "Completed" | "Published" | "Planned" | "Attended";
  technologies?: string[];
  link?: string;
  linkText?: string;
  isMajor?: boolean; // For highlighting significant items
}

// Existing ExperienceCard for CompanyExperienceItem (mostly unchanged)
// Props are exp, index, isExpanded, toggleExpand
interface ExperienceCardProps {
  exp: CompanyExperienceItem;
  index: number; // Index within its own list
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
        style={{ top: 'calc(2.5rem + 1px)' }} // Align with title consistently
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
                {/* "Current" badge removed as this card is for past roles only */}
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
              isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden", // Increased max-h for more content
            )}
          >
            <div className="pt-4 mt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                  Key Achievements
                </h4>
                {exp.achievements.map((achievement, achIndex) => (
                  <div
                    key={achIndex}
                    className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 group/achievement"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-[7px] flex-shrink-0 group-hover/achievement:scale-125 transition-transform" />
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


// New component for Project/Event items (Jan 2025 onwards)
const ProjectEventCard = ({ item, isLatest }: { item: ProjectEventItem, isLatest: boolean }) => {
  const typeConfig = {
    project: { icon: <Zap className="w-3 h-3" />, color: "blue", name: "Project" },
    event: { icon: <Users className="w-3 h-3" />, color: "purple", name: "Event" },
    milestone: { icon: <Star className="w-3 h-3" />, color: "green", name: "Milestone" },
    learning: { icon: <BookOpen className="w-3 h-3" />, color: "yellow", name: "Learning" },
    oss: { icon: <CheckCircle className="w-3 h-3" />, color: "orange", name: "OSS Contribution" },
    post: { icon: <Edit3 className="w-3 h-3" />, color: "teal", name: "Article/Post" },
  };

  const currentType = typeConfig[item.type] || typeConfig.project;

  const colorClasses = {
    dot: {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      orange: "bg-orange-500",
      teal: "bg-teal-500",
    },
    badge: {
      blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-500/30",
      purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-500/30",
      green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-500/30",
      yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-500/30",
      orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-500/30",
      teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border-teal-500/30",
    },
    borderLeft: { // For isMajor
      blue: "border-l-blue-500",
      purple: "border-l-purple-500",
      green: "border-l-green-500",
      yellow: "border-l-yellow-500",
      orange: "border-l-orange-500",
      teal: "border-l-teal-500",
    }
  };

  return (
    <div className="relative pl-16 mb-10 group">
      <div
        className={cn(
          "absolute left-8 top-7 -translate-y-1/2 w-5 h-5 -translate-x-1/2 rounded-full flex items-center justify-center transition-all duration-300 z-10",
          colorClasses.dot[currentType.color as keyof typeof colorClasses.dot],
          "ring-4 ring-white dark:ring-neutral-900 shadow-md",
          "group-hover:scale-110 group-hover:shadow-lg",
          isLatest && "ring-offset-2 ring-offset-background ring-2 ring-opacity-70 animate-pulse",
          item.isMajor && "w-6 h-6"
        )}
        title={currentType.name}
      >
        <span className="text-white">{currentType.icon}</span>
      </div>

      <div
        className={cn(
          "relative bg-white dark:bg-neutral-800/60 backdrop-blur-md rounded-xl transition-all duration-300",
          "border border-neutral-200/60 dark:border-neutral-700/60",
          "hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]",
          "hover:border-neutral-300/80 dark:hover:border-neutral-600/80",
          "group-hover:-translate-y-1",
          item.isMajor && "border-l-4", 
          item.isMajor && colorClasses.borderLeft[currentType.color as keyof typeof colorClasses.borderLeft]
        )}
      >
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              <Badge variant="outline" className={cn("font-semibold", colorClasses.badge[currentType.color as keyof typeof colorClasses.badge])}>
                {currentType.name}
              </Badge>
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {item.date}
              </span>
              {isLatest && (
                <Badge variant="default" className="bg-pink-500/20 text-pink-700 dark:text-pink-400 border-pink-500/30">
                  Latest
                </Badge>
              )}
            </div>
            {item.status && (
              <Badge variant="secondary"
                     className={cn(
                        item.status === "Completed" || item.status === "Published" || item.status === "Attended" ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30" :
                        item.status === "Ongoing" ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30" :
                        item.status === "Planned" ? "bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30" : ""
                     )}>
                {item.status}
              </Badge>
            )}
          </div>
          
          <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 text-sm">
            {item.description}
          </p>

          {item.technologies && item.technologies.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide mb-2">
                Key Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline" className="font-normal text-xs py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline group/link mt-2"
            >
              {item.linkText || "Learn More"}
              <ExternalLink className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};


export default function Experience() {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.05, // Adjusted threshold
  });

  const [expandedCompanyItems, setExpandedCompanyItems] = useState<number[]>([]); // Start with no items expanded

  const toggleCompanyExpand = (index: number) => {
    setExpandedCompanyItems((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  const projectEventTimeline = [
    // Add your future projects/events here, most recent first.
    // Example:
    {
      id: "pe-ai-writing-beta",
      date: "Feb 2025",
      type: "project" as const,
      title: "AI Writing Assistant - Beta Launch",
      description: "Successfully launched the beta version of an AI writing assistant featuring custom fine-tuned models. Currently gathering user feedback for iterative improvements.",
      status: "Ongoing" as const,
      technologies: ["Python", "PyTorch", "FastAPI", "Next.js", "Supabase", "LangChain"],
      link: "#", // Replace with actual link
      linkText: "Track Progress",
      isMajor: true,
    },
    {
      id: "pe-decidoodle-launch",
      date: "Jan 2025",
      type: "project" as const,
      title: "Decidoodle - AI Decision-Making App Launched",
      description: "Launched Decidoodle, an AI-powered web application to assist users in making complex decisions. Built with Next.js, TypeScript, and Supabase, leveraging OpenAI API for core logic.",
      status: "Completed" as const,
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "OpenAI API", "Vercel"],
      link: "#", // Replace with actual link
      linkText: "Visit Decidoodle",
      isMajor: true,
    }
  ] as const satisfies readonly ProjectEventItem[];

  const sortedProjectEventTimeline = [...projectEventTimeline].sort((a, b) => { // Sort by date, ensuring "Jan 2025" comes before "Feb 2025"
    const dateA = new Date(a.date.includes(" ") ? a.date : `${a.date} 1, ${new Date().getFullYear()}`); // Robust date parsing
    const dateB = new Date(b.date.includes(" ") ? b.date : `${b.date} 1, ${new Date().getFullYear()}`);
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0; // Handle invalid dates gracefully
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section ref={ref} id="experience" className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20">
      <div className="text-center mb-16">
        <h2 className="section-heading mb-4">
          My Journey & Work
        </h2>
        <p className="section-subheading">
          A timeline of my professional experience, projects, and milestones.
        </p>
        <div className="w-20 h-1 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700 -z-10" aria-hidden="true" />

        <div className="mt-8 space-y-2">
          {sortedProjectEventTimeline.map((item, index) => (
            <ProjectEventCard
              key={item.id}
              item={item}
              isLatest={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}