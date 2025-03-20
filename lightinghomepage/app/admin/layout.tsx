import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { LayoutDashboard, Package, Tag, Layers, Settings, LogOut } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | Palcofon",
  description: "Manage your lighting products, categories, and applications",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Palcofon Admin</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100">
                <Package className="w-5 h-5 mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/categories"
                className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Tag className="w-5 h-5 mr-3" />
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/admin/applications"
                className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Layers className="w-5 h-5 mr-3" />
                Applications
              </Link>
            </li>
            <li className="pt-6 mt-6 border-t">
              <Link href="/admin/settings" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100">
                <LogOut className="w-5 h-5 mr-3" />
                Back to Site
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Palcofon Admin</h1>
        <div className="relative group">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <nav className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-focus-within:block">
            <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            <Link href="/admin/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Products
            </Link>
            <Link href="/admin/categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Categories
            </Link>
            <Link href="/admin/applications" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Applications
            </Link>
            <Link href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Back to Site
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}

