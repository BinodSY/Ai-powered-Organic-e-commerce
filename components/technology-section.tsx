import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Zap, Droplets, Thermometer } from "lucide-react"

export function TechnologySection() {
  const processSteps = [
    {
      step: "01",
      title: "Raw Material Preparation",
      description:
        "Carefully selected organic botanicals are cleaned, dried, and prepared for extraction to ensure optimal quality.",
    },
    {
      step: "02",
      title: "Supercritical CO₂ Extraction",
      description:
        "Using precise temperature and pressure controls, CO₂ becomes supercritical, acting as both liquid and gas to extract compounds.",
    },
    {
      step: "03",
      title: "Separation & Collection",
      description:
        "The CO₂ is separated from the extract through pressure reduction, leaving behind pure botanical compounds.",
    },
    {
      step: "04",
      title: "Quality Testing & Packaging",
      description:
        "Each batch undergoes rigorous testing for purity, potency, and safety before being packaged in protective containers.",
    },
  ]

  const advantages = [
    {
      icon: CheckCircle,
      title: "No Chemical Residues",
      description: "CO₂ leaves no harmful residues, ensuring pure, clean extracts",
    },
    {
      icon: Zap,
      title: "Selective Extraction",
      description: "Precise control allows targeting of specific compounds",
    },
    {
      icon: Droplets,
      title: "Preserves Integrity",
      description: "Low temperatures maintain the natural structure of compounds",
    },
    {
      icon: Thermometer,
      title: "Environmentally Safe",
      description: "CO₂ is non-toxic, recyclable, and environmentally friendly",
    },
  ]

  return (
    <section id="technology" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-black text-4xl md:text-5xl text-slate-600 mb-6">
            Advanced <span className="text-rose-600">CO₂ Extraction</span> Technology
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our state-of-the-art supercritical CO₂ extraction process delivers unparalleled purity and potency while
            preserving the natural integrity of botanical compounds.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="font-serif font-bold text-3xl text-center text-slate-600 mb-12">Our Extraction Process</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-pink-50 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h4 className="font-serif font-bold text-lg text-slate-600 mb-4">{step.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Connector Arrow */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-rose-600 to-pink-500"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-pink-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-500 rounded-2xl p-12 text-white">
          <h3 className="font-serif font-bold text-3xl text-center mb-12">Why Supercritical CO₂ Extraction?</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-serif font-bold text-lg mb-3">{advantage.title}</h4>
                <p className="text-white text-opacity-90 leading-relaxed text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-12">
          <h3 className="font-serif font-bold text-3xl text-center text-slate-600 mb-12">Technical Specifications</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">300+ Bar</div>
              <div className="text-lg text-slate-600">Operating Pressure</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-500 mb-2">31-80°C</div>
              <div className="text-lg text-slate-600">Temperature Range</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">99.9%</div>
              <div className="text-lg text-slate-600">CO₂ Purity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
