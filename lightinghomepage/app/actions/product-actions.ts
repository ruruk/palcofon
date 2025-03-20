"use server"

import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"

// Define types
type Product = {
  id: string
  name: string
  description: string
  main_image: string
  images?: string[]
  certification_images?: string[]
  wattage: string
  ip_rating: string
  warranty: string
  colour_temp: string
  category_id: string
  application_ids: string[]
  additional_images?: { title: string; image: string }[]
  video_link?: string
  video_type?: string
  PDF_link?: string
  price?: string
  gtin?: string
  condition?: string
  availability?: string
}

// Helper function to read products data
async function getProductsData(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "data", "products.json")
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

// Helper function to write products data
async function writeProductsData(data: Product[]): Promise<void> {
  const filePath = path.join(process.cwd(), "data", "products.json")
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
}

// Create a new product
export async function createProduct(product: Product) {
  try {
    const products = await getProductsData()

    // Check if ID already exists
    if (products.some((p) => p.id === product.id)) {
      return { success: false, message: "Product ID already exists" }
    }

    // Add the new product
    products.push(product)

    // Write back to file
    await writeProductsData(products)

    // Revalidate the products page to update the cache
    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: true, message: "Product created successfully" }
  } catch (error) {
    console.error("Error creating product:", error)
    return { success: false, message: "Failed to create product" }
  }
}

// Update an existing product
export async function updateProduct(product: Product) {
  try {
    const products = await getProductsData()

    // Find the product index
    const index = products.findIndex((p) => p.id === product.id)

    if (index === -1) {
      return { success: false, message: "Product not found" }
    }

    // Update the product
    products[index] = product

    // Write back to file
    await writeProductsData(products)

    // Revalidate the products page to update the cache
    revalidatePath("/admin/products")
    revalidatePath(`/products/${product.id}`)

    return { success: true, message: "Product updated successfully" }
  } catch (error) {
    console.error("Error updating product:", error)
    return { success: false, message: "Failed to update product" }
  }
}

// Delete a product
export async function deleteProduct(productId: string) {
  try {
    const products = await getProductsData()

    // Filter out the product to delete
    const updatedProducts = products.filter((p) => p.id !== productId)

    if (updatedProducts.length === products.length) {
      return { success: false, message: "Product not found" }
    }

    // Write back to file
    await writeProductsData(updatedProducts)

    // Revalidate the products page to update the cache
    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: true, message: "Product deleted successfully" }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { success: false, message: "Failed to delete product" }
  }
}

