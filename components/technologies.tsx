"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Technologies() {
  const techCategories = [
    {
      title: "Blockchain & Web3",
      icon: "⛓️",
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-50 to-purple-50",
      technologies: [
        { name: "Coinbase SDK", icon: "💰", description: "Payment & trading integration" },
        { name: "Base Layer 2", icon: "⚡", description: "Ethereum scaling solutions" },
        { name: "USDC Integration", icon: "💲", description: "Stablecoin payments" },
        { name: "Smart Contracts", icon: "📜", description: "Solidity development" },
      ],
    },
    {
      title: "AI & Machine Learning",
      icon: "🤖",
      color: "from-green-500 to-teal-600",
      bgColor: "from-green-50 to-teal-50",
      technologies: [
        { name: "AI Agents", icon: "🧠", description: "Autonomous AI systems" },
        { name: "Cursor AI", icon: "✨", description: "AI-powered development" },
        { name: "Windsurf", icon: "🏄", description: "AI coding assistant" },
        { name: "v0 by Vercel", icon: "🎯", description: "AI UI generation" },
      ],
    },
    {
      title: "Modern Web Stack",
      icon: "🌐",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
      technologies: [
        { name: "Next.js", icon: "⚛️", description: "React framework" },
        { name: "Vercel", icon: "🚀", description: "Deployment platform" },
        { name: "Supabase", icon: "🗄️", description: "Backend as a service" },
        { name: "TypeScript", icon: "📝", description: "Type-safe development" },
      ],
    },
  ]

  return (
    <section id="tech" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">Technologies</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space">
              Cutting-Edge <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leveraging the latest technologies to build innovative solutions that shape the future
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {techCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="relative">
                {/* Category Header */}
                <div className={`bg-gradient-to-br ${category.bgColor} rounded-3xl p-8 mb-6`}>
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <span className="text-2xl text-white">{category.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <Card key={techIndex} className="tech-card border-0 shadow-md hover:shadow-xl bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">{tech.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">{tech.name}</h4>
                            <p className="text-sm text-gray-600">{tech.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
