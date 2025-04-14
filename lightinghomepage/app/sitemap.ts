import type { MetadataRoute } from "next";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import applicationsData from "@/data/applications.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const now = new Date();

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/applications`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Product pages
  const productRoutes = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Application pages
  const applicationRoutes = applicationsData.map((application) => ({
    url: `${baseUrl}/applications/${application.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Category filters (if used as individual pages)
  const categoryRoutes = categoriesData.map((category) => ({
    url: `${baseUrl}/products?category=${category.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...productRoutes, ...applicationRoutes, ...categoryRoutes];
}
