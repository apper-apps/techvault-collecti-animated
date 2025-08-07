import React from "react"

const FilterCheckbox = ({ label, checked, onChange, count }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
          checked 
            ? "border-primary bg-gradient-to-r from-primary to-accent" 
            : "border-slate-600 group-hover:border-primary/50"
        }`}>
          {checked && (
            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
          {label}
        </span>
        {count !== undefined && (
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
    </label>
  )
}

export default FilterCheckbox