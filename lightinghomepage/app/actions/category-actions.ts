"use server"

import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"

// Define types
type Category = {
  id: string
  name: string
}

// Helper function to read categories data
async function getCategoriesData(): Promise<Category[]> {
  const filePath = path.join(process.cwd(), "data", "categories.json")
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

// Helper function to write categories data
async function writeCategoriesData(data: Category[]): Promise<void> {
  const filePath = path.join(process.cwd(), "data", "categories.json")
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
}

// Create a new category
export async function createCategory(category: Category) {
  try {
    const categories = await getCategoriesData()

    // Check if ID already exists
    if (categories.some((c) => c.id === category.id)) {
      return { success: false, message: "Category ID already exists" }
    }

    // Add the new category
    categories.push(category)

    // Write back to file
    await writeCategoriesData(categories)

    // Revalidate the categories page to update the cache
    revalidatePath("/admin/categories")
    revalidatePath("/products")

    return { success: true, message: "Category created successfully" }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, message: "Failed to create category" }
  }
}

// Update an existing category
export async function updateCategory(category: Category) {
  try {
    const categories = await getCategoriesData()

    // Find the category index
    const index = categories.findIndex((c) => c.id === category.id)

    if (index === -1) {
      return { success: false, message: "Category not found" }
    }

    // Update the category
    categories[index] = category

    // Write back to file
    await writeCategoriesData(categories)

    // Revalidate the categories page to update the cache
    revalidatePath("/admin/categories")
    revalidatePath("/products")

    return { success: true, message: "Category updated successfully" }
  } catch (error) {
    console.error("Error updating category:", error)
    return { success: false, message: "Failed to update category" }
  }
}

// Delete a category
export async function deleteCategory(categoryId: string) {
  try {
    const categories = await getCategoriesData()

    // Filter out the category to delete
    const updatedCategories = categories.filter((c) => c.id !== categoryId)

    if (updatedCategories.length === categories.length) {
      return { success: false, message: "Category not found" }
    }

    // Write back to file
    await writeCategoriesData(updatedCategories)

    // Revalidate the categories page to update the cache
    revalidatePath("/admin/categories")
    revalidatePath("/products")

    return { success: true, message: "Category deleted successfully" }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { success: false, message: "Failed to delete category" }
  }
}

