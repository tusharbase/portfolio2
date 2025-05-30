"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "DeFi Trading Platform",
      description:
        "A comprehensive trading platform built on Base Layer 2 with Coinbase integration for seamless cryptocurrency trading and portfolio management.",
      icon: "💎",
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-50 to-purple-50",
      tags: ["Base L2", "Coinbase API", "Next.js", "TypeScript"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "AI-Powered Analytics",
      description:
        "Advanced analytics dashboard using AI agents to provide real-time insights and predictive analysis for USDC transactions and market trends.",
      icon: "🧠",
      color: "from-green-500 to-teal-600",
      bgColor: "from-green-50 to-teal-50",
      tags: ["AI Agents", "USDC", "Supabase", "Python"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Smart Contract Suite",
      description:
        "A collection of optimized smart contracts for DeFi protocols, featuring automated yield farming and liquidity management on Base network.",
      icon: "⚡",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
      tags: ["Solidity", "Base", "DeFi", "Web3"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "AI Code Assistant",
      description:
        "An intelligent coding assistant built with Cursor and Windsurf integration, helping developers write better code with AI-powered suggestions.",
      icon: "🤖",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      tags: ["Cursor", "Windsurf", "AI", "VSCode"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">Featured Work</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space">
              Innovative <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing cutting-edge solutions that blend creativity with advanced technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="project-card border-0 shadow-lg hover:shadow-2xl bg-white overflow-hidden">
                <CardContent className="p-0">
                  {/* Project Header */}
                  <div className={`bg-gradient-to-br ${project.bgColor} p-8 relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                      >
                        <span className="text-2xl text-white">{project.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 right-8 w-12 h-12 bg-white/30 rounded-full opacity-60"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2 hover:bg-gray-50">
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
