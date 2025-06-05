"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import Image from "next/image"
import { ContactDialog } from "@/components/contact-dialog"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Technologies", href: "#technologies" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md subtle-shadow py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="#home" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-neutral-100 dark:text-neutral-900 font-bold text-lg">
              T
            </div>
            <span className="text-lg font-medium">tushar.base.eth</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-900 dark:bg-neutral-100 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Button 
              variant="default" 
              size="sm"
              className="ml-2"
              onClick={() => setContactOpen(true)}
            >
              Let's Build!
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Mobile: Only show GitHub and X/Twitter */}
            <div className="flex items-center space-x-4 md:hidden">
              <Link href="https://github.com/tusharbase" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com/tusharbase" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" aria-label="X (Twitter)">
                <Image src="/x-logo.png" alt="X (Twitter)" width={20} height={20} className="w-5 h-5" />
              </Link>
              <Link href="mailto:tushar.base.eth@gmail.com" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </Link>
            </div>

            {/* Desktop: Show all icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="https://github.com/tusharbase" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com/tusharbase" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" aria-label="X (Twitter)">
                <Image src="/x-logo.png" alt="X (Twitter)" width={20} height={20} className="w-5 h-5" />
              </Link>
              <Link href="mailto:tushar.base.eth@gmail.com" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </Link>
              <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Removed */}
      </div>
    </header>
  )
}
