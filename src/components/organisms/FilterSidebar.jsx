import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import PriceRange from "@/components/molecules/PriceRange"
import FilterCheckbox from "@/components/molecules/FilterCheckbox"
import ApperIcon from "@/components/ApperIcon"

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onResetFilters, 
  products = [],
  className = "" 
}) => {
  const brands = ["Apple", "Dell", "ASUS", "HP", "Lenovo"]
  const ramOptions = ["8", "16", "32"]
  const storageOptions = ["256", "512", "1000"]

  const getBrandCount = (brand) => {
    return products.filter(p => p.brand === brand).length
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-6 ${className}`}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold text-white">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-slate-400 hover:text-white"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <PriceRange
            min={0}
            max={5000}
            value={filters.priceRange}
            onChange={(range) => onFilterChange({ priceRange: range })}
          />
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Brand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <FilterCheckbox
              key={brand}
              label={brand}
              count={getBrandCount(brand)}
              checked={filters.brands.includes(brand)}
              onChange={(e) => {
                const newBrands = e.target.checked
                  ? [...filters.brands, brand]
                  : filters.brands.filter(b => b !== brand)
                onFilterChange({ brands: newBrands })
              }}
            />
          ))}
        </CardContent>
      </Card>

      {/* RAM Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Minimum RAM</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={filters.minRam}
            onChange={(e) => onFilterChange({ minRam: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Any</option>
            {ramOptions.map((ram) => (
              <option key={ram} value={ram}>
                {ram}GB+
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Storage Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Minimum Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={filters.minStorage}
            onChange={(e) => onFilterChange({ minStorage: e.target.value })}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Any</option>
            {storageOptions.map((storage) => (
              <option key={storage} value={storage}>
                {storage}GB+
              </option>
            ))}
          </select>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FilterSidebar