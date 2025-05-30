"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { FloatingElements } from "@/components/floating-elements"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50"
    >
      <FloatingElements />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-8 wiggle">
            <Sparkles className="w-4 h-4 mr-2" />
            Building the Future with AI & Blockchain
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-space">
            Creative <span className="gradient-text">Developer</span>
            <br />& Tech Innovator
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Crafting cutting-edge digital experiences with{" "}
            <span className="font-semibold text-purple-600">Coinbase</span>,{" "}
            <span className="font-semibold text-blue-600">Base Layer 2</span>, and{" "}
            <span className="font-semibold text-green-600">AI technologies</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-lg px-8 py-4 rounded-full"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-full border-2 hover:bg-gray-50">
              Download Resume
            </Button>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              {/* Main illustration container */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 blob-shape opacity-20"></div>

              {/* Tech icons floating around */}
              <div className="absolute top-10 left-10 w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center float-animation">
                <span className="text-2xl">⚡</span>
              </div>

              <div
                className="absolute top-20 right-8 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center float-animation"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-xl">🚀</span>
              </div>

              <div
                className="absolute bottom-16 left-8 w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center float-animation"
                style={{ animationDelay: "2s" }}
              >
                <span className="text-xl">🤖</span>
              </div>

              <div
                className="absolute bottom-10 right-12 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center float-animation"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="text-2xl">💎</span>
              </div>

              {/* Central element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-4xl text-white">👨‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
