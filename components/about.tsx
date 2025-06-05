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
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Illustration */}
            <div className="relative h-[400px] illustration-container order-2 lg:order-1">
              <ProfileIllustration />
            </div>

            {/* Content */}
            <div className="space-y-8 order-1 lg:order-2" ref={ref}>
              <div>
                <h2 className="section-heading">
                  About <span className="gradient-text">Me</span>
                </h2>
                <div className="w-20 h-1 mt-4 mb-8 accent-gradient rounded-full"></div>
              </div>

              <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
                <p className="text-lg">
                  Full-time independent learner and builder. Focusing on building web applications and exploring emerging AI technologies and digital assets.
                </p>

                <p>
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
