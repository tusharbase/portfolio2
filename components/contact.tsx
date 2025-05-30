"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContactIllustration } from "@/components/illustrations/contact-illustration"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Handle form submission
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-20 h-1 mt-4 mb-8 accent-gradient rounded-full mx-auto"></div>
            <p className="section-subheading">
              Have a project in mind or want to discuss potential collaborations? Let's connect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Illustration */}
            <div className="relative h-[400px] illustration-container order-2 lg:order-1">
              <ContactIllustration />
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="contact-form-field w-full"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="contact-form-field w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="contact-form-field w-full"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
