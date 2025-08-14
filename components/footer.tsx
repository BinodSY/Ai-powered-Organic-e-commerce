import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-rose-600" />
              <h3 className="font-serif font-black text-2xl">Pure Extracts</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Leading provider of premium botanical extracts using advanced supercritical CO₂ extraction technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-rose-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-rose-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-rose-600 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#technology" className="text-gray-300 hover:text-rose-600 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-rose-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">CO₂ Extracts</span>
              </li>
              <li>
                <span className="text-gray-300">Essential Oils</span>
              </li>
              <li>
                <span className="text-gray-300">Oleoresins</span>
              </li>
              <li>
                <span className="text-gray-300">Total Extracts</span>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Industries</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Food & Beverage</span>
              </li>
              <li>
                <span className="text-gray-300">Cosmetics</span>
              </li>
              <li>
                <span className="text-gray-300">Pharmaceuticals</span>
              </li>
              <li>
                <span className="text-gray-300">Aromatherapy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-500 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© 2024 Pure Extracts. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-rose-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-rose-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-rose-600 transition-colors">
              Quality Certifications
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
