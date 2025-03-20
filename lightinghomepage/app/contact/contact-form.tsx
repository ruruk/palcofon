"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Send,
} from "lucide-react";

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://comrobi.com/palcofon/api/send-contact.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            source: "Contact Page Form",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description:
            data.message || "Failed to send your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7 bg-white p-8 rounded-3xl shadow-lg"
    >
      <h2 className="text-3xl font-extrabold text-gray-800 mb-7">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label
            htmlFor="name"
            className="block text-base font-bold text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-6 w-6 text-blue-500" />
            </div>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="pl-12 py-6 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-medium h-14"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="email"
            className="block text-base font-bold text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="pl-12 py-6 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-medium h-14"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="phone"
            className="block text-base font-bold text-gray-700"
          >
            Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-6 w-6 text-blue-500" />
            </div>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="pl-12 py-6 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-medium h-14"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="company"
            className="block text-base font-bold text-gray-700"
          >
            Company
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Building className="h-6 w-6 text-blue-500" />
            </div>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              className="pl-12 py-6 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-medium h-14"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="subject"
          className="block text-base font-bold text-gray-700"
        >
          Subject
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MessageSquare className="h-6 w-6 text-blue-500" />
          </div>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is your message about?"
            className="pl-12 py-6 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-medium h-14"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="message"
          className="block text-base font-bold text-gray-700"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute top-4 left-4 pointer-events-none">
            <MessageSquare className="h-6 w-6 text-blue-500" />
          </div>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={6}
            required
            className="pl-12 pt-4 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-medium resize-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg rounded-2xl transition-colors duration-200 flex items-center justify-center h-14 shadow-md hover:shadow-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-3 h-6 w-6" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
