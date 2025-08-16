"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Product {
  id: number
  name: string
  category: string
  description: string
  applications: string[]
  purity: string
  image: string
  status: "Active" | "Inactive"
  price?: number
}

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: number, product: Omit<Product, "id">) => void
  deleteProduct: (id: number) => void
  getActiveProducts: () => Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Cardamom Extract",
    category: "Spice Extract",
    description:
      "Premium cardamom extract with intense aromatic profile, perfect for culinary and therapeutic applications. Extracted using advanced CO₂ methods to preserve natural compounds.",
    applications: ["Food & Beverage", "Aromatherapy"],
    purity: "99.5%",
    image: "https://ucarecdn.com/668270ce-afdd-48d9-afe8-807322a43dbe/-/preview/1000x1000/",
    status: "Active",
    price: 299,
  },
  {
    id: 2,
    name: "Turmeric Extract",
    category: "Herbal Extract",
    description:
      "High-curcumin turmeric extract with potent anti-inflammatory properties. Standardized for consistent bioactive compound concentration in pharmaceutical formulations.",
    applications: ["Pharmaceuticals", "Cosmetics"],
    purity: "95.0%",
    image: "https://ucarecdn.com/65313065-a63e-4633-a77c-a214b931d7a8/-/preview/1000x1000/",
    status: "Active",
    price: 199,
  },
  {
    id: 3,
    name: "Cinnamon Extract",
    category: "Spice Extract",
    description:
      "Ceylon cinnamon extract with sweet, delicate flavor profile. Rich in cinnamaldehyde and perfect for nutraceutical and food industry applications.",
    applications: ["Food & Beverage", "Nutraceuticals"],
    purity: "98.2%",
    image:
      "https://ucarecdn.com/23107f02-dd36-4bd3-acf3-e8aaff09b4f2/-/preview/1000x1000/",
    status: "Active",
    price: 249,
  },
  {
    id: 4,
    name: "Ginger Extract",
    category: "Root Extract",
    description:
      "Concentrated ginger extract with high gingerol content for digestive health and anti-inflammatory benefits.",
    applications: ["Pharmaceuticals", "Food & Beverage"],
    purity: "96.8%",
    image: "https://ucarecdn.com/4f3a85e8-4f5a-4893-8a0c-10be52127f25/-/preview/1000x1000/",
    status: "Active",
    price: 179,
  },
  {
    id: 5,
    name: "Black Pepper Extract",
    category: "Spice Extract",
    description: "Premium black pepper extract rich in piperine, enhancing bioavailability of other compounds.",
    applications: ["Nutraceuticals", "Food & Beverage"],
    purity: "97.5%",
    image: "https://ucarecdn.com/23876679-0e65-4880-b9e5-02b4208b9bef/-/preview/1000x1000/",
    status: "Active",
    price: 229,
  },
  {
    id: 6,
    name: "Clove Extract",
    category: "Spice Extract",
    description:
      "High-quality clove extract with antimicrobial properties, perfect for oral care and food preservation.",
    applications: ["Cosmetics", "Food & Beverage"],
    purity: "98.9%",
    image: "https://ucarecdn.com/ccd2bb33-7713-4c36-9bf3-5763fb6081c2/-/preview/1000x1000/",
    status: "Active",
    price: 269,
  },
]

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("organic-products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(initialProducts)
    }
  }, [])

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("organic-products", JSON.stringify(products))
    }
  }, [products])

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: number, productData: Omit<Product, "id">) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...productData, id } : product)))
  }

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const getActiveProducts = () => {
    return products.filter((product) => product.status === "Active")
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getActiveProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
