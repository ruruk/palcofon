"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  Shield,
  Thermometer,
  Info,
  Award,
  Check,
  Search,
  Package,
  FileText,
  ShoppingCart,
  Eye,
  CheckCircle,
  Settings,
  Ruler,
  ImageIcon,
  Video,
  Compass,
  Sun,
  Activity,
  SunDim,
} from "lucide-react";
import { useProductInquiry } from "@/contexts/ProductInquiryContext";
import { useToast } from "@/components/ui/use-toast";
import Script from "next/script";
import ImageLightbox from "@/components/ImageLightbox";

export default function ProductSingleView({
  product,
  category,
  applications,
}: {
  product: any;
  category: any;
  applications: any[];
}) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [functionalityIndex, setFunctionalityIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const carouselRef = useRef<HTMLDivElement>(null);
  const { addToInquiry } = useProductInquiry();
  const { toast } = useToast();

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Initialize windowWidth and visibleItems outside the conditional block
  const [windowWidth, setWindowWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  // Function to get the window width
  const getWindowWidth = () => {
    return typeof window !== "undefined" ? window.innerWidth : 0;
  };

  // Set initial window width
  useEffect(() => {
    setWindowWidth(getWindowWidth());
  }, []);

  // Update visible items based on screen size
  useEffect(() => {
    let newVisibleItems = 3;
    if (windowWidth < 640) {
      newVisibleItems = 1;
    } else if (windowWidth < 1024) {
      newVisibleItems = 2;
    }
    setVisibleItems(newVisibleItems);

    // Function to handle resize event
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  // Ensure product has all required properties with defaults
  const productImages = product.images || [
    product.main_image || "/placeholder.svg",
  ];
  const additionalImages = product.additional_images || [];
  const certificationImages = product.certification_images || [];

  const handleAddToInquiry = () => {
    try {
      console.log("Adding product to inquiry from single view:", product);

      // Add the product to the inquiry - make sure we're passing ONLY id and name
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

  // Calculate max index for functionality carousel
  const maxFunctionalityIndex = Math.max(
    0,
    additionalImages.length - visibleItems
  );

  // Navigate functionality carousel
  const navigateFunctionality = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setFunctionalityIndex((prev) => Math.max(0, prev - 1));
    } else {
      setFunctionalityIndex((prev) =>
        Math.min(maxFunctionalityIndex, prev + 1)
      );
    }
  };

  // Open lightbox with the current main image
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Prepare structured data for Google Shopping
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImages.map((img: string) =>
      typeof window !== "undefined"
        ? new URL(img, window.location.origin).toString()
        : img
    ),
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "Palcofon Lighting",
    },
    category: category?.name,
    offers: {
      "@type": "Offer",
      url: typeof window !== "undefined" ? window.location.href : "",
      priceCurrency: "ZAR",
      price: "0.00", // Replace with actual price when available
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Palcofon Lighting",
      },
    },
  };

  // Render table for technical specifications
  const renderSpecTable = (data: Record<string, any>, title: string) => {
    if (!data || Object.keys(data).length === 0) return null;

    // Check if data contains models array that needs special handling
    if (data.models && Array.isArray(data.models) && data.models.length > 0) {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{title}</h3>
          {renderModelTable(data.models, "Models")}

          {/* Render any other properties that aren't arrays */}
          {Object.entries(data).filter(
            ([key, value]) => key !== "models" && !Array.isArray(value)
          ).length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-medium mb-2">
                General Specifications
              </h4>
              <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                <tbody>
                  {Object.entries(data)
                    .filter(
                      ([key, value]) =>
                        key !== "models" && !Array.isArray(value)
                    )
                    .map(([key, value], index) => {
                      const formattedKey = key
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");

                      return (
                        <tr
                          key={key}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">
                            {formattedKey}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
                            {value}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    // Check if data contains other arrays that need special handling
    const hasArrays = Object.values(data).some(
      (value) =>
        Array.isArray(value) && value.length > 0 && typeof value[0] === "object"
    );

    if (!hasArrays) {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{title}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <tbody>
                {Object.entries(data).map(([key, value], index) => {
                  // Skip rendering arrays as table rows
                  if (Array.isArray(value)) return null;

                  const formattedKey = key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                  return (
                    <tr
                      key={key}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">
                        {formattedKey}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
                        {value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      // Handle arrays of objects (like models)
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{title}</h3>
          {Object.entries(data).map(([key, value]) => {
            if (
              Array.isArray(value) &&
              value.length > 0 &&
              typeof value[0] === "object"
            ) {
              return renderModelTable(value, key);
            }
            return null;
          })}
        </div>
      );
    }
  };

  // Add a new function to render model-specific data
  const renderModelTable = (models: any[], key: string) => {
    if (!models || models.length === 0) return null;

    // Get all possible keys from all models
    const allKeys = new Set<string>();
    models.forEach((model) => {
      Object.keys(model).forEach((key) => allKeys.add(key));
    });

    const formattedKey = key
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <div className="overflow-x-auto mt-4" key={key}>
        <h4 className="text-md font-medium mb-2">{formattedKey}</h4>
        <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Array.from(allKeys).map((key) => {
                const formattedHeader = key
                  .replace(/_/g, " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <th
                    key={key}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  >
                    {formattedHeader}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                {Array.from(allKeys).map((key) => (
                  <td
                    key={key}
                    className="px-4 py-3 border-b border-gray-200 text-gray-700"
                  >
                    {model[key] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render list items for arrays
  const renderListItems = (items: string[], title: string) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <ul className="list-disc pl-5 space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render features with icons
  const renderFeatures = (features: string[]) => {
    if (!features || features.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-gray-900">{feature}</span>
          </div>
        ))}
      </div>
    );
  };

  // Render dimensions with diagram
  const renderDimensions = (
    dimensions: Record<string, any> | Array<Record<string, any>>
  ) => {
    if (
      !dimensions ||
      (Array.isArray(dimensions) && dimensions.length === 0) ||
      (!Array.isArray(dimensions) && Object.keys(dimensions).length === 0)
    ) {
      return null;
    }

    // Handle array of dimension objects (multiple models)
    if (Array.isArray(dimensions)) {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Dimensions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(dimensions[0]).map((key) => {
                    const formattedHeader = key
                      .replace(/_/g, " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ");

                    return (
                      <th
                        key={key}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                      >
                        {formattedHeader}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {dimensions.map((dim, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {Object.entries(dim).map(([key, value]) => (
                      <td
                        key={key}
                        className="px-4 py-3 border-b border-gray-200 text-gray-700"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Render a diagram for the first model as an example */}
          {dimensions[0]?.length &&
            dimensions[0]?.width &&
            dimensions[0]?.height && (
              <div className="mt-6 flex items-center justify-center bg-gray-50 p-6 rounded-lg">
                <div className="relative w-full max-w-xs aspect-square">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-2 border-primary relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-gray-700">
                        {dimensions[0].model || "Model"}
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                        Width: {dimensions[0].width}
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                        Length: {dimensions[0].length}
                      </div>
                      <div className="absolute top-1/2 -right-16 -translate-y-1/2 text-xs text-gray-600">
                        Height: {dimensions[0].height}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      );
    }

    // Handle single dimension object
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Dimensions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <tbody>
                {Object.entries(dimensions).map(([key, value], index) => {
                  const formattedKey = key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                  return (
                    <tr
                      key={key}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">
                        {formattedKey}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
                        {value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-50 p-6 rounded-lg">
          <div className="relative w-full max-w-xs aspect-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full border-2 border-primary relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-gray-700">
                  Ø {dimensions.diameter}
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                  A
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                  C
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-full w-px border-l-2 border-primary border-dashed flex items-center">
              <div className="absolute -right-8 text-xs text-gray-600">
                <div>B</div>
                <div>{dimensions.height}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Set default active tab based on available data
  useEffect(() => {
    if (product) {
      if (product.features && product.features.length > 0) {
        setActiveTab("overview");
      } else if (
        (product.technical_specs &&
          (typeof product.technical_specs === "object" ||
            Array.isArray(product.technical_specs))) ||
        (product.electrical_data &&
          (typeof product.electrical_data === "object" ||
            Array.isArray(product.electrical_data))) ||
        (product.photometric_data &&
          (typeof product.photometric_data === "object" ||
            Array.isArray(product.photometric_data)))
      ) {
        setActiveTab("specifications");
      } else if (
        product.dimensions &&
        (typeof product.dimensions === "object" ||
          Array.isArray(product.dimensions))
      ) {
        setActiveTab("dimensions");
      }
    }
  }, [product]);

  return (
    <>
      <Script
        id={`product-structured-data-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}

        <nav className="text-sm mb-8">
          <ol className="list-none p-0 inline-flex items-center bg-gray-50 dark:bg-grey-800/50 px-4 py-2 rounded-full">
            <li className="flex items-center">
              <Link
                href="/products"
                className="text-primary hover:text-primary/80 font-medium flex items-center"
              >
                <Package className="h-4 w-4 mr-1" />
                Products
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            </li>
            <li className="text-gray-500 font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Info Section */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Carousel - Enhanced with stronger rounded corners and better hover effects */}
          <div className="relative">
            <div
              className="aspect-square relative overflow-hidden rounded-3xl mb-4 cursor-zoom-in group shadow-md"
              onClick={() => openLightbox(mainImageIndex)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl"></div>
              <Image
                src={productImages[mainImageIndex] || "/placeholder.svg"}
                alt={`${product.name} - Image ${mainImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-3xl">
                <div className="bg-primary/90 text-white p-3 rounded-full transform transition-transform group-hover:scale-110">
                  <Search className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="flex overflow-x-auto pb-2 gap-4 snap-x p-2">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setMainImageIndex(index)}
                  className={`w-20 h-20 relative rounded-2xl overflow-hidden flex-shrink-0 snap-start bg-gray-50 p-1 transition-all duration-200 ${
                    index === mainImageIndex
                      ? "ring-2 ring-primary scale-105 shadow-md"
                      : "border border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - Enhanced with bolder fonts and better visual hierarchy */}
          <div>
            {/* Badges - Now with stronger rounded corners and better styling */}
            <div className="flex flex-wrap gap-2 mb-6">
              {category && (
                <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full">
                  {category.name}
                </span>
              )}
              {applications.map((app) => (
                <span
                  key={app.id}
                  className="inline-block bg-emerald-100 text-emerald-900 text-sm font-bold px-4 py-1.5 rounded-full"
                >
                  {app.name}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              {product.name}
            </h1>

            {/* Certifications - Enhanced with better styling */}
            {certificationImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="w-full mb-2">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Certifications
                  </h3>
                </div>
                {certificationImages.map((cert: string, index: number) => (
                  <div
                    key={index}
                    className="w-16 h-16 relative bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm"
                  >
                    <Image
                      src={cert || "/placeholder.svg"}
                      alt={`Certification ${index + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Product Specifications - Enhanced with icons and better styling */}
            {(product.wattage ||
              product.ip_rating ||
              product.warranty ||
              product.colour_temp) && (
              <div className="bg-gray-50 rounded-3xl p-6 mb-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                  <Info className="w-5 h-5 mr-2 text-primary" />
                  Key Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.wattage && (
                    <div className="flex items-center group">
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-3 rounded-2xl mr-4 transition-colors">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Wattage
                        </p>
                        <p className="font-bold text-lg">{product.wattage}</p>
                      </div>
                    </div>
                  )}

                  {product.ip_rating && (
                    <div className="flex items-center group">
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-3 rounded-2xl mr-4 transition-colors">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          IP Rating
                        </p>
                        <p className="font-bold text-lg">{product.ip_rating}</p>
                      </div>
                    </div>
                  )}

                  {product.warranty && (
                    <div className="flex items-center group">
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-3 rounded-2xl mr-4 transition-colors">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Warranty
                        </p>
                        <p className="font-bold text-lg">{product.warranty}</p>
                      </div>
                    </div>
                  )}

                  {product.colour_temp && (
                    <div className="flex items-center group">
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-3 rounded-2xl mr-4 transition-colors">
                        <Thermometer className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Color Temperature
                        </p>
                        <p className="font-bold text-lg">
                          {product.colour_temp}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-3xl p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-bold mb-2 flex items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToInquiry}
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors font-bold flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Inquire on Product
              </button>
              {product.PDF_link && (
                <a
                  href={product.PDF_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary border-2 border-primary px-6 py-3 rounded-xl hover:bg-primary/10 transition-colors text-center font-bold flex items-center justify-center shadow-sm hover:shadow-md"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Product Info PDF
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs for detailed product information */}

        <div className="mb-12">
          <div className="bg-gray-50 rounded-3xl p-2 mb-6 shadow-sm">
            <nav className="flex space-x-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-3 px-5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === "overview"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
              >
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Overview
                </div>
              </button>
              {product.features && (
                <button
                  onClick={() => setActiveTab("features")}
                  className={`py-3 px-5 rounded-xl font-bold text-sm transition-all ${
                    activeTab === "features"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Features
                  </div>
                </button>
              )}
              {(product.technical_specs ||
                product.electrical_data ||
                product.photometric_data) && (
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`py-3 px-5 rounded-xl font-bold text-sm transition-all ${
                    activeTab === "specifications"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Specifications
                  </div>
                </button>
              )}
              {product.dimensions && (
                <button
                  onClick={() => setActiveTab("dimensions")}
                  className={`py-3 px-5 rounded-xl font-bold text-sm transition-all ${
                    activeTab === "dimensions"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2" />
                    Dimensions
                  </div>
                </button>
              )}
            </nav>
          </div>

          {/* Tab content - Enhanced with better styling */}
          <div className="bg-white rounded-3xl p-8 shadow-md">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-extrabold mb-6 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-primary" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                    Product Overview
                  </span>
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Quick specs overview - Enhanced with better styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {product.wattage && (
                    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-center mb-2">
                        <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          Power
                        </div>
                      </div>
                      <div className="font-bold text-lg">{product.wattage}</div>
                    </div>
                  )}
                  {product.ip_rating && (
                    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-center mb-2">
                        <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                          <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          IP Rating
                        </div>
                      </div>
                      <div className="font-bold text-lg">
                        {product.ip_rating}
                      </div>
                    </div>
                  )}
                  {product.beam_angle && (
                    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-center mb-2">
                        <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                          <Compass className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          Beam Angle
                        </div>
                      </div>
                      <div className="font-bold text-lg">
                        {product.beam_angle}
                      </div>
                    </div>
                  )}
                  {product.luminous_flux && (
                    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-center mb-2">
                        <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                          <Sun className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          Luminous Flux
                        </div>
                      </div>
                      <div className="font-bold text-lg">
                        {product.luminous_flux}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional specifications - Enhanced with better styling */}
                {(product.power_factor ||
                  product.surge_protection ||
                  product.housing_material ||
                  product.dimming ||
                  product.operating_temperature) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {product.power_factor && (
                      <div className="bg-gray-50 p-5 rounded-2xl shadow-sm group hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <Activity className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            Power Factor
                          </div>
                        </div>
                        <div className="font-bold">{product.power_factor}</div>
                      </div>
                    )}
                    {product.surge_protection && (
                      <div className="bg-gray-50 p-5 rounded-2xl shadow-sm group hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <Zap className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            Surge Protection
                          </div>
                        </div>
                        <div className="font-bold">
                          {product.surge_protection}
                        </div>
                      </div>
                    )}
                    {product.housing_material && (
                      <div className="bg-gray-50 p-5 rounded-2xl shadow-sm group hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <Package className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            Housing Material
                          </div>
                        </div>
                        <div className="font-bold">
                          {product.housing_material}
                        </div>
                      </div>
                    )}
                    {product.dimming && (
                      <div className="bg-gray-50 p-5 rounded-2xl shadow-sm group hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <SunDim className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            Dimming
                          </div>
                        </div>
                        <div className="font-bold">{product.dimming}</div>
                      </div>
                    )}
                    {product.operating_temperature && (
                      <div className="bg-gray-50 p-5 rounded-2xl shadow-sm group hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 p-2 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <Thermometer className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            Operating Temperature
                          </div>
                        </div>
                        <div className="font-bold">
                          {product.operating_temperature}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Key features highlight - Enhanced with better styling */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6 bg-gray-50 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features
                        .slice(0, 4)
                        .map((feature: string, index: number) => (
                          <div key={index} className="flex items-start group">
                            <div className="bg-primary/10 group-hover:bg-primary/20 p-1.5 rounded-full mr-3 mt-0.5 transition-colors">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                    </div>
                    {product.features.length > 4 && (
                      <button
                        onClick={() => setActiveTab("features")}
                        className="text-primary font-bold mt-4 hover:underline flex items-center"
                      >
                        View all features
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "features" && product.features && (
              <div>
                <h2 className="text-2xl font-extrabold mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-primary" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                    Product Features
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {product.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 p-4 rounded-2xl shadow-sm group hover:shadow-md transition-shadow"
                    >
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-full mr-3 transition-colors">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-gray-900 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h2 className="text-2xl font-extrabold mb-6 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-primary" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                    Technical Specifications
                  </span>
                </h2>

                {product.technical_specs &&
                  renderSpecTable(
                    product.technical_specs,
                    "General Specifications"
                  )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {product.electrical_data && (
                    <div>
                      {renderSpecTable(
                        product.electrical_data,
                        "Electrical Data"
                      )}
                    </div>
                  )}

                  {product.photometric_data && (
                    <div>
                      {renderSpecTable(
                        product.photometric_data,
                        "Photometric Data"
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {product.standards && (
                    <div>
                      {renderSpecTable(
                        Object.fromEntries(
                          Object.entries(product.standards).filter(
                            ([_, value]) => !Array.isArray(value)
                          )
                        ),
                        "Standards"
                      )}
                      {product.standards.compliance &&
                        renderListItems(
                          product.standards.compliance,
                          "Compliance"
                        )}
                    </div>
                  )}

                  {product.operating_conditions && (
                    <div>
                      {renderSpecTable(
                        product.operating_conditions,
                        "Temperature & Operating Conditions"
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "dimensions" && product.dimensions && (
              <div>
                <h2 className="text-2xl font-extrabold mb-6 flex items-center">
                  <Ruler className="w-6 h-6 mr-3 text-primary" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                    Product Dimensions
                  </span>
                </h2>
                {renderDimensions(product.dimensions)}
              </div>
            )}
          </div>
        </div>

        {additionalImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center">
              <ImageIcon className="w-6 h-6 mr-3 text-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                Product Functionality
              </span>
            </h2>
            <div className="relative px-6">
              {/* Navigation buttons - Enhanced with better styling */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
                <button
                  onClick={() => navigateFunctionality("prev")}
                  disabled={functionalityIndex === 0}
                  className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6 text-primary" />
                </button>
              </div>

              <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
                <button
                  onClick={() => navigateFunctionality("next")}
                  disabled={functionalityIndex >= maxFunctionalityIndex}
                  className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6 text-primary" />
                </button>
              </div>

              {/* Carousel container - Enhanced with better styling */}
              <div className="overflow-hidden">
                <div
                  ref={carouselRef}
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      functionalityIndex * (100 / visibleItems)
                    }%)`,
                  }}
                >
                  {additionalImages.map((image: any, index: number) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / visibleItems}%` }}
                    >
                      <div className="rounded-3xl overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                        <div
                          className="relative w-full cursor-pointer group"
                          style={{ height: "400px" }}
                          onClick={() => {
                            // Open lightbox with all product images + additional images
                            const allImages = [
                              ...productImages,
                              ...additionalImages.map((img: any) => img.image),
                            ];
                            setLightboxIndex(productImages.length + index);
                            setLightboxOpen(true);
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                          <Image
                            src={image.image || "/placeholder.svg"}
                            alt={image.title || "Product functionality"}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <div className="bg-primary/90 text-white p-3 rounded-full transform transition-transform group-hover:scale-110">
                              <Search className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 mt-auto">
                          <h3 className="text-lg font-bold text-center">
                            {image.title || `Feature ${index + 1}`}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {product.video_link && (
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center">
              <Video className="w-6 h-6 mr-3 text-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                Product Video
              </span>
            </h2>
            <div className="aspect-video relative rounded-3xl overflow-hidden shadow-lg">
              <iframe
                src={product.video_link}
                title={`${product.name} Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={productImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
