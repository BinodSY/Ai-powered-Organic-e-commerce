import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Beaker, Award } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-white via-pink-50 to-white py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-rose-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-pink-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-rose-600 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl text-slate-600 leading-tight">
                Harness the Power of <span className="text-rose-600">Nature</span> with{" "}
                <span className="text-pink-500">Precision Extraction</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                Premium botanical extracts for the food, cosmetics, and pharmaceutical industries. Experience the purity
                of supercritical CO₂ extraction technology.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <Leaf className="w-4 h-4 text-rose-600" />
                <span className="text-sm font-medium text-slate-600">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <Beaker className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-slate-600">Scientific Precision</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <Award className="w-4 h-4 text-rose-600" />
                <span className="text-sm font-medium text-slate-600">Premium Quality</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-rose-600 hover:bg-pink-500 text-white font-semibold px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105 group"
              >
                Discover Our Solutions
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white font-semibold px-8 py-4 text-lg transition-all duration-200 bg-transparent"
              >
                View Products
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="CO₂ Extraction Laboratory"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute -top-4 -right-4 bg-rose-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                CO₂ Extraction
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-rose-600">99.9%</div>
              <div className="text-sm text-slate-600">Purity Rate</div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-pink-500">8+</div>
              <div className="text-sm text-slate-600">Premium Extracts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
