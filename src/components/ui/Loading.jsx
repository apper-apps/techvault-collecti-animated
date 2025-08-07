import React from "react"
import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-12 h-12 mx-auto border-3 border-slate-600 border-t-primary rounded-full"
        />
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white">Loading...</h3>
          <p className="text-slate-400">Please wait while we fetch the data</p>
        </div>

        {/* Skeleton Loader for Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="border border-slate-700 rounded-lg overflow-hidden bg-surface/50"
            >
              <div className="w-full h-48 bg-slate-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-700 rounded animate-pulse" />
                <div className="h-3 bg-slate-800 rounded animate-pulse w-2/3" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-slate-700 rounded animate-pulse w-20" />
                  <div className="h-8 bg-slate-700 rounded animate-pulse w-24" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading