"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "10+", label: "Technologies Mastered" },
    { number: "100%", label: "Client Satisfaction" },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <Badge className="mb-6 bg-orange-100 text-orange-700 hover:bg-orange-200">About Me</Badge>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space">
                Passionate About <span className="gradient-text">Innovation</span>
              </h2>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I'm a creative developer who thrives at the intersection of design and technology. With expertise in
                blockchain development, AI integration, and modern web technologies, I create digital experiences that
                push boundaries and solve real-world problems.
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                My journey spans from building DeFi applications on Base Layer 2 to developing AI-powered solutions
                using cutting-edge tools like Cursor, Windsurf, and v0. I believe in creating technology that's not just
                functional, but delightful.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative w-full h-96">
                {/* Background shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-200 blob-shape opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-orange-200 to-pink-200 blob-shape opacity-40"></div>

                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center float-animation">
                  <span className="text-2xl">💡</span>
                </div>

                <div
                  className="absolute top-16 right-16 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center float-animation"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="text-xl">🎨</span>
                </div>

                <div
                  className="absolute bottom-20 right-8 w-18 h-18 bg-white rounded-2xl shadow-lg flex items-center justify-center float-animation"
                  style={{ animationDelay: "2s" }}
                >
                  <span className="text-2xl">⚡</span>
                </div>

                <div
                  className="absolute bottom-8 left-16 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center float-animation"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="text-xl">🚀</span>
                </div>

                {/* Central illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Card className="w-48 h-48 shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-2xl text-white">🧠</span>
                      </div>
                      <h3 className="font-bold text-gray-800 text-center">Creative Problem Solver</h3>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
