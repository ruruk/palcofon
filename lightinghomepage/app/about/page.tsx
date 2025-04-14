import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Lightbulb,
  GraduationCap,
  Globe,
  Sprout,
  Award,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Heart,
  Leaf,
  ArrowRight,
  Calendar,
  Droplets,
  SunIcon as SolarIcon,
  Banknote,
  Landmark,
  HardHat,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full border-[40px] border-primary/10"></div>
        <div className="absolute -left-20 -bottom-40 w-[400px] h-[400px] rounded-full border-[30px] border-primary/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
              About <span className="text-primary">Palcofon</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              Established in 2011, Palcofon is a 100% Black-owned company with
              B-BBEE Level 1 status, dedicated to providing energy-efficient
              lighting solutions across Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              >
                Explore Our Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-primary font-bold border-2 border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                Our Story
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Palcofon (Pty) Ltd was established in 2011 and since 2018,
                  we've focused on energy efficiency. As a 100% Black-owned
                  company with B-BBEE Level 1 status, we're proud of our diverse
                  ownership: 35% Women, 40% Male youth, and 25% Black.
                </p>

                <p className="text-gray-700 text-lg">
                  We're fully South African owned and rapidly expanding, with
                  partnerships extending our reach across Africa. Our mission to
                  provide maximum energy efficiency products was born from the
                  unavoidable and continuous increase in energy costs.
                </p>

                <p className="text-gray-700 text-lg">
                  We recognized that consumers often lack control over rising
                  energy prices and have limited product knowledge. Our research
                  showed that many end users are unaware of solutions to combat
                  ever-rising electricity costs.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/HomeImages/palcofon15.jpeg"
                  alt="Palcofon team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Established</p>
                    <p className="text-xl font-bold">Since 2011</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Company Timeline
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              From our founding to our current expansion across Africa, we've
              been committed to providing energy-efficient lighting solutions.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 z-0"></div>

            <div className="relative z-10">
              {/* 2011 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-3xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      2011
                    </h3>
                    <p className="text-gray-700">
                      Palcofon (Pty) Ltd was established
                    </p>
                  </div>
                </div>
                <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>

              {/* 2018 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-3xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      2018
                    </h3>
                    <p className="text-gray-700">
                      Shifted focus to energy efficiency solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* 2020 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-3xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      2020
                    </h3>
                    <p className="text-gray-700">
                      Achieved B-BBEE Level 1 status
                    </p>
                  </div>
                </div>
                <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>

              {/* Present */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-3xl shadow-lg inline-block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Present
                    </h3>
                    <p className="text-gray-700">
                      Expanding across Africa through strategic partnerships
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Our Services
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              We provide comprehensive energy solutions designed to reduce costs
              and environmental impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Lights */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Lightbulb className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lights</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    High-efficiency lighting solutions for residential,
                    commercial, and industrial use.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Reduce energy consumption and operational costs.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Integrated with smart control systems for automation and
                    maximum energy savings.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center text-primary font-bold hover:underline"
                >
                  Explore Lighting Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Solar Geysers */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Droplets className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Solar Geysers</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Solar water heating systems using sunlight to heat water.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Equipped with electric backup for consistent hot water.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Saves up to 80% on water heating energy costs depending on
                    usage.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Offers long-term ROI and payback periods of less than 2
                    years.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary font-bold hover:underline"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Solar Plants */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <SolarIcon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Solar Plants</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Project finance and acquisition options for large-scale
                    solar plant development.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Investor sourcing, site feasibility, licensing, and EPCM
                    management.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Ideal for utility-scale or commercial solar farms with
                    secured offtake agreements.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary font-bold hover:underline"
                >
                  Request Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Our Advantages
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Palcofon is committed to providing energy-efficient lighting
              solutions with a focus on quality, sustainability, and customer
              satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Diverse Ownership</h3>
              <p className="text-gray-600">
                100% Black-owned with B-BBEE Level 1 status: 35% Women, 40% Male
                youth, and 25% Black ownership.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Lightbulb className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Energy Efficiency</h3>
              <p className="text-gray-600">
                Focused on providing maximum energy efficiency products since
                2018, helping combat rising electricity costs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Consumer Education</h3>
              <p className="text-gray-600">
                Committed to educating consumers about energy-efficient
                solutions and product knowledge.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Globe className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">African Expansion</h3>
              <p className="text-gray-600">
                Extending our reach across Africa through partnerships with
                local citizens, driving sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Finance Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Financing Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Project Finance Options
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              We offer flexible financing solutions to make energy efficiency
              accessible for projects of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Risk-Free Solar Power */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Banknote className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Risk-Free Solar Power</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Zero upfront cost, no capital outlay
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Substitutes expensive grid with affordable solar power
                    (provides electricity below utility tariffs)
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    We carry all risks; pay only for what you use
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    No operating and maintenance costs for the duration of the
                    contract
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Simplified contract terms between 4 and 14 years
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Client owns the solar system after contract ends
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary font-bold hover:underline"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Project & Acquisition Finance */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Landmark className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Project & Acquisition Finance
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Sourcing of asset finance/investors for large projects in
                    Africa and abroad
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Identifying areas with development needs and structuring
                    improvement processes
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Acquisition finance for existing operational businesses
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Start-up financing with secured offtake agreements
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Complete project funding with hybrid finance options
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Equity options available (subject to due diligence)
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary font-bold hover:underline"
                >
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Expertise */}
          <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4">
                <HardHat className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">
                In-Depth Technical Expertise
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto mt-2">
                Our team provides comprehensive technical support throughout
                your project lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Site selection and feasibility reviews
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Scoping, pre-feasibility, and feasibility studies
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Technology assessment and selection
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Environmental & Social Impact Assessments (ESIA)
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Regulatory compliance, licensing, and permitting
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Engineering, Procurement, and Construction (EPC)
                    specification
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Development of Division of Responsibilities (DoR)
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Contract negotiations and management
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Carbon credits and tax incentive optimization
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Master plan development aligned with national priorities
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Construction oversight, plant testing, and commissioning
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Staff training and ongoing support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Finance Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/HomeImages/palcofon_5.JPG"
                  alt="Sustainable development"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-8">
                    <div className="flex gap-3 mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full bg-white opacity-60"
                        ></div>
                      ))}
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      UN Sustainable Development Goals
                    </h3>
                    <p className="text-white/80">
                      Our vision and values are embedded in the UN SDGs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                Making A Difference
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                Asset Finance
              </h2>

              <p className="text-gray-700 text-lg mb-6">
                Our asset finance initiative was born from the need to address
                challenges in developing countries, including:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-xl mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-700">Limited access to funding</p>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-xl mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-700">Food security challenges</p>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-xl mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-700">Poverty in Africa</p>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-xl mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-700">
                    Lack of healthy living conditions in parts of Africa
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-lg">
                Palcofon's values and vision are deeply rooted in the UN
                Sustainable Development Goals, driving our commitment to making
                a positive impact across the continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Our Core Values
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              These principles guide our decisions and shape our approach to
              business and community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl text-white shadow-xl">
              <div className="bg-white/20 p-4 rounded-2xl inline-block mb-6 backdrop-blur-sm">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Integrity</h3>
              <p className="text-white/90">
                We conduct our business with honesty, transparency, and ethical
                standards that build trust with our customers and partners.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-3xl text-white shadow-xl">
              <div className="bg-white/20 p-4 rounded-2xl inline-block mb-6 backdrop-blur-sm">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-white/90">
                We continuously seek new and better ways to provide
                energy-efficient solutions that meet the evolving needs of our
                customers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-3xl text-white shadow-xl">
              <div className="bg-white/20 p-4 rounded-2xl inline-block mb-6 backdrop-blur-sm">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-white/90">
                We are committed to making a positive impact in the communities
                we serve, contributing to their growth and development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UN SDG Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Global Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
              Aligned with UN Sustainable Development Goals
            </h2>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="bg-primary/10 p-6 rounded-full">
                  <Sprout className="h-24 w-24 text-primary" />
                </div>

                <div className="text-left">
                  <p className="text-xl text-gray-700 mb-6">
                    Our vision and values are embedded in the UN Sustainable
                    Development Goals, guiding our efforts towards a better
                    future for Africa and beyond. We're particularly focused on:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-xl mr-3 mt-1">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Affordable and Clean Energy</p>
                        <p className="text-gray-600 text-sm">SDG 7</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-xl mr-3 mt-1">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">
                          Industry, Innovation and Infrastructure
                        </p>
                        <p className="text-gray-600 text-sm">SDG 9</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-xl mr-3 mt-1">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Reduced Inequalities</p>
                        <p className="text-gray-600 text-sm">SDG 10</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-xl mr-3 mt-1">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Climate Action</p>
                        <p className="text-gray-600 text-sm">SDG 13</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join us in our mission to provide energy-efficient lighting
            solutions across Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-primary font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-transparent text-white font-bold border-2 border-white hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
