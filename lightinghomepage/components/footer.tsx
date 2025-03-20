import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Home,
  Package,
  Layers,
  Info,
  MessageSquare,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
                Palcofon
              </h2>
              <p className="text-gray-400 font-bold text-lg">WE DRIVE SUSTAINABLE SOLUTIONS</p>
            </div>

            <div className="flex space-x-3">
              <Link
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <Facebook size={20} className="text-gray-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 hover:bg-blue-400 p-3 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <Twitter size={20} className="text-gray-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 hover:bg-pink-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <Instagram size={20} className="text-gray-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 hover:bg-blue-700 p-3 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin size={20} className="text-gray-400 group-hover:text-white" />
              </Link>
            </div>

            <div className="bg-gray-800/50 p-5 rounded-3xl border border-gray-700/50">
              <p className="text-sm text-gray-400">
                Palcofon is committed to sustainable lighting solutions that reduce energy consumption and environmental
                impact.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="bg-gray-800 p-2 rounded-xl group-hover:bg-blue-600/20 transition-colors duration-300">
                    <Home size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="flex items-center space-x-3 group">
                  <div className="bg-gray-800 p-2 rounded-xl group-hover:bg-blue-600/20 transition-colors duration-300">
                    <Package size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">Products</span>
                </Link>
              </li>
              <li>
                <Link href="/applications" className="flex items-center space-x-3 group">
                  <div className="bg-gray-800 p-2 rounded-xl group-hover:bg-blue-600/20 transition-colors duration-300">
                    <Layers size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                    Applications
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center space-x-3 group">
                  <div className="bg-gray-800 p-2 rounded-xl group-hover:bg-blue-600/20 transition-colors duration-300">
                    <Info size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center space-x-3 group">
                  <div className="bg-gray-800 p-2 rounded-xl group-hover:bg-blue-600/20 transition-colors duration-300">
                    <MessageSquare size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800 transition-colors duration-300 flex items-start space-x-3">
                <div className="bg-blue-600/20 p-2 rounded-xl">
                  <Phone size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Main Office</p>
                  <a href="tel:0676906707" className="text-white font-medium hover:text-blue-400 transition-colors">
                    067 690 6707
                  </a>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800 transition-colors duration-300 flex items-start space-x-3">
                <div className="bg-blue-600/20 p-2 rounded-xl">
                  <Phone size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sales</p>
                  <a href="tel:0823317877" className="text-white font-medium hover:text-blue-400 transition-colors">
                    082 331 7877
                  </a>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800 transition-colors duration-300 flex items-start space-x-3">
                <div className="bg-blue-600/20 p-2 rounded-xl">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">General Inquiries</p>
                  <a
                    href="mailto:info@palcofon.co.za"
                    className="text-white font-medium hover:text-blue-400 transition-colors"
                  >
                    info@palcofon.co.za
                  </a>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800 transition-colors duration-300 flex items-start space-x-3">
                <div className="bg-blue-600/20 p-2 rounded-xl">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Management</p>
                  <a
                    href="mailto:joe@palcofon.co.za"
                    className="text-white font-medium hover:text-blue-400 transition-colors"
                  >
                    joe@palcofon.co.za
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-400 font-medium">
            © {new Date().getFullYear()} Palcofon (Pty) Ltd. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">Sustainable lighting solutions for a brighter future.</p>
        </div>
      </div>
    </footer>
  )
}

