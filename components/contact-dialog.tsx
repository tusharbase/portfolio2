"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// 1. Define the validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 2. Set up the form with react-hook-form and Zod
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  // 3. Handle form submission
  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong.')
      }
      
      // On success, show the success message inside the dialog
      setShowSuccess(true)
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Custom close handler to reset form state
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form and success state on close
      setTimeout(() => {
        form.reset();
        setShowSuccess(false);
      }, 300); // Delay to allow animation
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Get in Touch</DialogTitle>
              <DialogDescription>
                Have a project in mind or want to discuss potential collaborations? Let's connect.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project or idea..."
                          rows={5}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? (
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
            </Form>
          </>
        ) : (
          // 4. Success State UI
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <DialogHeader>
              <DialogTitle className="text-2xl">Message Sent!</DialogTitle>
              <DialogDescription>
                Thank you for reaching out. I'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => handleClose(false)} className="w-full sm:w-auto">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}