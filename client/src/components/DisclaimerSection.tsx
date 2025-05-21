import React, { useState } from "react"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface DisclaimerSectionProps {
  className?: string
}

export function DisclaimerSection({ className }: DisclaimerSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("rounded-md overflow-hidden border border-blue-900/20 bg-blue-950", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-white/90 hover:bg-blue-900/30 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Info className="h-5 w-5 text-blue-400" />
          <span className="font-medium">Important Notes And Disclaimers</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 text-white/80 bg-blue-900/20 text-sm space-y-3">
          <p>
            <strong>Tax Disclaimer:</strong> This tool provides a simulation of potential tax loss harvesting strategies and is for educational purposes only. It does not constitute tax, legal, or financial advice.
          </p>
          <p>
            <strong>Data Accuracy:</strong> The cryptocurrency data shown may not reflect real-time market values. Always verify current prices and your actual holdings before making any investment decisions.
          </p>
          <p>
            <strong>Personal Circumstances:</strong> Tax implications vary based on individual circumstances, jurisdiction, and applicable tax laws. Consult with a qualified tax professional before implementing any tax strategy.
          </p>
          <p>
            <strong>Capital Gains Calculation:</strong> The tool makes simplifying assumptions about capital gains calculations which may not align with your specific tax situation or local regulations.
          </p>
          <p>
            <strong>Wash Sale Consideration:</strong> Be aware of wash sale rules in your jurisdiction, which may limit the tax benefits of selling and repurchasing substantially identical assets within a short timeframe.
          </p>
        </div>
      )}
    </div>
  )
}