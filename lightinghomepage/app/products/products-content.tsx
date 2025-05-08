"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShoppingCart,
  Eye,
  Zap,
  Shield,
  Clock,
  Thermometer,
  Filter,
  X,
  Check,
  BadgeCheck,
  Search,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import applicationsData from "@/data/applications.json";
import { useProductInquiry } from "@/contexts/ProductInquiryContext";

export default function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [stickyTop, setStickyTop] = useState(0);

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Add the showConfirmationPopup state
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  // Get the inquiry context and toast
  const { addToInquiry } = useProductInquiry();
  const { toast } = useToast();

  // Modify the handleAddToInquiry function to show the popup
  const handleAddToInquiry = (product: any) => {
    try {
      console.log("Adding product to inquiry from catalog:", product);

      // Add the product to the inquiry - make sure we're passing the exact structure expected
      addToInquiry({
        id: product.id,
        name: product.name,
      });

      // Show a toast notification
      toast({
        title: "Product added to inquiry",
        description: `${product.name} has been added to your inquiry list.`,
        duration: 3000,
      });

      // Set the current product and show the confirmation popup
      setCurrentProduct(product);
      setShowConfirmationPopup(true);

      // Force a re-render of components that depend on the inquiry state
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error adding product to inquiry:", error);
      toast({
        title: "Error",
        description: "There was an error adding the product to your inquiry.",
        variant: "destructive",
      });
    }
  };

  const updateFilters = useCallback(() => {
    const category = searchParams.get("category");
    const application = searchParams.get("application");

    if (category) {
      router.push(`/products?category=${category}`);
    } else if (application) {
      router.push(`/products?application=${application}`);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const application = params.get("application");
    const search = params.get("search");

    setSelectedCategories(category ? [category] : []);
    setSelectedApplications(application ? [application] : []);
    if (search) {
      setSearchQuery(search);
    }

    const updateStickyTop = () => {
      const navbar = document.querySelector("header");
      if (navbar) {
        setStickyTop(navbar.clientHeight);
      }
    };

    updateStickyTop();
    window.addEventListener("resize", updateStickyTop);

    return () => {
      window.removeEventListener("resize", updateStickyTop);
    };
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId];
      updateURL(newCategories, selectedApplications);
      return newCategories;
    });
  };

  const toggleApplication = (applicationId: string) => {
    setSelectedApplications((prev) => {
      const newApplications = prev.includes(applicationId)
        ? prev.filter((a) => a !== applicationId)
        : [...prev, applicationId];
      updateURL(selectedCategories, newApplications);
      return newApplications;
    });
  };

  const updateURL = (categories: string[], applications: string[]) => {
    const params = new URLSearchParams();
    if (categories.length > 0) {
      params.set("category", categories[0]);
    }
    if (applications.length > 0) {
      params.set("application", applications[0]);
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    router.push(`/products?${params.toString()}`);
  };

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      if (selectedCategories.length > 0) {
        params.set("category", selectedCategories[0]);
      }
      if (selectedApplications.length > 0) {
        params.set("application", selectedApplications[0]);
      }
      params.set("search", searchQuery.trim());
      router.push(`/products?${params.toString()}`);
      setIsSearchFocused(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setIsSearchFocused(false);
  };

  // Filter products based on search, categories, and applications
  const searchResults = searchQuery.trim()
    ? productsData
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
        .slice(0, 5) // Limit to 5 results for the dropdown
    : [];

  const filteredProducts = productsData.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category_id)) &&
      (selectedApplications.length === 0 ||
        product.application_ids.some((id) =>
          selectedApplications.includes(id)
        )) &&
      (searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedApplications([]);
    setSearchQuery("");
    router.push("/products");
  };

  // Add the animation keyframes to the document
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    // Define the keyframes
    style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;
    // Append the style element to the head
    document.head.appendChild(style);

    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col mb-8">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">
            Our Collection
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
            Our Products
          </h1>

          {/* Search Bar */}
          <div className="relative w-full mb-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search products by name or description..."
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white p-1.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div
                ref={searchResultsRef}
                className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in"
              >
                {searchResults.length > 0 ? (
                  <div className="max-h-[60vh] overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="relative h-16 w-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={product.main_image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <h4 className="font-bold text-gray-900 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {product.description}
                          </p>
                          <div className="flex items-center mt-1 space-x-2">
                            {product.wattage && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                                {product.wattage}
                              </span>
                            )}
                            {product.ip_rating && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                                IP{product.ip_rating}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                      </div>
                    ))}
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <button
                        onClick={handleSearch}
                        className="w-full text-center text-primary font-bold hover:underline"
                      >
                        View all results
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">
                      No products found matching &quot;{searchQuery}&quot;
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-2 text-primary font-medium hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filter Panel (Desktop Only) */}
            <aside className="hidden lg:block lg:w-72 flex-shrink-0">
              <div
                className="bg-white rounded-2xl shadow-xl p-6 sticky"
                style={{ top: `${stickyTop + 20}px` }}
              >
                {/* Filter Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-xl text-gray-900">Filters</h2>
                  {(selectedCategories.length > 0 ||
                    selectedApplications.length > 0 ||
                    searchQuery.trim()) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </button>
                  )}
                </div>

                {/* Categories Filter */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">
                    Categories
                  </h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {categoriesData.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <div
                          onClick={() => toggleCategory(category.id)}
                          className={`w-5 h-5 rounded-md mr-3 flex items-center justify-center cursor-pointer border-2 transition-colors ${
                            selectedCategories.includes(category.id)
                              ? "bg-primary border-primary text-white"
                              : "border-gray-300 hover:border-primary/50"
                          }`}
                        >
                          {selectedCategories.includes(category.id) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <label
                          className="text-gray-700 font-medium cursor-pointer hover:text-primary transition-colors flex-1"
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications Filter */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-900">
                    Applications
                  </h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {applicationsData.map((application) => (
                      <div key={application.id} className="flex items-center">
                        <div
                          onClick={() => toggleApplication(application.id)}
                          className={`w-5 h-5 rounded-md mr-3 flex items-center justify-center cursor-pointer border-2 transition-colors ${
                            selectedApplications.includes(application.id)
                              ? "bg-primary border-primary text-white"
                              : "border-gray-300 hover:border-primary/50"
                          }`}
                        >
                          {selectedApplications.includes(application.id) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <label
                          className="text-gray-700 font-medium cursor-pointer hover:text-primary transition-colors flex-1"
                          onClick={() => toggleApplication(application.id)}
                        >
                          {application.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
              {/* Results Summary */}
              <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
                <p className="text-gray-700 font-medium">
                  Showing{" "}
                  <span className="font-bold">{filteredProducts.length}</span>{" "}
                  products
                </p>
                <div className="flex flex-wrap gap-2">
                  {searchQuery.trim() && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-bold flex items-center">
                      Search: {searchQuery}
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {selectedCategories.map((catId) => {
                    const category = categoriesData.find((c) => c.id === catId);
                    return (
                      category && (
                        <div
                          key={catId}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-bold flex items-center"
                        >
                          {category.name}
                          <button
                            onClick={() => toggleCategory(catId)}
                            className="ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    );
                  })}
                  {selectedApplications.map((appId) => {
                    const application = applicationsData.find(
                      (a) => a.id === appId
                    );
                    return (
                      application && (
                        <div
                          key={appId}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-bold flex items-center"
                        >
                          {application.name}
                          <button
                            onClick={() => toggleApplication(appId)}
                            className="ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const category = categoriesData.find(
                      (c) => c.id === product.category_id
                    );
                    const applications = product.application_ids
                      ? product.application_ids
                          .map((id) =>
                            applicationsData.find((a) => a.id === id)
                          )
                          .filter(Boolean)
                      : [];

                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02] flex flex-col h-full cursor-pointer"
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        {/* Product Image */}
                        <div className="relative h-56 bg-gray-50 p-4">
                          <Image
                            src={product.main_image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                          />

                          {/* Product ID Badge */}
                          <div className="absolute top-2 left-2 bg-gray-800/70 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                            {product.id}
                          </div>

                          {/* Categories & Applications */}
                          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                            {category && (
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-lg">
                                {category.name}
                              </span>
                            )}
                            {applications.slice(0, 1).map(
                              (app) =>
                                app && (
                                  <span
                                    key={app.id}
                                    className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-lg"
                                  >
                                    {app.name}
                                  </span>
                                )
                            )}
                            {applications.length > 1 && (
                              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded-lg">
                                +{applications.length - 1}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-2 text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>

                          {/* Specifications Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {product.wattage && (
                              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                                <Zap className="h-4 w-4 text-primary shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-500">
                                    Wattage
                                  </p>
                                  <p className="text-sm font-bold text-gray-900 truncate">
                                    {product.wattage}
                                  </p>
                                </div>
                              </div>
                            )}

                            {product.ip_rating && (
                              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                                <Shield className="h-4 w-4 text-primary shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-500">
                                    IP Rating
                                  </p>
                                  <p className="text-sm font-bold text-gray-900 truncate">
                                    {product.ip_rating}
                                  </p>
                                </div>
                              </div>
                            )}

                            {product.warranty && (
                              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                                <Clock className="h-4 w-4 text-primary shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-500">
                                    Warranty
                                  </p>
                                  <p className="text-sm font-bold text-gray-900 truncate">
                                    {product.warranty}
                                  </p>
                                </div>
                              </div>
                            )}

                            {product.colour_temp && (
                              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                                <Thermometer className="h-4 w-4 text-primary shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-500">
                                    Color Temp
                                  </p>
                                  <p className="text-sm font-bold text-gray-900 truncate">
                                    {product.colour_temp}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Product highlights */}
                          {product.features && product.features.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center mb-2">
                                <BadgeCheck className="h-4 w-4 text-primary mr-2" />
                                <span className="text-sm font-medium">
                                  {product.features[0]}
                                </span>
                              </div>
                              {product.features.length > 1 && (
                                <div className="flex items-center">
                                  <BadgeCheck className="h-4 w-4 text-primary mr-2" />
                                  <span className="text-sm font-medium">
                                    {product.features[1]}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-auto flex gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click from triggering
                                handleAddToInquiry(product);
                              }}
                              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-bold"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Inquiry
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click from triggering
                                router.push(`/products/${product.id}`);
                              }}
                              className="inline-flex items-center justify-center p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                      <div className="text-gray-400 mb-4">
                        <Filter className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchQuery.trim()
                          ? `No results for "${searchQuery}". Try different keywords or adjust your filters.`
                          : "Try adjusting your filters or browse our full catalog."}
                      </p>
                      <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            className="fixed bottom-6 left-6 z-40 lg:hidden bg-primary text-white font-bold px-5 py-3.5 rounded-2xl shadow-xl hover:bg-primary/90 active:scale-95 transition-all duration-200 flex items-center"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Filter className="h-5 w-5 mr-2" />
            <span>Filters</span>
            {(selectedCategories.length > 0 ||
              selectedApplications.length > 0) && (
              <span className="ml-2 bg-white text-primary text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {selectedCategories.length + selectedApplications.length}
              </span>
            )}
          </button>

          {/* Mobile Filter Panel Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <div
                className="absolute right-0 top-0 h-full w-[85%] max-w-md bg-white overflow-y-auto animate-slide-in-right"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center z-10">
                  <h2 className="font-bold text-xl text-gray-900">
                    Filter Products
                  </h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Search in Mobile Filter */}
                  <div className="mb-2">
                    <h3 className="font-bold text-lg mb-4 text-gray-900">
                      Search
                    </h3>
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder="Search products..."
                        className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Active Filters Summary */}
                  {(selectedCategories.length > 0 ||
                    selectedApplications.length > 0 ||
                    searchQuery.trim()) && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-900">
                          Active Filters
                        </h3>
                        <button
                          onClick={clearFilters}
                          className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchQuery.trim() && (
                          <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center">
                            Search: {searchQuery}
                            <button
                              onClick={() => setSearchQuery("")}
                              className="ml-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        {selectedCategories.map((catId) => {
                          const category = categoriesData.find(
                            (c) => c.id === catId
                          );
                          return (
                            category && (
                              <div
                                key={catId}
                                className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-bold flex items-center"
                              >
                                {category.name}
                                <button
                                  onClick={() => toggleCategory(catId)}
                                  className="ml-2"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )
                          );
                        })}
                        {selectedApplications.map((appId) => {
                          const application = applicationsData.find(
                            (a) => a.id === appId
                          );
                          return (
                            application && (
                              <div
                                key={appId}
                                className="bg-green-100 text-green-800 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center"
                              >
                                {application.name}
                                <button
                                  onClick={() => toggleApplication(appId)}
                                  className="ml-2"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Categories Filter */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">
                      Categories
                    </h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {categoriesData.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <div
                            onClick={() => toggleCategory(category.id)}
                            className={`w-6 h-6 rounded-md mr-3 flex items-center justify-center cursor-pointer border-2 transition-colors ${
                              selectedCategories.includes(category.id)
                                ? "bg-primary border-primary text-white"
                                : "border-gray-300 hover:border-primary/50"
                            }`}
                          >
                            {selectedCategories.includes(category.id) && (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                          <label
                            className="text-gray-700 font-medium cursor-pointer hover:text-primary transition-colors flex-1 py-1"
                            onClick={() => toggleCategory(category.id)}
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications Filter */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">
                      Applications
                    </h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {applicationsData.map((application) => (
                        <div key={application.id} className="flex items-center">
                          <div
                            onClick={() => toggleApplication(application.id)}
                            className={`w-6 h-6 rounded-md mr-3 flex items-center justify-center cursor-pointer border-2 transition-colors ${
                              selectedApplications.includes(application.id)
                                ? "bg-primary border-primary text-white"
                                : "border-gray-300 hover:border-primary/50"
                            }`}
                          >
                            {selectedApplications.includes(application.id) && (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                          <label
                            className="text-gray-700 font-medium cursor-pointer hover:text-primary transition-colors flex-1 py-1"
                            onClick={() => toggleApplication(application.id)}
                          >
                            {application.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply Filters Button */}
                  <div className="pt-4 mt-6 border-t border-gray-100">
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full py-3.5 text-center font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showConfirmationPopup && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-fadeIn">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Product Added to Inquiry
              </h3>
              <p className="text-gray-600 mb-6">
                {currentProduct.name} has been added to your inquiry list. What
                would you like to do next?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setShowConfirmationPopup(false);
                    document
                      .querySelector("[data-inquiry-fab]")
                      ?.dispatchEvent(
                        new MouseEvent("click", { bubbles: true })
                      );
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-semibold flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  View Inquiry
                </button>
                <button
                  onClick={() => setShowConfirmationPopup(false)}
                  className="px-6 py-3 bg-white text-primary border-2 border-primary rounded-xl hover:bg-primary/10 transition-all font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
