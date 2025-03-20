import Image from "next/image"
import Link from "next/link"
import { Layers } from 'lucide-react'
import applicationsData from "@/data/applications.json"

export default function ApplicationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col mb-8">
        <span className="text-primary font-bold uppercase tracking-wider text-sm">Explore Our Solutions</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Lighting Applications</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {applicationsData.map((application) => (
          <Link href={`/applications/${application.id}`} key={application.id} className="group">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 transform hover:scale-105">
              <Image
                src={application.main_image || "/placeholder.svg"}
                alt={application.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">{application.name}</h2>
                <p className="text-sm font-medium opacity-90">{application.subname}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

