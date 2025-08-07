import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import ProductImageGallery from "@/components/organisms/ProductImageGallery"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { useCart } from "@/hooks/useCart"
import productService from "@/services/api/productService"

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { addToCart } = useCart()

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await productService.getById(id)
      setProduct(data)
    } catch (err) {
      setError(err.message || "Failed to load product")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleRetry = () => {
    loadProduct()
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={handleRetry} />
  if (!product) return <Error message="Product not found" onRetry={handleRetry} />

  const specs = [
    { label: "Processor", value: product.processor, icon: "Cpu" },
    { label: "RAM", value: product.ram, icon: "HardDrive" },
    { label: "Storage", value: product.storage, icon: "Database" },
    { label: "Display", value: product.display, icon: "Monitor" },
    { label: "Graphics", value: product.graphics, icon: "Zap" },
    { label: "Weight", value: product.weight, icon: "Weight" },
    { label: "Battery", value: product.battery, icon: "Battery" }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
        <button onClick={() => navigate("/shop")} className="hover:text-white transition-colors">
          Shop
        </button>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductImageGallery 
            images={product.images} 
            productName={product.name}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Badge variant="outline">{product.brand}</Badge>
              {!product.inStock && <Badge variant="error">Out of Stock</Badge>}
              {product.price > 2000 && <Badge variant="warning">Premium</Badge>}
            </div>
            
            <h1 className="text-3xl font-display font-bold text-white mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </span>
              <div className="flex items-center space-x-1 text-slate-400">
                <ApperIcon name="Truck" className="w-4 h-4" />
                <span className="text-sm">Free shipping</span>
              </div>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-sm">
              <ApperIcon name="Cpu" className="w-4 h-4 text-primary" />
              <span className="text-slate-400">CPU:</span>
              <span className="text-white font-medium">{product.processor.split(" ").slice(0, 3).join(" ")}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ApperIcon name="HardDrive" className="w-4 h-4 text-primary" />
              <span className="text-slate-400">RAM:</span>
              <span className="text-white font-medium">{product.ram}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ApperIcon name="Database" className="w-4 h-4 text-primary" />
              <span className="text-slate-400">Storage:</span>
              <span className="text-white font-medium">{product.storage}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ApperIcon name="Monitor" className="w-4 h-4 text-primary" />
              <span className="text-slate-400">Display:</span>
              <span className="text-white font-medium">{product.display.split(" ")[0]}</span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="border-t border-slate-700 pt-6">
            <div className="flex items-center space-x-4 mb-6">
              <label className="text-sm font-medium text-slate-300">Quantity:</label>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  className="w-10 h-10 p-0"
                >
                  <ApperIcon name="Minus" className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium text-white">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  className="w-10 h-10 p-0"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
                size="lg"
              >
                <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-6"
              >
                <ApperIcon name="Heart" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" className="w-4 h-4 text-success" />
                <span className="text-slate-300">1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Truck" className="w-4 h-4 text-success" />
                <span className="text-slate-300">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="RefreshCw" className="w-4 h-4 text-success" />
                <span className="text-slate-300">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Headphones" className="w-4 h-4 text-success" />
                <span className="text-slate-300">24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16"
      >
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ApperIcon name={spec.icon} className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-medium text-slate-400 mb-1">
                      {spec.label}
                    </dt>
                    <dd className="text-white font-medium leading-relaxed">
                      {spec.value}
                    </dd>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ProductDetailPage