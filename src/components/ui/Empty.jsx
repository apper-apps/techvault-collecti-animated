import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at the moment.", 
  actionText = "Go Back",
  onAction,
  icon = "Package"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center space-y-6 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-r from-slate-700/20 to-slate-600/10 rounded-full flex items-center justify-center"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-slate-500" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-slate-400">{description}</p>
        </div>
        
        {actionText && onAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              onClick={onAction} 
              variant="outline"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:from-primary/20 hover:to-accent/20"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              {actionText}
            </Button>
          </motion.div>
        )}
        
        <div className="text-sm text-slate-500">
          Check back later or browse our other categories.
        </div>
      </div>
    </motion.div>
  )
}

export default Empty