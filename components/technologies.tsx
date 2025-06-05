"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { TechFlowIllustration } from "@/components/illustrations/tech-flow-illustration"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"

// Expanded data structure for each technology
interface TechDetails {
  name: string
  logo: string
  category: "Web Development" | "AI & ML" | "Onchain"
  description: string // Short description for the card
  proficiency: "Expert" | "Advanced" | "Intermediate"
  experience: string // e.g., "2+ Years", "6 Projects"
  details: string // In-depth explanation for the hover card
}

// Data for all technologies
const allLogos: TechDetails[] = [
  // Web Development
  {
    name: "Next.js",
    logo: "/Next.js_wordmark_light.svg",
    category: "Web Development",
    description: "Full-stack React framework",
    proficiency: "Expert",
    experience: "3+ Years",
    details: "My primary framework for building performant, server-rendered, and static web applications. I'm highly experienced with App Router, API routes, server actions, and middleware for complex projects.",
  },
  {
    name: "Vercel",
    logo: "/Vercel_wordmark_light.svg",
    category: "Web Development",
    description: "Deployment & Hosting",
    proficiency: "Expert",
    experience: "All Projects",
    details: "The ideal platform for deploying Next.js applications. I leverage its seamless Git integration, serverless functions, and global CDN to ensure fast, scalable, and reliable deployments.",
  },
  {
    name: "Supabase",
    logo: "/Supabase_wordmark_light.svg",
    category: "Web Development",
    description: "Backend-as-a-Service",
    proficiency: "Advanced",
    experience: "2+ Years",
    details: "My go-to for backend services. I utilize its Postgres database, authentication, storage, and edge functions to rapidly build full-stack applications without managing server infrastructure.",
  },
  {
    name: "AI SDK",
    logo: "/v0_light.svg", // Using v0 logo for AI SDK
    category: "Web Development", // Often used in web dev context
    description: "AI Integration Toolkit",
    proficiency: "Advanced",
    experience: "Multiple Projects",
    details: "Essential for integrating generative AI. I use the AI SDK to build conversational interfaces, stream responses from models like GPT and Gemini, and manage AI state within my React applications.",
  },

  // AI & ML
  {
    name: "v0",
    logo: "/v0_light.svg",
    category: "AI & ML",
    description: "Generative UI Design",
    proficiency: "Advanced",
    experience: "Daily Use",
    details: "My tool of choice for rapidly prototyping and building React UIs with AI. It significantly accelerates the process from idea to functional component, which I then refine and integrate.",
  },
  {
    name: "OpenAI",
    logo: "/OpenAI_wordmark_light.svg",
    category: "AI & ML",
    description: "LLM & API Services",
    proficiency: "Advanced",
    experience: "2+ Years",
    details: "Leveraging GPT-4 and other models for tasks like natural language understanding, text generation, and function calling. Experienced in prompt engineering to get reliable, structured outputs.",
  },
  {
    name: "Gemini",
    logo: "/gemini_wordmark.svg",
    category: "AI & ML",
    description: "Google's AI Model",
    proficiency: "Intermediate",
    experience: "Exploratory Projects",
    details: "Exploring Gemini for its multi-modal capabilities and large context window. I use it for complex reasoning tasks and analyzing diverse data types within my experimental AI projects.",
  },
  {
    name: "Perplexity",
    logo: "/perplexity.png",
    category: "AI & ML",
    description: "AI Research Tool",
    proficiency: "Expert",
    experience: "Daily Use",
    details: "My primary tool for technical research and learning. Perplexity's citation-backed answers are invaluable for quickly understanding new technologies, debugging complex issues, and staying current.",
  },

  // Onchain
  {
    name: "Ethereum",
    logo: "/ethereum.svg",
    category: "Onchain",
    description: "Smart Contract Platform",
    proficiency: "Intermediate",
    experience: "1+ Year",
    details: "Foundational knowledge of the Ethereum ecosystem, including smart contracts, transactions, and the EVM. I focus on interacting with contracts from the frontend and understanding on-chain data.",
  },
  {
    name: "Base",
    logo: "/Base_Symbol_Blue.png",
    category: "Onchain",
    description: "Ethereum L2 Solution",
    proficiency: "Advanced",
    experience: "Primary Chain",
    details: "My preferred Layer 2 for building on-chain applications due to its low fees and strong backing from Coinbase. I have built and deployed several dApps and services on the Base network.",
  },
  {
    name: "USDC",
    logo: "/usdc-logo.png",
    category: "Onchain",
    description: "Digital Dollar Stablecoin",
    proficiency: "Advanced",
    experience: "Payment Integration",
    details: "Integrated USDC as a primary payment method in multiple applications using services like Coinbase Commerce. Experienced in handling on-chain payments and verifying transactions.",
  },
  {
    name: "Coinbase",
    logo: "/Coinbase_Wordmark.png",
    category: "Onchain",
    description: "Crypto Services & APIs",
    proficiency: "Advanced",
    experience: "Multiple Integrations",
    details: "I utilize Coinbase APIs, including Commerce for payments and Wallet SDK for connecting users. This allows me to build user-friendly dApps that bridge the gap between traditional web and on-chain.",
  },
]

// Helper function for proficiency badge styling
const getProficiencyColor = (proficiency: TechDetails["proficiency"]) => {
  switch (proficiency) {
    case "Expert": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Advanced": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }
}

/**
 * LogoCard Component
 * A card representing a single technology, which triggers a HoverCard.
 */
const LogoCard = ({ tech }: { tech: TechDetails }) => (
  <HoverCard openDelay={200} closeDelay={100}>
    <HoverCardTrigger asChild>
      <motion.div
        className="unified-card group h-full p-4 flex flex-col items-center justify-center text-center" // Reduced padding from p-6 to p-4
        whileHover={{ y: -5, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* === THE CHANGE IS HERE === */}
        <div className="relative w-32 h-24 mb-4 dark:invert group-hover:dark:invert-0 transition-all duration-300">
          <Image src={tech.logo} alt={tech.name} fill className="object-contain" />
        </div>
        <h4 className="font-semibold text-foreground">{tech.name}</h4>
        <p className="text-xs text-muted-foreground mt-1">{tech.description}</p>
      </motion.div>
    </HoverCardTrigger>
    
    <HoverCardContent className="w-80" side="top" align="center">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 dark:invert">
            <Image src={tech.logo} alt={tech.name} fill className="object-contain" />
          </div>
          <div>
            <h4 className="text-lg font-bold">{tech.name}</h4>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getProficiencyColor(tech.proficiency)}>
            {tech.proficiency}
          </Badge>
          <Badge variant="secondary">{tech.experience}</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground leading-snug">{tech.details}</p>
      </div>
    </HoverCardContent>
  </HoverCard>
)

/**
 * Technologies Section Component
 * Displays the tech stack, categorized and interactive.
 */
export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories: TechDetails["category"][] = ["Web Development", "AI & ML", "Onchain"]

  return (
    <section id="technologies" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="section-heading">
            My <span className="gradient-text">Toolkit</span>
          </h2>
          <div className="w-20 h-1 rounded-full mx-auto mt-4 mb-6 accent-gradient"></div>
          <p className="section-subheading">
            I use a curated set of modern tools to build robust, scalable, and intelligent applications. Hover over any technology to learn more about my experience.
          </p>
        </div>

        <div ref={ref}>
          {/* Tech Flow Illustration */}
          <div className="h-[200px] mb-20">
            <TechFlowIllustration animate={inView} />
          </div>

          {/* Technologies by Category */}
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-2xl font-bold text-center mb-8 text-foreground/80">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {allLogos
                    .filter((tech) => tech.category === category)
                    .map((tech) => (
                      <LogoCard key={tech.name} tech={tech} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}