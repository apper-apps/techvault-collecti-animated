import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import CartItem from "@/components/molecules/CartItem"
import ApperIcon from "@/components/ApperIcon"
import { useCart } from "@/hooks/useCart"
import { toast } from "react-toastify"

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty")
      return
    }
    toast.success("Proceeding to checkout...")
    clearCart()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-slate-700 z-50 shadow-2xl"
          >
            <Card className="h-full flex flex-col border-0 bg-surface">
              <CardHeader className="flex-shrink-0 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <ApperIcon name="ShoppingCart" className="w-5 h-5" />
                    <span>Shopping Cart</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-slate-400 hover:text-white"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center">
                        <ApperIcon name="ShoppingCart" className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                        <p className="text-slate-400 text-sm">Add some amazing laptops to get started!</p>
                      </div>
                      <Button onClick={onClose} className="mt-4">
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.productId}
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeFromCart}
                        />
                      ))}
                    </div>

                    {/* Cart Footer */}
                    <div className="flex-shrink-0 border-t border-slate-700 p-4 space-y-4 bg-surface/50 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-white">Total</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          ${getTotalPrice().toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={handleCheckout}
                          disabled={cartItems.length === 0}
                        >
                          <ApperIcon name="CreditCard" className="w-4 h-4 mr-2" />
                          Proceed to Checkout
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            clearCart()
                            onClose()
                          }}
                          disabled={cartItems.length === 0}
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                          Clear Cart
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart