"use client"

import { useEffect } from "react"

export function initCarousels() {
  useEffect(() => {
    // Categories carousel
    const categoriesCarousel = document.getElementById("categories-carousel")
    const prevCategoryBtn = document.getElementById("prev-category")
    const nextCategoryBtn = document.getElementById("next-category")

    let categoryPosition = 0
    const categoryItemWidth = categoriesCarousel?.firstElementChild?.clientWidth || 0
    const categoryItemCount = categoriesCarousel?.children.length || 0
    const categoryVisibleItems = 3
    const categoryMaxPosition = Math.max(0, categoryItemCount - categoryVisibleItems)

    const updateCategoryPosition = () => {
      if (categoriesCarousel) {
        categoriesCarousel.style.transform = `translateX(-${categoryPosition * categoryItemWidth}px)`
      }
    }

    prevCategoryBtn?.addEventListener("click", () => {
      categoryPosition = Math.max(0, categoryPosition - 1)
      updateCategoryPosition()
    })

    nextCategoryBtn?.addEventListener("click", () => {
      categoryPosition = Math.min(categoryMaxPosition, categoryPosition + 1)
      updateCategoryPosition()
    })

    // Products carousel
    const productsCarousel = document.getElementById("products-carousel")
    const prevProductBtn = document.getElementById("prev-product")
    const nextProductBtn = document.getElementById("next-product")

    let productPosition = 0
    const productItemWidth = productsCarousel?.firstElementChild?.clientWidth || 0
    const productItemCount = productsCarousel?.children.length || 0
    const productVisibleItems = 3
    const productMaxPosition = Math.max(0, productItemCount - productVisibleItems)

    const updateProductPosition = () => {
      if (productsCarousel) {
        productsCarousel.style.transform = `translateX(-${productPosition * productItemWidth}px)`
      }
    }

    prevProductBtn?.addEventListener("click", () => {
      productPosition = Math.max(0, productPosition - 1)
      updateProductPosition()
    })

    nextProductBtn?.addEventListener("click", () => {
      productPosition = Math.min(productMaxPosition, productPosition + 1)
      updateProductPosition()
    })

    // Handle window resize
    const handleResize = () => {
      // Reset positions
      categoryPosition = 0
      productPosition = 0
      updateCategoryPosition()
      updateProductPosition()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      prevCategoryBtn?.removeEventListener("click", () => {})
      nextCategoryBtn?.removeEventListener("click", () => {})
      prevProductBtn?.removeEventListener("click", () => {})
      nextProductBtn?.removeEventListener("click", () => {})
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return null
}

