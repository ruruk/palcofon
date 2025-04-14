import type React from "react";
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productsData.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const category = categoriesData.find((c) => c.id === product.category_id);
  const categoryName = category ? category.name : "Product";

  // Use the image path directly - for production, you would want to use absolute URLs
  const imageUrl = product.main_image || "/placeholder.svg";

  // Create absolute URL for the image
  const absoluteImageUrl = new URL(
    imageUrl,
    process.env.NEXT_PUBLIC_SITE_URL
  ).toString();

  return {
    title: `${product.name} | Palcofon Lighting`,
    description:
      product.description ||
      `High-quality ${categoryName} lighting solution by Palcofon.`,
    openGraph: {
      title: `${product.name} | Palcofon Lighting`,
      description:
        product.description ||
        `High-quality ${categoryName} lighting solution by Palcofon.`,
      images: [
        {
          url: absoluteImageUrl,
          alt: product.name,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
      siteName: "Palcofon Lighting",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description:
        product.description ||
        `High-quality ${categoryName} lighting solution by Palcofon.`,
      images: [absoluteImageUrl],
    },
    other: {
      "og:product:price:amount": product.price || "0.00",
      "og:product:price:currency": "ZAR",
      "og:product:availability": "in stock",
      "og:product:brand": "Palcofon Lighting",
      "og:product:retailer_item_id": product.id,
      "og:product:category": categoryName,
      "whatsapp-title": product.name,
      "whatsapp-description":
        product.description ||
        `High-quality ${categoryName} lighting solution.`,
      "whatsapp-image": absoluteImageUrl,
    },
  };
}

export default function ProductLayout({ children }: Props) {
  return children;
}
