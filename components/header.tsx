"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-serif font-black text-2xl text-rose-600">Pure Extracts</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#about" className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium">
              About
            </a>
            <a
              href="#products"
              className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium"
            >
              Products
            </a>
            <a
              href="#technology"
              className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium"
            >
              Technology
            </a>
            <a
              href="#contact"
              className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-rose-600 hover:bg-pink-500 text-white font-semibold px-6 py-2 transition-all duration-200 transform hover:scale-105">
              Request Sample
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium">
                Home
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#products"
                className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium"
              >
                Products
              </a>
              <a
                href="#technology"
                className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium"
              >
                Technology
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-rose-600 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
              <Button className="bg-rose-600 hover:bg-pink-500 text-white font-semibold w-full mt-4">
                Request Sample
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
