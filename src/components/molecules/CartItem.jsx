import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center space-x-3 p-4 border-b border-slate-700 last:border-b-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium truncate">{item.name}</h4>
        <p className="text-accent font-semibold">${item.price.toLocaleString()}</p>
        
        <div className="flex items-center space-x-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="w-8 h-8 p-0"
          >
            <ApperIcon name="Minus" className="w-3 h-3" />
          </Button>
          
          <span className="text-white font-medium min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="w-8 h-8 p-0"
          >
            <ApperIcon name="Plus" className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <span className="text-white font-semibold">
          ${(item.price * item.quantity).toLocaleString()}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemove(item.productId)}
          className="text-error hover:bg-error/10 w-8 h-8 p-0"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default CartItem