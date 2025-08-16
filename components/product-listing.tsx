"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Upload, Edit, Trash2, Package, CheckCircle, AlertCircle } from "lucide-react"
import { useProducts, type Product } from "@/contexts/product-context"

interface GrammarSuggestion {
  text: string
  suggestion: string
  type: "grammar" | "spelling" | "style"
  position: { start: number; end: number }
}

const grammarRules = [
  { pattern: /\bi\b/g, replacement: "I", type: "grammar" as const },
  { pattern: /\bteh\b/g, replacement: "the", type: "spelling" as const },
  { pattern: /\brecieve\b/g, replacement: "receive", type: "spelling" as const },
  { pattern: /\boccur\b/g, replacement: "occur", type: "spelling" as const },
  { pattern: /\bbenefits\s+includes?\b/g, replacement: "benefits include", type: "grammar" as const },
  { pattern: /\beffective\s+for\s+to\b/g, replacement: "effective for", type: "grammar" as const },
  { pattern: /\bvery\s+unique\b/g, replacement: "unique", type: "style" as const },
  { pattern: /\bmore\s+better\b/g, replacement: "better", type: "grammar" as const },
]

export function ProductListing() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [grammarSuggestions, setGrammarSuggestions] = useState<GrammarSuggestion[]>([])
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false)
  const [isCheckingWithN8n, setIsCheckingWithN8n] = useState(false)
  const [grammarCheckError, setGrammarCheckError] = useState<string>("")

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    applications: "",
    purity: "",
    image: "",
    price: "",
  })

  const checkGrammar = useCallback((text: string): GrammarSuggestion[] => {
    const suggestions: GrammarSuggestion[] = []

    grammarRules.forEach((rule) => {
      let match
      while ((match = rule.pattern.exec(text)) !== null) {
        suggestions.push({
          text: match[0],
          suggestion: rule.replacement,
          type: rule.type,
          position: { start: match.index, end: match.index + match[0].length },
        })
      }
      rule.pattern.lastIndex = 0 // Reset regex
    })

    return suggestions
  }, [])

  useEffect(() => {
    if (formData.description) {
      setIsCheckingGrammar(true)
      const timer = setTimeout(() => {
        const suggestions = checkGrammar(formData.description)
        setGrammarSuggestions(suggestions)
        setIsCheckingGrammar(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setGrammarSuggestions([])
      setIsCheckingGrammar(false)
    }
  }, [formData.description, checkGrammar])

  const applySuggestion = (suggestion: GrammarSuggestion) => {
    const { start, end } = suggestion.position
    const newDescription =
      formData.description.slice(0, start) + suggestion.suggestion + formData.description.slice(end)

    setFormData((prev) => ({ ...prev, description: newDescription }))
  }

  const checkGrammarWithN8n = async () => {
    if (!formData.description.trim()) {
      setGrammarCheckError("Please enter a description first")
      return
    }

    setIsCheckingWithN8n(true)
    setGrammarCheckError("")

    try {
      const response = await fetch("https://techi69.app.n8n.cloud/webhook-test/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: formData.description,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Update the description with corrected text
      if (data.correctedText || data.corrected_text || data.output) {
        const correctedText = data.correctedText || data.corrected_text || data.output
        setFormData((prev) => ({ ...prev, description: correctedText }))
        setGrammarCheckError("")
      } else {
        setGrammarCheckError("No corrected text received from grammar service")
      }
    } catch (error) {
      console.error("Grammar check error:", error)
      setGrammarCheckError("Failed to check grammar. Please try again.")
    } finally {
      setIsCheckingWithN8n(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      applications: formData.applications.split(",").map((app) => app.trim()),
      purity: formData.purity,
      image: formData.image || "/placeholder.svg?height=200&width=300",
      status: "Active" as const,
      price: formData.price ? Number.parseInt(formData.price) : undefined,
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
      setEditingProduct(null)
    } else {
      addProduct(productData)
    }

    // Reset form
    setFormData({
      name: "",
      category: "",
      description: "",
      applications: "",
      purity: "",
      image: "",
      price: "",
    })
    setImagePreview("")
    setIsAddingProduct(false)
    setGrammarSuggestions([])
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      applications: product.applications.join(", "),
      purity: product.purity,
      image: product.image,
      price: product.price?.toString() || "",
    })
    setImagePreview(product.image)
    setIsAddingProduct(true)
  }

  const handleDelete = (id: number) => {
    deleteProduct(id)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      applications: "",
      purity: "",
      image: "",
      price: "",
    })
    setImagePreview("")
    setIsAddingProduct(false)
    setEditingProduct(null)
    setGrammarSuggestions([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground">Product Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage your botanical extract products</p>
        </div>
        <Button
          onClick={() => setIsAddingProduct(true)}
          className="bg-primary hover:bg-primary/90"
          disabled={isAddingProduct}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add/Edit Product Form */}
      {isAddingProduct && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              {editingProduct ? "Edit Product" : "Add New Product"}
            </CardTitle>
            <CardDescription>
              {editingProduct
                ? "Update product information"
                : "Fill in the details to add a new botanical extract product"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Cardamom Extract"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spice Extract">Spice Extract</SelectItem>
                      <SelectItem value="Herbal Extract">Herbal Extract</SelectItem>
                      <SelectItem value="Essential Oil">Essential Oil</SelectItem>
                      <SelectItem value="Root Extract">Root Extract</SelectItem>
                      <SelectItem value="Flavor Extract">Flavor Extract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Purity */}
                <div className="space-y-2">
                  <Label htmlFor="purity">Purity Percentage *</Label>
                  <Input
                    id="purity"
                    value={formData.purity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, purity: e.target.value }))}
                    placeholder="e.g., 99.5%"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g., 299"
                  />
                </div>

                {/* Applications */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="applications">Applications *</Label>
                  <Input
                    id="applications"
                    value={formData.applications}
                    onChange={(e) => setFormData((prev) => ({ ...prev, applications: e.target.value }))}
                    placeholder="e.g., Food & Beverage, Aromatherapy (comma separated)"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  Product Description *
                  {isCheckingGrammar && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Checking grammar...
                    </div>
                  )}
                  {!isCheckingGrammar && grammarSuggestions.length === 0 && formData.description && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Looks good!
                    </div>
                  )}
                </Label>
                <div className="relative">
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the product, its properties, and benefits..."
                    rows={4}
                    required
                    spellCheck={true}
                    autoCorrect="on"
                    autoCapitalize="sentences"
                    className="resize-none min-w-[200px]"
                    data-gramm="true"
                    data-gramm_editor="true"
                    data-enable-grammarly="true"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={checkGrammarWithN8n}
                      disabled={isCheckingWithN8n || !formData.description.trim()}
                      className="bg-white/90 hover:bg-white text-xs px-2 py-1 h-auto"
                    >
                      {isCheckingWithN8n ? (
                        <>
                          <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin mr-1" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Check Grammar
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {grammarCheckError && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-800">{grammarCheckError}</span>
                    </div>
                  </div>
                )}

                {grammarSuggestions.length > 0 && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">Grammar & Style Suggestions</span>
                    </div>
                    <div className="space-y-2">
                      {grammarSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                          <div className="flex-1">
                            <span className="text-sm">
                              Replace "<span className="font-medium text-red-600">{suggestion.text}</span>" with "
                              <span className="font-medium text-green-600">{suggestion.suggestion}</span>"
                            </span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {suggestion.type}
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => applySuggestion(suggestion)}
                            className="ml-2"
                          >
                            Apply
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Use the "Check Grammar" button for AI-powered grammar correction via n8n workflow. You can repeat the
                  process until you get the perfect description.
                </p>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Products ({products.length})</CardTitle>
          <CardDescription>Manage your existing botanical extract products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-white">{product.purity}</Badge>
                  {product.price && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">₹{product.price}</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>

                    <p className="text-sm text-foreground line-clamp-3">{product.description}</p>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Applications:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.applications.map((app, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)} className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
