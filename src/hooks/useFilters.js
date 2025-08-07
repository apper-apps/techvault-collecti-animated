import { useState, useMemo } from "react"

export const useFilters = (products) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    brands: [],
    minRam: "",
    minStorage: ""
  })
  
  const [sortBy, setSortBy] = useState("name")

  const filteredProducts = useMemo(() => {
    if (!products) return []

    let filtered = products.filter(product => {
      const priceInRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
      
      let ramMatch = true
      if (filters.minRam) {
        const productRam = parseInt(product.ram.match(/\d+/)?.[0] || "0")
        const minRam = parseInt(filters.minRam)
        ramMatch = productRam >= minRam
      }

      let storageMatch = true
      if (filters.minStorage) {
        const productStorage = parseInt(product.storage.match(/\d+/)?.[0] || "0")
        const minStorage = parseInt(filters.minStorage)
        storageMatch = productStorage >= minStorage
      }

      return priceInRange && brandMatch && ramMatch && storageMatch
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "brand":
          return a.brand.localeCompare(b.brand)
        default:
          return 0
      }
    })

    return filtered
  }, [products, filters, sortBy])

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      brands: [],
      minRam: "",
      minStorage: ""
    })
    setSortBy("name")
  }

  return {
    filters,
    sortBy,
    filteredProducts,
    updateFilters,
    setSortBy,
    resetFilters
  }
}