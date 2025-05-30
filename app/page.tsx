import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Technologies from "@/components/technologies"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
