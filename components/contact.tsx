"use client"

import type React from "react"
import { useState } from "react"
import { useForm, ValidationError } from '@formspree/react';
import { Button } from "@/components/ui/button"
import { ContactIllustration } from "@/components/illustrations/contact-illustration"
import { Loader2, CheckCircle } from "lucide-react"

// Formspree form ID - replace with your actual Formspree form ID
const FORMSPREE_ID = "mnndpkll"

export default function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e as React.FormEvent<HTMLFormElement>)
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

          <div className="flex justify-center">
            {/* Contact Form */}
            <div className="w-full max-w-2xl">
              {state.succeeded ? (
                <div className="text-center p-8 bg-card rounded-lg border border-border">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
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
                    disabled={state.submitting}
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
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
                    disabled={state.submitting}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
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
                    disabled={state.submitting}
                  ></textarea>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={state.submitting}
                  >
                    {state.submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                  <ValidationError
                    errors={state.errors}
                    className="text-red-500 text-sm text-center"
                  />
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
