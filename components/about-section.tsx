import { Card, CardContent } from "@/components/ui/card"
import { Microscope, Leaf, Shield, Users } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Microscope,
      title: "Scientifically Proven Methods",
      description:
        "Our supercritical CO₂ extraction process ensures maximum purity and potency while preserving the natural integrity of botanical compounds.",
    },
    {
      icon: Leaf,
      title: "Natural and Sustainable Sourcing",
      description:
        "We partner with certified organic farms to source the finest botanicals, ensuring sustainability and environmental responsibility.",
    },
    {
      icon: Shield,
      title: "Dedicated to Quality and Purity",
      description:
        "Every batch undergoes rigorous testing and quality control measures to meet the highest industry standards for pharmaceutical and food applications.",
    },
    {
      icon: Users,
      title: "Trusted by Industry Leaders",
      description:
        "Leading manufacturers in food, cosmetics, and pharmaceuticals rely on our expertise and consistent quality for their premium products.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-black text-4xl md:text-5xl text-slate-600 mb-6">
            Why Choose <span className="text-rose-600">Pure Extracts</span>?
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            At Pure Extracts, we combine cutting-edge supercritical CO₂ extraction technology with the purity of nature.
            Our commitment to quality ensures that you receive the finest botanical compounds for your products.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-pink-50"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-600 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-rose-600 to-pink-500 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Satisfied Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Purity Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Quality Control</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
