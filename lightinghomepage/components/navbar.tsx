"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  Layers,
  Users,
  Phone,
  Search,
} from "lucide-react";
import categoriesData from "@/data/categories.json";
import applicationsData from "@/data/applications.json";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isApplicationsDropdownOpen, setIsApplicationsDropdownOpen] =
    useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(96); // Default to unscrolled height (h-24 = 96px)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const applicationsDropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update header height when scroll state changes
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when route changes or on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    setIsMenuOpen(false);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductsDropdownOpen(false);
      }
      if (
        applicationsDropdownRef.current &&
        !applicationsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsApplicationsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
    setIsProductsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleApplicationClick = (applicationId: string) => {
    router.push(`/applications/${applicationId}`);
    setIsApplicationsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const toggleAccordion = (section: string) => {
    if (activeAccordion === section) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(section);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg h-16"
            : "bg-white/90 backdrop-blur-lg h-20"
        }`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 z-10">
              <div className="relative">
                <Image
                  src="https://palcofon.co.za/wp-content/uploads/2020/08/cropped-Palcofon-Logo_png.png"
                  alt="Palcofon Logo"
                  width={isScrolled ? 40 : 48}
                  height={isScrolled ? 40 : 48}
                  className={`transition-all duration-300 ${
                    isScrolled ? "h-10 w-auto" : "h-12 w-auto"
                  }`}
                />
              </div>
              <span
                className={`font-extrabold text-gray-900 transition-all duration-300 ${
                  isScrolled ? "text-xl" : "text-2xl"
                }`}
              >
                Palcofon
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className={`font-bold transition-colors px-4 py-2 rounded-xl flex items-center space-x-1 ${
                  pathname === "/"
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                } ${isScrolled ? "text-sm" : "text-base"}`}
              >
                <Home className={`${isScrolled ? "h-4 w-4" : "h-5 w-5"}`} />
                <span>Home</span>
              </Link>

              <div
                className="relative"
                ref={productsDropdownRef}
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <Link
                  href="/products"
                  className={`font-bold transition-colors px-4 py-2 rounded-xl flex items-center space-x-1 ${
                    pathname === "/products" ||
                    pathname.startsWith("/products/")
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100"
                  } ${isScrolled ? "text-sm" : "text-base"}`}
                >
                  <Package
                    className={`${isScrolled ? "h-4 w-4" : "h-5 w-5"}`}
                  />
                  <span>Products</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isProductsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {isProductsDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl py-4 z-10 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-4 py-2 font-bold text-gray-900 border-b border-gray-100 mb-2 dark:text-white dark:border-gray-700">
                      Categories
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-2">
                      {categoriesData.map((category) => (
                        <button
                          key={category.id}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl my-1 font-medium transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                    <div className="px-4 pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        View All Products
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative"
                ref={applicationsDropdownRef}
                onMouseEnter={() => setIsApplicationsDropdownOpen(true)}
                onMouseLeave={() => setIsApplicationsDropdownOpen(false)}
              >
                <Link
                  href="/applications"
                  className={`font-bold transition-colors px-4 py-2 rounded-xl flex items-center space-x-1 ${
                    pathname === "/applications" ||
                    pathname.startsWith("/applications/")
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100"
                  } ${isScrolled ? "text-sm" : "text-base"}`}
                >
                  <Layers className={`${isScrolled ? "h-4 w-4" : "h-5 w-5"}`} />
                  <span>Applications</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isApplicationsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {isApplicationsDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl py-4 z-10 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-4 py-2 font-bold text-gray-900 border-b border-gray-100 mb-2 dark:text-white dark:border-gray-700">
                      Applications
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-2">
                      {applicationsData.map((application) => (
                        <button
                          key={application.id}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl my-1 font-medium transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleApplicationClick(application.id)}
                        >
                          {application.name}
                        </button>
                      ))}
                    </div>
                    <div className="px-4 pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
                      <Link
                        href="/applications"
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
                        onClick={() => setIsApplicationsDropdownOpen(false)}
                      >
                        View All Applications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`font-bold transition-colors px-4 py-2 rounded-xl flex items-center space-x-1 ${
                  pathname === "/about"
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                } ${isScrolled ? "text-sm" : "text-base"}`}
              >
                <Users className={`${isScrolled ? "h-4 w-4" : "h-5 w-5"}`} />
                <span>About</span>
              </Link>

              <Link
                href="/contact"
                className={`font-bold transition-colors px-4 py-2 rounded-xl flex items-center space-x-1 ${
                  pathname === "/contact"
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                } ${isScrolled ? "text-sm" : "text-base"}`}
              >
                <Phone className={`${isScrolled ? "h-4 w-4" : "h-5 w-5"}`} />
                <span>Contact</span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Contact Button - Desktop */}
              <Link
                href="/contact"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contact Us
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-full bg-white shadow-lg z-20">
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu - Slide-in Panel */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 pt-30 h-screen w-[80%] max-w-sm bg-white shadow-xl z-[100] overflow-y-auto transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
            style={{ paddingTop: "70px" }}
          >
            <div className="p-6 space-y-6 pt-30">
              {/* Mobile Navigation Links */}
              <nav className="space-y-3">
                <Link
                  href="/"
                  className={`flex items-center space-x-3 p-3 rounded-xl font-bold ${
                    pathname === "/"
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>

                {/* Products Accordion */}
                <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
                  <div className="flex w-full items-center justify-between rounded-xl p-3 font-bold">
                    <Link
                      href="/products"
                      className={`flex items-center space-x-3 ${
                        pathname === "/products" ||
                        pathname.startsWith("/products/")
                          ? "text-primary"
                          : "text-gray-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Package className="h-5 w-5" />
                      <span>Products</span>
                    </Link>
                    <button
                      onClick={() => toggleAccordion("products")}
                      className="p-1 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeAccordion === "products" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {activeAccordion === "products" && (
                    <div className="mt-2 pl-11 pr-2 space-y-1">
                      <Link
                        href="/products"
                        className="block rounded-xl px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All Products
                      </Link>
                      <div className="py-1 font-semibold text-gray-900">
                        Categories
                      </div>
                      <div className="max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                        {categoriesData.map((category) => (
                          <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className="block rounded-xl px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Applications Accordion */}
                <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
                  <div className="flex w-full items-center justify-between rounded-xl p-3 font-bold">
                    <Link
                      href="/applications"
                      className={`flex items-center space-x-3 ${
                        pathname === "/applications" ||
                        pathname.startsWith("/applications/")
                          ? "text-primary"
                          : "text-gray-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Layers className="h-5 w-5" />
                      <span>Applications</span>
                    </Link>
                    <button
                      onClick={() => toggleAccordion("applications")}
                      className="p-1 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeAccordion === "applications" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {activeAccordion === "applications" && (
                    <div className="mt-2 pl-11 pr-2 space-y-1">
                      <Link
                        href="/applications"
                        className="block rounded-xl px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All Applications
                      </Link>
                      <div className="max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                        {applicationsData.map((application) => (
                          <Link
                            key={application.id}
                            href={`/applications/${application.id}`}
                            className="block rounded-xl px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {application.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  className={`flex items-center space-x-3 p-3 rounded-xl font-bold ${
                    pathname === "/about"
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span>About</span>
                </Link>

                <Link
                  href="/contact"
                  className={`flex items-center space-x-3 p-3 rounded-xl font-bold ${
                    pathname === "/contact"
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
              </nav>

              {/* Mobile Contact Button */}
              <Link
                href="/contact"
                className="block w-full rounded-xl bg-primary px-4 py-3 text-center text-base font-bold text-white hover:bg-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
