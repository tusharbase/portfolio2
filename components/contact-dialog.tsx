"use client"

import { useState } from "react"
import { useForm } from '@formspree/react';
import { Button } from "@/components/ui/button"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const FORMSPREE_ID = "mnndpkll"

export function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Show loading toast
    const toastId = toast.loading("Sending your message...")
    
    try {
      // Submit the form using Formspree's handleSubmit
      const response = await handleSubmit(e as React.FormEvent<HTMLFormElement>)
      
      // If we get here, the submission was successful
      toast.success("Thank you!", {
        id: toastId,
        description: "I'll get back to you soon!",
        duration: 5000,
      })
      
      setFormData({ name: "", email: "", message: "" })
      onOpenChange(false)
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Failed to send message", {
        id: toastId,
        description: "Please try again or contact me directly at tushar.base.eth@gmail.com",
        duration: 5000,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            Have a project in mind or want to discuss potential collaborations? Let's connect.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              disabled={state.submitting}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={state.submitting}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={state.submitting}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={state.submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={state.submitting}>
              {state.submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
