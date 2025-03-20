import type { MetadataRoute } from "next"
import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"
import applicationsData from "@/data/applications.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://palcofon.co.za"

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/applications`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Product routes
  const productRoutes = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Application routes
  const applicationRoutes = applicationsData.map((application) => ({
    url: `${baseUrl}/applications/${application.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Category routes (if they have dedicated pages)
  const categoryRoutes = categoriesData.map((category) => ({
    url: `${baseUrl}/products?category=${category.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...routes, ...productRoutes, ...applicationRoutes, ...categoryRoutes]
}

