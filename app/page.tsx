import Hero from "@/components/hero"
import About from "@/components/about"
import Technologies from "@/components/technologies"
import Projects from "@/components/projects"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Hero />
      <About />
      <Projects />
      <Technologies />
      <Footer />
    </main>
  )
}
