"use client"
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Illustration - Takes up more space on larger screens */}
            <div className="lg:col-span-7 xl:col-span-8 relative h-[600px] md:h-[750px] lg:h-[1215px] w-full order-2 lg:order-1">
              <div className="absolute inset-0 w-full h-full">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent border-8 border-transparent [mask:linear-gradient(white,white),linear-gradient(white,white)] [mask-composite:xor] [mask-clip:content-box,border-box] [mask-repeat:no-repeat] [mask-position:center] [mask-size:100%_100%]">
                    <Image 
                    src="/profile.png" 
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-8 order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  About <span className="gradient-text">Me</span>
                </h2>
                <div className="w-20 h-1.5 mt-6 mb-8 mx-auto lg:mx-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </div>

              <div className="space-y-8">
                <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                  Full-time independent learner and builder. Focusing on building web applications and exploring emerging AI technologies and digital assets.
                </p>

                <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                  I help clients bring their ideas to life by building robust solutions and boosting their productivity through seamless AI integration. My focus is on delivering efficient, scalable code that evolves with your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
