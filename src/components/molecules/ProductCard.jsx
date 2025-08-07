import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault()
    onAddToCart(product)
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300">
        <Link to={`/product/${product.Id}`}>
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {!product.inStock && (
              <Badge variant="error" className="absolute top-3 right-3">
                Out of Stock
              </Badge>
            )}
            {product.price > 2000 && (
              <Badge variant="warning" className="absolute top-3 left-3 animate-pulse-deal">
                Premium
              </Badge>
            )}
          </div>
        </Link>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <Link to={`/product/${product.Id}`}>
                <h3 className="font-display font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-slate-400">{product.brand}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {product.ram}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.storage}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Cpu" className="w-3 h-3" />
                <span className="truncate">{product.processor.split(" ").slice(0, 2).join(" ")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Monitor" className="w-3 h-3" />
                <span className="truncate">{product.display.split(" ")[0]}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Weight" className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">{product.weight}</span>
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="sm"
                className="min-w-[100px]"
              >
                <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProductCard