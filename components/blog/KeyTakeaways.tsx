import React from 'react'
import { CheckCircle } from 'lucide-react'

interface KeyTakeawaysProps {
  takeaways: string[]
  className?: string
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways, className = '' }) => {
  if (!takeaways || takeaways.length === 0) {
    return null
  }

  return (
    <div className={`bg-[#F2F6FC] rounded-2xl p-6 border border-[#E67A7E] ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-[#D52128] rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Key Takeaways</h3>
      </div>
      
      <ol className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-[#D52128] text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
              {index + 1}
            </span>
            <p className="text-gray-700 leading-relaxed">{takeaway}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default KeyTakeaways
