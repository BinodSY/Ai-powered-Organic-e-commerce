"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProducts } from "@/contexts/product-context"

export function ProductsSection() {
  const { getActiveProducts } = useProducts()
  const products = getActiveProducts()

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-black text-4xl md:text-5xl text-slate-600 mb-6">
            Premium <span className="text-rose-600">Botanical</span> Extracts
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our comprehensive range of CO₂ extracts, essential oils, and oleoresins delivers unmatched purity and
            potency for your manufacturing needs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-rose-600 text-white font-semibold">{product.purity}</Badge>
                </div>
                {product.price && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white font-semibold">₹{product.price}</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="font-serif font-bold text-xl text-slate-600">{product.name}</CardTitle>
                <p className="text-sm text-pink-500 font-medium">{product.category}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Product Description */}
                  <div>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{product.description}</p>
                  </div>

                  {/* Applications */}
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Applications:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.applications.map((app, appIndex) => (
                        <Badge key={appIndex} variant="outline" className="text-xs border-rose-600 text-rose-600">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Request Sample Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-200 bg-transparent"
                  >
                    Request Sample
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-12">
          <h3 className="font-serif font-bold text-2xl text-slate-600 mb-4">Need a Custom Extract?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Our team of extraction specialists can develop custom botanical extracts tailored to your specific
            requirements. Contact us to discuss your unique needs.
          </p>
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-pink-500 text-white font-semibold px-8 py-4 transition-all duration-200 transform hover:scale-105"
          >
            Discuss Custom Solutions
          </Button>
        </div>
      </div>
    </section>
  )
}
