import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry, showRetry = true }) => {
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
          className="w-20 h-20 mx-auto bg-gradient-to-r from-error/20 to-error/10 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-error" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">Oops! Something went wrong</h3>
          <p className="text-slate-400">{message}</p>
        </div>
        
        {showRetry && onRetry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button onClick={onRetry} className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80">
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        )}
        
        <div className="text-sm text-slate-500">
          If the problem persists, please contact support.
        </div>
      </div>
    </motion.div>
  )
}

export default Error