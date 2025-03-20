"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type SelectedProduct = {
  id: string
  name: string
  quantity: number
}

type ProductInquiryContextType = {
  selectedProducts: SelectedProduct[]
  addToInquiry: (product: { id: string; name: string }) => void
  removeFromInquiry: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearInquiry: () => void
}

// Create a custom event for inquiry updates
const INQUIRY_UPDATED_EVENT = "product-inquiry-updated"

const ProductInquiryContext = createContext<ProductInquiryContextType | undefined>(undefined)

export const ProductInquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])

  // Load products from localStorage on initial mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("selectedProducts")
      if (storedProducts) {
        console.log("Loading products from localStorage:", storedProducts)
        setSelectedProducts(JSON.parse(storedProducts))
      }
    } catch (error) {
      console.error("Error loading products from localStorage:", error)
    }
  }, [])

  // Helper function to update localStorage and dispatch event
  const updateStorageAndNotify = (products: SelectedProduct[]) => {
    try {
      console.log("Saving products to localStorage:", products)
      localStorage.setItem("selectedProducts", JSON.stringify(products))

      // Dispatch custom event to notify all components
      window.dispatchEvent(
        new CustomEvent(INQUIRY_UPDATED_EVENT, {
          detail: { products },
        }),
      )
    } catch (error) {
      console.error("Error saving products to localStorage:", error)
    }
  }

  const addToInquiry = (product: { id: string; name: string }) => {
    console.log("Adding product to inquiry:", product)

    // Get the latest data from localStorage first
    let currentProducts: SelectedProduct[] = []
    try {
      const storedProducts = localStorage.getItem("selectedProducts")
      currentProducts = storedProducts ? JSON.parse(storedProducts) : []
    } catch (error) {
      console.error("Error reading from localStorage:", error)
    }

    // Check if product already exists
    const existingProductIndex = currentProducts.findIndex((p) => p.id === product.id)

    if (existingProductIndex >= 0) {
      // Update quantity if product exists
      currentProducts[existingProductIndex].quantity += 1
    } else {
      // Add new product if it doesn't exist
      currentProducts.push({ ...product, quantity: 1 })
    }

    // Update state
    setSelectedProducts(currentProducts)

    // Update localStorage and notify components
    updateStorageAndNotify(currentProducts)
  }

  const removeFromInquiry = (productId: string) => {
    console.log("Removing product from inquiry:", productId)

    // Get the latest data from localStorage first
    let currentProducts: SelectedProduct[] = []
    try {
      const storedProducts = localStorage.getItem("selectedProducts")
      currentProducts = storedProducts ? JSON.parse(storedProducts) : []
    } catch (error) {
      console.error("Error reading from localStorage:", error)
    }

    // Filter out the product
    const updatedProducts = currentProducts.filter((p) => p.id !== productId)

    // Update state
    setSelectedProducts(updatedProducts)

    // Update localStorage and notify components
    updateStorageAndNotify(updatedProducts)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    console.log("Updating product quantity:", productId, quantity)

    if (quantity <= 0) {
      removeFromInquiry(productId)
      return
    }

    // Get the latest data from localStorage first
    let currentProducts: SelectedProduct[] = []
    try {
      const storedProducts = localStorage.getItem("selectedProducts")
      currentProducts = storedProducts ? JSON.parse(storedProducts) : []
    } catch (error) {
      console.error("Error reading from localStorage:", error)
    }

    // Update the quantity
    const updatedProducts = currentProducts.map((p) => (p.id === productId ? { ...p, quantity } : p))

    // Update state
    setSelectedProducts(updatedProducts)

    // Update localStorage and notify components
    updateStorageAndNotify(updatedProducts)
  }

  const clearInquiry = () => {
    console.log("Clearing all products from inquiry")

    // Clear state
    setSelectedProducts([])

    // Clear localStorage and notify components
    updateStorageAndNotify([])
  }

  return (
    <ProductInquiryContext.Provider
      value={{
        selectedProducts,
        addToInquiry,
        removeFromInquiry,
        updateQuantity,
        clearInquiry,
      }}
    >
      {children}
    </ProductInquiryContext.Provider>
  )
}

export const useProductInquiry = () => {
  const context = useContext(ProductInquiryContext)
  if (context === undefined) {
    throw new Error("useProductInquiry must be used within a ProductInquiryProvider")
  }
  return context
}

// Export the event name for components to listen to
export const PRODUCT_INQUIRY_UPDATED = INQUIRY_UPDATED_EVENT

