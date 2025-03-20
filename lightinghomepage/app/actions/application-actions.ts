"use server"

import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"

// Define types
type Application = {
  id: string
  name: string
  subname: string
  main_image: string
  certification_images: string[]
  description: string
  product_ids: string[]
  PDF_link: string
}

// Helper function to read applications data
async function getApplicationsData(): Promise<Application[]> {
  const filePath = path.join(process.cwd(), "data", "applications.json")
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

// Helper function to write applications data
async function writeApplicationsData(data: Application[]): Promise<void> {
  const filePath = path.join(process.cwd(), "data", "applications.json")
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
}

// Create a new application
export async function createApplication(application: Application) {
  try {
    const applications = await getApplicationsData()

    // Check if ID already exists
    if (applications.some((a) => a.id === application.id)) {
      return { success: false, message: "Application ID already exists" }
    }

    // Add the new application
    applications.push(application)

    // Write back to file
    await writeApplicationsData(applications)

    // Revalidate the applications page to update the cache
    revalidatePath("/admin/applications")
    revalidatePath("/applications")

    return { success: true, message: "Application created successfully" }
  } catch (error) {
    console.error("Error creating application:", error)
    return { success: false, message: "Failed to create application" }
  }
}

// Update an existing application
export async function updateApplication(application: Application) {
  try {
    const applications = await getApplicationsData()

    // Find the application index
    const index = applications.findIndex((a) => a.id === application.id)

    if (index === -1) {
      return { success: false, message: "Application not found" }
    }

    // Update the application
    applications[index] = application

    // Write back to file
    await writeApplicationsData(applications)

    // Revalidate the applications page to update the cache
    revalidatePath("/admin/applications")
    revalidatePath(`/applications/${application.id}`)

    return { success: true, message: "Application updated successfully" }
  } catch (error) {
    console.error("Error updating application:", error)
    return { success: false, message: "Failed to update application" }
  }
}

// Delete an application
export async function deleteApplication(applicationId: string) {
  try {
    const applications = await getApplicationsData()

    // Filter out the application to delete
    const updatedApplications = applications.filter((a) => a.id !== applicationId)

    if (updatedApplications.length === applications.length) {
      return { success: false, message: "Application not found" }
    }

    // Write back to file
    await writeApplicationsData(updatedApplications)

    // Revalidate the applications page to update the cache
    revalidatePath("/admin/applications")
    revalidatePath("/applications")

    return { success: true, message: "Application deleted successfully" }
  } catch (error) {
    console.error("Error deleting application:", error)
    return { success: false, message: "Failed to delete application" }
  }
}

