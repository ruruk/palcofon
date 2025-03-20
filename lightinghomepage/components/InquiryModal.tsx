"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import {
  useProductInquiry,
  PRODUCT_INQUIRY_UPDATED,
} from "@/contexts/ProductInquiryContext";
import productsData from "@/data/products.json";

type InquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { removeFromInquiry, updateQuantity, clearInquiry } =
    useProductInquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [products, setProducts] = useState<
    Array<{ id: string; name: string; quantity: number }>
  >([]);

  // Load products from localStorage whenever the modal is opened or when the custom event is fired
  useEffect(() => {
    if (!isOpen) return;

    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem("selectedProducts");
        if (storedProducts) {
          console.log(
            "InquiryModal: Loading products from localStorage",
            storedProducts
          );
          setProducts(JSON.parse(storedProducts));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error loading products in modal:", error);
        setProducts([]);
      }
    };

    // Initial load
    loadProducts();

    // Listen for custom event
    const handleInquiryUpdate = () => {
      console.log("InquiryModal: Received inquiry update event");
      loadProducts();
    };

    window.addEventListener(PRODUCT_INQUIRY_UPDATED, handleInquiryUpdate);

    return () => {
      window.removeEventListener(PRODUCT_INQUIRY_UPDATED, handleInquiryUpdate);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // Get the latest data from localStorage
      const storedProducts = localStorage.getItem("selectedProducts");
      const currentProducts = storedProducts ? JSON.parse(storedProducts) : [];

      // Send the inquiry to the PHP endpoint
      const response = await fetch(
        "https://comrobi.com/palcofon/api/send-inquiry.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedProducts: currentProducts,
            email,
            message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setEmail("");
        setMessage("");

        // Clear all products after successful submission
        clearInquiry();
      } else {
        throw new Error(result.message || "Failed to send inquiry");
      }
    } catch (error) {
      console.error("Error submitting inquiry:");
      setSubmitError(
        `Failed to send inquiry. Please try again. Error: ${"Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center p-3 sm:p-5 border-b bg-gray-50 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">Product Inquiry</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-3 sm:p-6">
          {submitSuccess ? (
            <div className="text-center py-12 px-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="text-green-600 font-bold mb-4 text-2xl">
                Your inquiry has been submitted successfully!
              </div>
              <p className="text-gray-600 mb-8 text-lg">
                We'll get back to you as soon as possible.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg font-semibold text-base sm:text-lg"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Selected Products
                </h3>
                {products.length === 0 ? (
                  <div className="text-center py-6 sm:py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                    <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
                    <p className="text-gray-600 font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                      No products selected yet.
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base px-2">
                      Browse products and click "Add to Inquiry" to add them
                      here.
                    </p>
                  </div>
                ) : (
                  products.map((product) => {
                    const productDetails = productsData.find(
                      (p) => p.id === product.id
                    );
                    return (
                      <div
                        key={product.id}
                        className="flex items-center justify-between py-2 sm:py-4 px-2 sm:px-3 border-b hover:bg-gray-50 rounded-xl my-1 sm:my-2 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative h-14 w-14 sm:h-20 sm:w-20 overflow-hidden rounded-xl border-2 border-gray-100">
                            <Image
                              src={
                                productDetails?.main_image || "/placeholder.svg"
                              }
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm sm:text-base ml-2 sm:ml-4">
                            {product.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                Math.max(0, product.quantity - 1)
                              )
                            }
                            className="p-1 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <span className="font-bold text-base sm:text-lg w-5 sm:w-6 text-center">
                            {product.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, product.quantity + 1)
                            }
                            className="p-1 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromInquiry(product.id)}
                            className="p-1 sm:p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 ml-1 sm:ml-2 transition-colors"
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                  placeholder="Your email address"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              {submitError && (
                <p className="text-red-500 font-medium p-3 bg-red-50 rounded-xl">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || products.length === 0}
                className="w-full inline-flex justify-center items-center px-4 py-3 sm:px-6 sm:py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg transition-all hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
