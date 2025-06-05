"use client"

import Image from "next/image"
import { motion } from "framer-motion"

// Define the shape of our technology data
interface TechNode {
  name: string
  icon: string | React.ReactNode // Can be an image path or a JSX element (like an emoji)
  isImage: boolean
}

// Data for the technologies to display
const technologies: TechNode[] = [
  { name: "Onchain", icon: "/base-logo.png", isImage: true },
  { name: "AI", icon: "🧠", isImage: false },
  { name: "Web", icon: "🌐", isImage: false },
  { name: "USDC", icon: "/usd-logo.svg", isImage: true },
  { name: "Cursor", icon: "/cursor-logo.svg", isImage: true },
]

// Framer Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const nodeVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

const dotVariants = {
  initial: {
    x: 0,
    opacity: 1,
  },
  animate: (direction: "left" | "right") => ({
    x: direction === "right" ? 50 : -50, // Increased travel distance
    opacity: 0,
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    },
  }),
}

/**
 * A single animated dot representing data flow.
 */
const FlowingDot = ({ delay, direction }: { delay: number; direction: "left" | "right" }) => (
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
    variants={dotVariants}
    initial="initial"
    animate="animate"
    custom={direction}
    transition={{ ...dotVariants.animate(direction).transition, delay }}
  />
)

export function TechFlowIllustration({ animate = false }: { animate?: boolean }) {
  return (
    <motion.div
      className="relative w-full h-32 flex justify-between items-center px-4 md:px-8"
      variants={containerVariants}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
    >
      {/* Central Connector Line */}
      <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-border -translate-y-1/2" />

      {/* Technology Nodes */}
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          variants={nodeVariants}
          className="relative z-10 flex flex-col items-center gap-4" // Increased gap for better spacing
        >
          {/* 
            Icon Container: This div defines the space the icon will occupy.
            It's transparent but sets the dimensions for the icon inside.
          */}
          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
            {tech.isImage ? (
              // For image-based icons
              <div className="relative w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert dark:hover:invert-0">
                <Image
                  src={tech.icon as string}
                  alt={`${tech.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              // For emoji/text-based icons
              <span className="text-5xl md:text-6xl transition-transform duration-300 hover:scale-110">
                {tech.icon}
              </span>
            )}
          </div>
          
          {/* Label */}
          <span className="text-xs font-medium text-muted-foreground">{tech.name}</span>
          
          {/* Animated Flowing Dots */}
          {animate && (
            <>
              <FlowingDot delay={0.5} direction="right" />
              <FlowingDot delay={1.5} direction="right" />
              <FlowingDot delay={1} direction="left" />
              <FlowingDot delay={2} direction="left" />
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}