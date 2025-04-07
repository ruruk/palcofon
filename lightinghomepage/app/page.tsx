"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Eye,
  ShoppingCart,
  Users,
  Lightbulb,
  Globe,
  Warehouse,
  Shield,
  FlashlightIcon as FloodLight,
  Cylinder,
  LightbulbIcon as StreetLight,
  LineChart,
  Tent,
  PanelTop,
  CircleDot,
  Zap,
  ArrowDownToLine,
  Plug,
  Sun,
  Leaf,
  BlocksIcon as Strips,
  Star,
  BadgeCheck,
  Sparkles,
  Clock,
  Award,
  TrendingUp,
  Droplets,
  SunIcon as SolarIcon,
  CheckCircle,
  Banknote,
  Building2,
  Landmark,
} from "lucide-react";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import applicationsData from "@/data/applications.json";
import type { JSX } from "react";
import HomeContactForm from "./components/home-contact-form";

export default function Home() {
  const router = useRouter();
  const [categoryPosition, setCategoryPosition] = useState(0);
  const [productPosition, setProductPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const productsCarouselRef = useRef<HTMLDivElement>(null);

  // Hero carousel state
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      title: "Illuminate Your Space with High-Quality Lighting Solutions",
      description:
        "Energy-efficient, durable lighting designs for every space. Transform your environment with our premium solutions.",
      image: "/HomeImages/palcofon_5.JPG",
      alt: "Modern lighting fixture in a stylish interior",
      primaryButton: { text: "View Products", link: "/products" },
      secondaryButton: { text: "Contact Us", link: "/contact" },
    },
    {
      title: "Energy Efficient LED Solutions for Every Application",
      description:
        "Reduce your energy costs and carbon footprint with our range of sustainable lighting products.",
      image: "/HomeImages/palcofon_4.JPG",
      alt: "Energy efficient LED lighting installation",
      primaryButton: {
        text: "Explore LED Range",
        link: "/products?category=cat10",
      },
      secondaryButton: { text: "Learn More", link: "/about" },
    },
    {
      title: "Commercial & Industrial Lighting Specialists",
      description:
        "From warehouses to offices, we provide tailored lighting solutions for businesses of all sizes.",
      image: "/HomeImages/palcofon_7.JPG",
      alt: "Commercial lighting installation in an office space",
      primaryButton: { text: "Commercial Solutions", link: "/applications" },
      secondaryButton: { text: "Request Quote", link: "/contact" },
    },
  ];

  // Touch handling for swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const heroCarouselRef = useRef<HTMLDivElement>(null);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Hero carousel navigation
  const nextHeroSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevHeroSlide = useCallback(() => {
    setCurrentHeroSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, [heroSlides.length]);

  const goToHeroSlide = useCallback((index: number) => {
    setCurrentHeroSlide(index);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCategories = isMobile ? 2 : 3;
  const maxCategoryPosition = Math.max(
    0,
    categoriesData.length - visibleCategories
  );

  const nextCategory = () => {
    setCategoryPosition((prev) => Math.min(maxCategoryPosition, prev + 1));
  };

  const prevCategory = () => {
    setCategoryPosition((prev) => Math.max(0, prev - 1));
  };

  const visibleProducts = isMobile ? 1 : 3;
  const maxProductPosition = Math.max(0, productsData.length - visibleProducts);

  const nextProduct = () => {
    setProductPosition((prev) => Math.min(maxProductPosition, prev + 1));
  };

  const prevProduct = () => {
    setProductPosition((prev) => Math.max(0, prev - 1));
  };

  // Navigate to products page with category filter
  const navigateToCategory = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
  };

  // Map category IDs to appropriate icons
  const getCategoryIcon = (categoryId: string) => {
    const iconMap: Record<string, JSX.Element> = {
      cat1: <Warehouse className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat2: <Shield className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat3: <FloodLight className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat4: <Cylinder className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat5: <StreetLight className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat6: <LineChart className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat7: <Tent className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat8: <PanelTop className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat9: <CircleDot className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat10: <Zap className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat11: <ArrowDownToLine className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat12: <Plug className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat13: <Sun className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat14: <Leaf className="h-10 w-10 sm:h-12 sm:w-12" />,
      cat15: <Strips className="h-10 w-10 sm:h-12 sm:w-12" />,
    };

    return (
      iconMap[categoryId] || <Lightbulb className="h-10 w-10 sm:h-12 sm:w-12" />
    );
  };

  // Handle swipe
  const handleSwipe = useCallback(
    (
      startX: number,
      endX: number,
      callback: (direction: "left" | "right") => void
    ) => {
      const minSwipeDistance = 50; // Minimum distance required for a swipe
      const swipeDistance = startX - endX;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped left
          callback("left");
        } else {
          // Swiped right
          callback("right");
        }
      }
    },
    []
  );

  // Swipe handlers for different carousels
  const handleHeroSwipe = useCallback(
    (direction: "left" | "right") => {
      if (direction === "left") {
        nextHeroSlide();
      } else {
        prevHeroSlide();
      }
    },
    [nextHeroSlide, prevHeroSlide]
  );

  const handleCategorySwipe = useCallback(
    (direction: "left" | "right") => {
      if (direction === "left") {
        nextCategory();
      } else {
        prevCategory();
      }
    },
    [nextCategory, prevCategory]
  );

  const handleProductSwipe = useCallback((direction: "left" | "right") => {
    if (direction === "left") {
      nextProduct();
    } else {
      prevProduct();
    }
  }, []);

  // Calculate item width based on containerer width and visible items
  useEffect(() => {
    const updateCarouselItems = () => {
      if (!carouselRef.current) return;

      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = containerWidth / visibleCategories;

      const items = carouselRef.current.querySelectorAll(".category-item");
      items.forEach((item) => {
        (item as HTMLElement).style.width = `${itemWidth}px`;
      });
    };

    const updateProductItems = () => {
      if (!productsCarouselRef.current) return;

      const containerWidth = productsCarouselRef.current.offsetWidth;
      const itemWidth = containerWidth / visibleProducts;

      const items =
        productsCarouselRef.current.querySelectorAll(".product-item");
      items.forEach((item) => {
        (item as HTMLElement).style.width = `${itemWidth}px`;
      });
    };

    updateCarouselItems();
    updateProductItems();
    window.addEventListener("resize", () => {
      updateCarouselItems();
      updateProductItems();
    });

    return () =>
      window.removeEventListener("resize", () => {
        updateCarouselItems();
        updateProductItems();
      });
  }, [visibleCategories, visibleProducts]);

  return (
    <main className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="bg-white relative">
        <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl mx-4 my-4 shadow-xl">
          {/* Slides */}
          <div
            ref={heroCarouselRef}
            className="flex transition-transform duration-500 h-full"
            style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
            onTouchStart={(e) => {
              setTouchStart(e.targetTouches[0].clientX);
              setIsSwiping(true);
            }}
            onTouchMove={(e) => {
              if (isSwiping) {
                setTouchEnd(e.targetTouches[0].clientX);
              }
            }}
            onTouchEnd={() => {
              if (isSwiping) {
                handleSwipe(touchStart, touchEnd, handleHeroSwipe);
                setIsSwiping(false);
              }
            }}
          >
            {heroSlides.map((slide, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
                  <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-xl text-white space-y-6">
                      <h1 className="text-2xl md:text-3xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-md opacity-90 font-medium">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href={slide.primaryButton.link}
                          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                        >
                          {slide.primaryButton.text}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                          href={slide.secondaryButton.link}
                          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                        >
                          {slide.secondaryButton.text}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop */}
          <button
            onClick={prevHeroSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10 shadow-lg hidden md:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextHeroSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10 shadow-lg hidden md:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToHeroSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentHeroSlide === index
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentHeroSlide === index ? "true" : "false"}
              />
            ))}
          </div>
          {/* Swipe indicator - only visible on mobile */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white text-xs opacity-70 md:hidden">
            <span>← Swipe →</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Our Services
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Comprehensive energy-efficient solutions for residential,
              commercial, and industrial applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                Explore Our Range
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                Shop by Category
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prevCategory}
                disabled={categoryPosition === 0}
                className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextCategory}
                disabled={categoryPosition === maxCategoryPosition}
                className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform:
                  categoryPosition > 0
                    ? `translateX(calc(-${
                        (categoryPosition * 100) / visibleCategories
                      }%))`
                    : "translateX(0)",
              }}
              onTouchStart={(e) => {
                setTouchStart(e.targetTouches[0].clientX);
                setIsSwiping(true);
              }}
              onTouchMove={(e) => {
                if (isSwiping) {
                  setTouchEnd(e.targetTouches[0].clientX);
                }
              }}
              onTouchEnd={() => {
                if (isSwiping) {
                  handleSwipe(touchStart, touchEnd, handleCategorySwipe);
                  setIsSwiping(false);
                }
              }}
            >
              {categoriesData.map((category, index) => {
                // Generate a unique but consistent gradient for each category
                const gradientIndex = index % 5; // Use modulo to cycle through 5 gradient options
                const gradients = [
                  "bg-gradient-to-br from-blue-500 to-indigo-700",
                  "bg-gradient-to-br from-emerald-500 to-teal-700",
                  "bg-gradient-to-br from-purple-500 to-violet-700",
                  "bg-gradient-to-br from-rose-500 to-pink-700",
                  "bg-gradient-to-br from-amber-500 to-orange-700",
                ];

                return (
                  <div
                    key={category.id}
                    className="category-item px-3 sm:px-4 flex-shrink-0"
                  >
                    <div
                      className={`h-[250px] sm:h-[320px] relative rounded-2xl overflow-hidden group ${gradients[gradientIndex]} shadow-xl cursor-pointer`}
                      onClick={() => navigateToCategory(category.id)}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>

                      {/* Icon in the center */}
                      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
                          {getCategoryIcon(category.id)}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm sm:text-base opacity-90 font-medium">
                          Explore our {category.name.toLowerCase()} collection
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                Best Sellers
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                Featured Products
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prevProduct}
                disabled={productPosition === 0}
                className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextProduct}
                disabled={productPosition === maxProductPosition}
                className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative overflow-hidden pb-10"
            ref={productsCarouselRef}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform:
                  productPosition > 0
                    ? `translateX(calc(-${
                        (productPosition * 100) / visibleProducts
                      }%))`
                    : "translateX(0)",
              }}
              onTouchStart={(e) => {
                setTouchStart(e.targetTouches[0].clientX);
                setIsSwiping(true);
              }}
              onTouchMove={(e) => {
                if (isSwiping) {
                  setTouchEnd(e.targetTouches[0].clientX);
                }
              }}
              onTouchEnd={() => {
                if (isSwiping) {
                  handleSwipe(touchStart, touchEnd, handleProductSwipe);
                  setIsSwiping(false);
                }
              }}
            >
              {productsData.map((product) => {
                const category = categoriesData.find(
                  (c) => c.id === product.category_id
                );
                const productApplications = product.application_ids
                  ? product.application_ids
                      .map((id) => applicationsData.find((a) => a.id === id))
                      .filter(Boolean)
                  : [];

                return (
                  <div
                    key={product.id}
                    className="product-item px-3 flex-shrink-0"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl group h-full flex flex-col border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
                      <div className="h-[280px] relative">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                          <Star className="h-3 w-3 inline-block mr-1" />
                          Featured
                        </div>
                        <Image
                          src={
                            product.main_image ||
                            "/placeholder.svg?height=500&width=500" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1">
                          {category && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-lg">
                              {category.name}
                            </span>
                          )}
                          {productApplications.slice(0, 2).map((app) => (
                            <span
                              key={app?.id}
                              className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-lg"
                            >
                              {app?.name}
                            </span>
                          ))}
                          {productApplications.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded-lg">
                              +{productApplications.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Product highlights */}
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <BadgeCheck className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm font-medium">
                              {product.warranty || "Quality Guaranteed"}
                            </span>
                          </div>
                          {product.ip_rating && (
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm font-medium">
                                {product.ip_rating} Protection
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto flex flex-col gap-3">
                          <button className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-bold">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Inquire on Product
                          </button>
                          <Link
                            href={`/products/${product.id}`}
                            className="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors font-bold"
                          >
                            <Eye className="w-5 h-5 mr-2" />
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Project Finance Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Financing Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Project Finance Options
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Flexible financing solutions to make energy efficiency accessible
              for all projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            {/* Outright Purchase */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Outright Purchase</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Full ownership of your solar system from day one
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Complete installation and optional maintenance packages
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Tier 1 equipment with long-term performance guarantees
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Maximize your return on investment from the start
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary font-bold hover:underline"
                >
                  Request Quote
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
                    Sourcing of asset finance/investors for large projects
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
                    Start-up financing with secured offtake agreements
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
        </div>
      </section>

      {/* Company Details Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Our Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Why Choose Us
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Palcofon is committed to providing energy-efficient lighting
              solutions with a focus on quality, sustainability, and customer
              satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative rounded-2xl overflow-hidden group h-[350px] shadow-xl">
              <Image
                src="/StaticImages/DiverseOwnership.webp"
                alt="Diverse Ownership"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40 group-hover:from-black/95 transition-all duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/30 p-4 rounded-2xl backdrop-blur-sm">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">
                  Diverse Ownership
                </h3>
                <p className="text-base opacity-90 text-center font-medium">
                  100% Black-owned with B-BBEE Level 1 status: 35% Women, 40%
                  Male youth, and 25% Black ownership, fully South African
                  owned.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-2xl overflow-hidden group h-[350px] shadow-xl">
              <Image
                src="/StaticImages/EnergyEfficiency.webp"
                alt="Energy Efficiency"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40 group-hover:from-black/95 transition-all duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/30 p-4 rounded-2xl backdrop-blur-sm">
                    <Lightbulb className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">
                  Energy Efficiency
                </h3>
                <p className="text-base opacity-90 text-center font-medium">
                  Focused on providing maximum energy efficiency products since
                  2018, helping consumers combat rising electricity costs.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-2xl overflow-hidden group h-[350px] shadow-xl">
              <Image
                src="/StaticImages/AfricanExpansion.webp"
                alt="African Expansion"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40 group-hover:from-black/95 transition-all duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/30 p-4 rounded-2xl backdrop-blur-sm">
                    <Globe className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">
                  African Expansion
                </h3>
                <p className="text-base opacity-90 text-center font-medium">
                  Rapidly expanding across Africa through partnerships, with
                  values rooted in the UN Sustainable Development Goals.
                </p>
              </div>
            </div>
          </div>

          {/* Additional benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials and rigorous testing for long-lasting
                products
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery throughout South Africa and beyond
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">5-Year Warranty</h3>
              <p className="text-gray-600">
                Comprehensive warranty coverage on most of our lighting products
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Professional consultation and after-sales technical support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Get In Touch
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Have questions about our products or services? We're here to help
              you find the perfect lighting solution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <HomeContactForm />

            {/* Contact Details */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Our Location</h4>
                    <p className="text-gray-600 mt-1">
                      Palcofon (Pty) Ltd, Johannesburg, South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Phone Number</h4>
                    <p className="text-gray-600 mt-1">
                      067 690 6707 / 082 331 7877
                    </p>
                    <p className="text-gray-600">Mon-Fri, 9am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Email Address</h4>
                    <p className="text-gray-600 mt-1">info@palcofon.co.za</p>
                    <p className="text-gray-600">joe@palcofon.co.za</p>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <h4 className="text-lg font-bold mb-4">Business Hours</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="font-bold">Monday - Friday</p>
                      <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="font-bold">Saturday</p>
                      <p className="text-gray-600">10:00 AM - 3:00 PM</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
                      <p className="font-bold">Sunday</p>
                      <p className="text-gray-600">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Palcofon",
            url: "https://palcofon.co.za",
            logo: "https://palcofon.co.za/logo.png",
            description:
              "100% Black-owned lighting solutions provider with B-BBEE Level 1 status, offering energy-efficient lighting products across Africa.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Johannesburg",
              addressRegion: "Gauteng",
              addressCountry: "South Africa",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+27-67-690-6707",
              contactType: "Customer Service",
            },
            sameAs: [
              "https://www.facebook.com/palcofon",
              "https://www.linkedin.com/company/palcofon",
            ],
          }),
        }}
      />
    </main>
  );
}
