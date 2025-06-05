"use client"
import { useInView } from "react-intersection-observer"
import { ProfileIllustration } from "@/components/illustrations/profile-illustration"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    { name: "Onchain Development", level: 60 },
    { name: "AI Integration", level: 80 },
    { name: "Frontend Development", level: 75 },
    { name: "Backend Architecture", level: 70 },
  ]

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Illustration - Takes up more space on larger screens */}
            <div className="lg:col-span-7 xl:col-span-8 relative h-[500px] md:h-[600px] lg:h-[700px] w-full order-2 lg:order-1">
              <div className="absolute inset-0 w-full h-full">
                <ProfileIllustration />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-8 order-1 lg:order-2" ref={ref}>
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  About <span className="gradient-text">Me</span>
                </h2>
                <div className="w-20 h-1.5 mt-6 mb-8 mx-auto lg:mx-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </div>

              <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p className="text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-200">
                  Full-time independent learner and builder. Focusing on building web applications and exploring emerging AI technologies and digital assets.
                </p>

                <p className="text-base md:text-lg">
                  My work spans from developing DeFi protocols on Base Layer 2 to creating AI-powered applications using
                  advanced tools like Cursor, Windsurf, and v0. I believe in writing clean, efficient code that not only
                  works but scales and evolves with changing requirements.
                </p>
              </div>

              {/* Skills */}
              {/* <div className="space-y-6">
                <h3 className="text-xl font-semibold">Core Expertise</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-neutral-500 dark:text-neutral-400">{skill.level}%</span>
                      </div>
                      <div className="progress-bar text-neutral-900 dark:text-neutral-100">
                        <div
                          className="absolute top-0 left-0 h-full bg-current"
                          style={{ width: inView ? `${skill.level}%` : "0%" }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
