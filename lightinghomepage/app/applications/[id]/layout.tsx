import type React from "react"
import type { Metadata } from "next"
import applicationsData from "@/data/applications.json"

type Props = {
  children: React.ReactNode
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const application = applicationsData.find((app) => app.id === params.id)

  if (!application) {
    return {
      title: "Application Not Found",
      description: "The requested lighting application could not be found.",
    }
  }

  // Use the image path directly
  const imageUrl = application.main_image || "/placeholder.svg"

  return {
    title: `${application.name} | Palcofon Lighting Applications`,
    description: application.description || `Specialized lighting solutions for ${application.name} by Palcofon.`,
    openGraph: {
      title: `${application.name} | Palcofon Lighting Applications`,
      description: application.description || `Specialized lighting solutions for ${application.name} by Palcofon.`,
      images: [
        {
          url: imageUrl,
          alt: application.name,
        },
      ],
      type: "website",
      siteName: "Palcofon Lighting",
    },
    twitter: {
      card: "summary_large_image",
      title: application.name,
      description: application.description || `Specialized lighting solutions for ${application.name}.`,
      images: [imageUrl],
    },
    other: {
      "whatsapp-title": application.name,
      "whatsapp-description": application.description || `Specialized lighting solutions for ${application.name}.`,
      "whatsapp-image": imageUrl,
    },
  }
}

export default function ApplicationLayout({ children }: Props) {
  return children
}

