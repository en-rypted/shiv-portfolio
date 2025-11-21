import React from 'react'
// import './console.css'

export const ConsoleStructure = ({ height, width, content, margin }) => {
  return (
    <div className="flex flex-col bg-navy/90 backdrop-blur-xl rounded-xl border border-lightest-navy shadow-2xl overflow-hidden w-full max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300" style={{ margin: margin }}>
      <div className="flex items-center px-4 py-3 bg-light-navy border-b border-lightest-navy">
        <div className="flex space-x-2 mr-auto">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
        </div>
        <div className="flex space-x-1 opacity-50">
          <div className="w-1 h-1 rounded-full bg-slate-400"></div>
          <div className="w-1 h-1 rounded-full bg-slate-400"></div>
          <div className="w-1 h-1 rounded-full bg-slate-400"></div>
        </div>
      </div>
      <div className="p-6 font-mono text-slate-300 text-lg md:text-xl lg:text-2xl overflow-hidden relative min-h-[200px] md:min-h-[300px]">
        <code className="block">
          {content}
        </code>
      </div>
    </div>
  )
}


