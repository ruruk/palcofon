"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, User, Mail, MessageSquare, Send } from "lucide-react";

export default function HomeContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
            source: "Homepage Contact Form",
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
      className="space-y-6 bg-white p-7 rounded-3xl shadow-lg"
    >
      <h3 className="text-2xl font-extrabold text-gray-800 mb-5">Contact Us</h3>

      <div className="space-y-3">
        <label
          htmlFor="home-name"
          className="block text-base font-bold text-gray-700"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-6 w-6 text-blue-500" />
          </div>
          <Input
            id="home-name"
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
          htmlFor="home-email"
          className="block text-base font-bold text-gray-700"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-6 w-6 text-blue-500" />
          </div>
          <Input
            id="home-email"
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
          htmlFor="home-message"
          className="block text-base font-bold text-gray-700"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute top-4 left-4 pointer-events-none">
            <MessageSquare className="h-6 w-6 text-blue-500" />
          </div>
          <Textarea
            id="home-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
            required
            className="pl-12 pt-4 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 font-medium resize-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg py-6 rounded-2xl transition-colors duration-200 flex items-center justify-center h-14 shadow-md hover:shadow-lg"
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
