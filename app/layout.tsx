import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Tushar Mehta | Developer & Tech Innovator",
  description: "Building the future with cutting-edge onchain, AI, and web technologies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          {children}
          <Toaster
            position="bottom-right"
            richColors
            theme="light"
            toastOptions={{
              classNames: {
                toast: 'group border-2 border-border bg-background text-foreground',
                title: 'font-semibold',
                description: 'text-muted-foreground',
                actionButton: 'bg-primary text-primary-foreground hover:bg-primary/90',
                cancelButton: 'bg-muted text-muted-foreground hover:bg-muted/80',
                success: 'border-green-500/20',
                error: 'border-red-500/20',
                loading: 'border-border',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
