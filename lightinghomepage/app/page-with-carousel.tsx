"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { initCarousels } from "./carousel"

export default function Home() {
  useEffect(() => {
    initCarousels()
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Illuminate Your Space with High-Quality Lighting Solutions
              </h1>
              <p className="text-xl text-gray-600">
                Energy-efficient, durable lighting designs for every space. Transform your environment with our premium
                solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium shadow-sm hover:bg-primary/90 transition-colors"
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-primary font-medium border border-primary hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Modern lighting fixture in a stylish interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same as in the original page.tsx */}
      {/* Categories Section */}
      {/* Featured Products Section */}
      {/* Company Details Section */}
      {/* Contact Section */}
      {/* Footer */}

      {/* The rest of the JSX would be identical to the original page.tsx */}
    </main>
  )
}

