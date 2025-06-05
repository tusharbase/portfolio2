"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { TechFlowIllustration } from "@/components/illustrations/tech-flow-illustration"

interface TechLogo {
  name: string
  logoLight: string
  category: string
  description: string
}

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { resolvedTheme } = useTheme()

  const allLogos: TechLogo[] = [
    // Web Development
    { 
      name: "Next.js", 
      logoLight: "/Next.js_wordmark_light.svg", 
      category: "Web Development",
      description: "React framework" 
    },
    { 
      name: "Vercel", 
      logoLight: "/Vercel_wordmark_light.svg", 
      category: "Web Development",
      description: "Deployment platform" 
    },
    { 
      name: "Supabase", 
      logoLight: "/Supabase_wordmark_light.svg", 
      category: "Web Development",
      description: "Database & auth" 
    },
    { 
      name: "Tailwind", 
      logoLight: "/Tailwind CSS_wordmark_light.svg", 
      category: "Web Development",
      description: "Utility-first CSS" 
    },
    
    // AI & ML
    { 
      name: "V0", 
      logoLight: "/v0_light.svg", 
      category: "AI & ML",
      description: "AI UI/UX generation" 
    },
    { 
      name: "OpenAI", 
      logoLight: "/OpenAI_wordmark_light.svg", 
      category: "AI & ML",
      description: "AI models & APIs" 
    },
    { 
      name: "Gemini", 
      logoLight: "/gemini_wordmark.svg", 
      category: "AI & ML",
      description: "Google's AI models" 
    },
    { 
      name: "Grok", 
      logoLight: "/Grok_wordmark_light.svg", 
      category: "AI & ML",
      description: "AI assistant" 
    },
    
    // Onchain
    { 
      name: "Ethereum", 
      logoLight: "/ethereum_light.svg", 
      category: "Onchain",
      description: "Smart contracts" 
    },
    { 
      name: "Base", 
      logoLight: "/base_light.svg", 
      category: "Onchain",
      description: "Ethereum L2" 
    },
    { 
      name: "USDC", 
      logoLight: "/usdc_light.svg", 
      category: "Onchain",
      description: "Digital dollar" 
    },
    { 
      name: "Coinbase", 
      logoLight: "/coinbase_light.svg", 
      category: "Onchain",
      description: "Crypto services" 
    },
  ]

  const categories = ["Web Development", "AI & ML", "Onchain"]

  const getLogoPath = (tech: TechLogo) => {
    if (!tech) return "/placeholder.svg"
    return tech.logoLight
  }

  const LogoCard = ({ tech }: { tech: TechLogo }) => (
    <motion.div
      className="flex flex-col items-center p-6 rounded-lg hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors h-full"
      whileHover={{ y: -4, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative w-32 h-20 flex items-center justify-center mb-3">
        <Image
          src={getLogoPath(tech)}
          alt={tech.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 128px, 160px"
        />
      </div>
      <p className="text-sm text-center text-neutral-600 dark:text-neutral-400 mt-1">
        {tech.description}
      </p>
    </motion.div>
  )

  return (
    <section id="technologies" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Technology <span className="gradient-text">Stack</span>
            </h2>
            <div className="w-20 h-1 mt-4 mb-8 accent-gradient rounded-full mx-auto"></div>
            <p className="section-subheading">
              Leveraging cutting-edge technologies to build innovative solutions for tomorrow's challenges
            </p>
          </div>

          <div className="relative" ref={ref}>
            {/* Tech Flow Illustration */}
            <div className="h-[200px] mb-16 illustration-container">
              <TechFlowIllustration animate={inView} />
            </div>

            {/* Technologies by Category */}
            <div className="space-y-16">
              {categories.map((category) => (
                <div key={category} className="space-y-8">
                  <h3 className="text-2xl font-bold text-center">{category}</h3>
                  <Card className="overflow-hidden bg-transparent border border-neutral-200/50 dark:border-neutral-800/50">
                    <CardContent className="p-6 bg-transparent">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {allLogos
                          .filter(tech => tech.category === category)
                          .map((tech, index) => (
                            <LogoCard key={`${category}-${index}`} tech={tech} />
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
