import React from "react"

const PriceRange = ({ min, max, value, onChange }) => {
  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value)
    if (newMin <= value[1]) {
      onChange([newMin, value[1]])
    }
  }

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value)
    if (newMax >= value[0]) {
      onChange([value[0], newMax])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">Price Range</span>
        <span className="text-sm font-medium text-accent">
          ${value[0]} - ${value[1]}
        </span>
      </div>
      
      <div className="space-y-2">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Minimum</label>
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={handleMinChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Maximum</label>
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={handleMaxChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #0ea5e9, #38bdf8);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #0ea5e9, #38bdf8);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
        }
      `}</style>
    </div>
  )
}

export default PriceRange