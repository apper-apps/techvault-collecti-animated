import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import FilterSidebar from "@/components/organisms/FilterSidebar"
import ProductGrid from "@/components/organisms/ProductGrid"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { useCart } from "@/hooks/useCart"
import { useFilters } from "@/hooks/useFilters"
import productService from "@/services/api/productService"

const ShopPage = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  
  const { addToCart } = useCart()
  const { filters, sortBy, filteredProducts, updateFilters, setSortBy, resetFilters } = useFilters(products)

  const loadProducts = async (abortSignal) => {
    try {
      setLoading(true)
      setError("")
      
      const searchQuery = searchParams.get("search")
      let data
      
      if (searchQuery) {
        data = await productService.searchProducts(searchQuery)
      } else {
        data = await productService.getAll()
      }
      
      // Check if component is still mounted before updating state
      if (!abortSignal?.aborted) {
        setProducts(data)
      }
    } catch (err) {
      // Only update state if not aborted and component is still mounted
      if (!abortSignal?.aborted) {
        setError(err.message || "Failed to load products")
      }
    } finally {
      // Only update loading state if not aborted
      if (!abortSignal?.aborted) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    
    // Use setTimeout to ensure state updates happen after render
    const timeoutId = setTimeout(() => {
      loadProducts(abortController.signal)
    }, 0)
    
    // Cleanup function to prevent setState after unmount
    return () => {
      clearTimeout(timeoutId)
      abortController.abort()
    }
  }, [searchParams])

  const handleRetry = () => {
    loadProducts()
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={handleRetry} />

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Premium Laptops
          </h1>
          <p className="text-slate-400">
            Discover the latest high-performance laptops for professionals and creators
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden"
        >
          <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Results and Sort */}
      <div className="flex items-center justify-between">
        <p className="text-slate-400">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm text-slate-400">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="brand">Brand</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={resetFilters}
            products={products}
          />
        </div>

        {/* Mobile Filters Overlay */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="w-80 h-full bg-surface border-r border-slate-700 p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold text-white">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>
              
              <FilterSidebar
                filters={filters}
                onFilterChange={updateFilters}
                onResetFilters={resetFilters}
                products={products}
                className="space-y-4"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <Empty 
              title="No products found"
              description="Try adjusting your filters or search terms"
              actionText="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={addToCart}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopPage