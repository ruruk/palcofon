"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ContactForm from "./contact-form";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the form data to your backend
    // For this example, we'll just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent Successfully",
      description: "Thank you for your message. We'll get back to you soon!",
    });

    setIsSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
    setIsSubmitting(false);

    // Reset success state after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-10">
          <div className="absolute right-0 w-[800px] h-[800px] rounded-full border-[40px] border-primary"></div>
          <div className="absolute right-20 top-20 w-[400px] h-[400px] rounded-full border-[30px] border-primary"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              Have questions about our products or services? Need a custom
              lighting solution? Our team is ready to illuminate your path
              forward.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              >
                Send a Message
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="tel:0676906707"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-primary font-bold border-2 border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <Phone className="h-10 w-10 mb-4 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">Call Us</h3>
                <p className="opacity-80">
                  We're available Monday to Friday, 9am to 5pm
                </p>
              </div>
              <CardContent className="p-6">
                <a
                  href="tel:0676906707"
                  className="block text-lg font-bold hover:text-primary transition-colors"
                >
                  067 690 6707
                </a>
                <a
                  href="tel:0823317877"
                  className="block text-lg font-bold hover:text-primary transition-colors"
                >
                  082 331 7877
                </a>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <Mail className="h-10 w-10 mb-4 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">Email Us</h3>
                <p className="opacity-80">
                  We'll respond to your inquiry within 24 hours
                </p>
              </div>
              <CardContent className="p-6">
                <a
                  href="mailto:info@palcofon.co.za"
                  className="block text-lg font-bold hover:text-primary transition-colors"
                >
                  info@palcofon.co.za
                </a>
                <a
                  href="mailto:joe@palcofon.co.za"
                  className="block text-lg font-bold hover:text-primary transition-colors"
                >
                  joe@palcofon.co.za
                </a>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 rounded-3xl">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                <MapPin className="h-10 w-10 mb-4 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">Visit Us</h3>
                <p className="opacity-80">Our headquarters in Johannesburg</p>
              </div>
              <CardContent className="p-6">
                <p className="text-lg font-bold">Palcofon (Pty) Ltd</p>
                <p className="text-gray-600">Johannesburg, South Africa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div>
              <div className="mb-8">
                <span className="text-primary font-bold uppercase tracking-wider text-sm">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mt-4">
                  Fill out the form below and our team will get back to you as
                  soon as possible.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Business Hours & Map */}
            <div className="space-y-8">
              <Card className="overflow-hidden rounded-3xl border-0 shadow-xl">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                  <Clock className="h-10 w-10 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="font-bold">Monday - Friday</span>
                      <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                        9:00 AM - 5:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="font-bold">Saturday</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                        By Appointment
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Sunday</span>
                      <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full">
                        Closed
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Map+of+Johannesburg"
                  alt="Map location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-bold text-center">
                      Gauteng, South Africa
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-blue-900 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
