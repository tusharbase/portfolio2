"use client"

import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { TechFlowIllustration } from "@/components/illustrations/tech-flow-illustration"

export default function Technologies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const technologies = [
    {
      category: "Onchain",
      items: [
        { name: "Coinbase SDK", description: "Payment & trading integration" },
        { name: "Base Layer2", description: "Ethereum scaling solutions" },
        { name: "USDC Payments", description: "Digital dollar payments" },
        { name: "Smart Contracts", description: "Solidity development" },
      ],
    },
    {
      category: "AI & ML",
      items: [
        { name: "AI Agents", description: "Autonomous systems development" },
        { name: "Cursor", description: "AI-powered code editor" },
        { name: "AI SDK", description: "AI Integration" },
        { name: "V0", description: "AI UI/UX generation" },
      ],
    },
    {
      category: "Web Development",
      items: [
        { name: "Next.js", description: "React framework" },
        { name: "Vercel", description: "Deployment platform" },
        { name: "Supabase", description: "Backend as a service" },
        { name: "TypeScript", description: "Type-safe JavaScript" },
      ],
    },
  ]

  return (
    <section id="technologies" className="py-20 bg-neutral-100 dark:bg-neutral-900">
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

            {/* Technologies Grid */}
            <div className="tech-grid">
              {technologies.map((tech, categoryIndex) => (
                <Card key={categoryIndex} className="hover-card-effect">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">{tech.category}</h3>
                    <div className="space-y-6">
                      {tech.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <div className="tech-icon mr-4">
                            <span className="text-lg">{itemIndex + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
