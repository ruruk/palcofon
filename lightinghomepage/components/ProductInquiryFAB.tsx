"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import InquiryModal from "./InquiryModal"
import { useProductInquiry, PRODUCT_INQUIRY_UPDATED } from "@/contexts/ProductInquiryContext"

export default function ProductInquiryFAB() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { selectedProducts } = useProductInquiry()
  const [count, setCount] = useState(0)

  // Update count when selectedProducts changes or when the custom event is fired
  useEffect(() => {
    const updateCount = () => {
      try {
        // Always get the latest data from localStorage
        const storedProducts = localStorage.getItem("selectedProducts")
        const products = storedProducts ? JSON.parse(storedProducts) : []
        const totalItems = products.reduce((sum, product) => sum + product.quantity, 0)
        setCount(totalItems)
      } catch (error) {
        console.error("Error calculating product count:", error)
        setCount(0)
      }
    }

    // Initial count
    updateCount()

    // Listen for custom event
    const handleInquiryUpdate = () => {
      console.log("ProductInquiryFAB: Received inquiry update event")
      updateCount()
    }

    window.addEventListener(PRODUCT_INQUIRY_UPDATED, handleInquiryUpdate)

    return () => {
      window.removeEventListener(PRODUCT_INQUIRY_UPDATED, handleInquiryUpdate)
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-primary text-white px-5 py-3 rounded-2xl shadow-xl hover:bg-primary/90 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-3 z-40 font-semibold"
      >
        <span className="hidden sm:inline text-base">Product Inquiries</span>
        <ShoppingCart className="h-7 w-7" />
        {count > 0 && (
          <span className="absolute -top-3 -right-3 bg-red-500 text-white text-sm font-bold rounded-full h-7 w-7 flex items-center justify-center border-2 border-white animate-pulse">
            {count}
          </span>
        )}
      </button>
      <InquiryModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

