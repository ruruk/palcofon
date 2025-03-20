"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ShoppingCart,
  Eye,
  Zap,
  Shield,
  Clock,
  Thermometer,
  Download,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import applicationsData from "@/data/applications.json";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { useProductInquiry } from "@/contexts/ProductInquiryContext";

export default function ApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  const application = applicationsData.find((app) => app.id === params.id);
  const { addToInquiry } = useProductInquiry();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Application Not Found</h1>
        <p className="mb-6">
          The application you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/applications"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold"
        >
          View All Applications
        </Link>
      </div>
    );
  }

  const relatedProducts = productsData.filter((product) =>
    product.application_ids.includes(application.id)
  );

  // Handle adding product to inquiry
  const handleAddToInquiry = (product: any) => {
    try {
      console.log("Adding product to inquiry from application page:", product);

      // Add the product to the inquiry
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
    } catch (error) {
      console.error("Error adding product to inquiry:", error);
      toast({
        title: "Error",
        description: "There was an error adding the product to your inquiry.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-8">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link
              href="/applications"
              className="text-primary hover:text-primary/80"
            >
              Applications
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
          </li>
          <li className="text-gray-500">{application.name}</li>
        </ol>
      </nav>

      {/* Hero Section - Completely Redesigned */}
      <section className="relative mb-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[500px]">
            <Image
              src={
                application.main_image ||
                "/placeholder.svg?height=800&width=1200"
              }
              alt={application.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                    {application.name}
                  </h1>

                  <p className="text-xl text-white/90 font-medium mb-8 max-w-xl">
                    {application.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section id="related-products" className="scroll-mt-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Related Products
            </h2>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => {
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
                  className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.02] flex flex-col h-full"
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
                      {productApplications.slice(0, 1).map(
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
                      {productApplications.length > 1 && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded-lg">
                          +{productApplications.length - 1}
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
                            <p className="text-xs text-gray-500">Wattage</p>
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
                            <p className="text-xs text-gray-500">IP Rating</p>
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
                            <p className="text-xs text-gray-500">Warranty</p>
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
                            <p className="text-xs text-gray-500">Color Temp</p>
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
                        onClick={() => handleAddToInquiry(product)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-bold"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Inquiry
                      </button>
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center justify-center p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <p className="text-gray-600 mb-4">
              No products found for this application.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
