import React, { useState } from "react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HoldingItem } from "@/components/HoldingItem"
import { CryptoHolding } from "@/types/holdings"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CryptoHoldingsListProps {
  holdings: CryptoHolding[]
  selectedHoldings: Set<string>
  onHoldingToggle: (coin: string, isChecked: boolean) => void
  isLoading: boolean
  error: Error | null
}

export function CryptoHoldingsList({ 
  holdings, 
  selectedHoldings, 
  onHoldingToggle,
  isLoading,
  error
}: CryptoHoldingsListProps) {
  const [displayLimit, setDisplayLimit] = useState(5);
  const showViewAll = holdings.length > displayLimit;
  const isShowingAll = displayLimit >= holdings.length;
  
  const visibleHoldings = isShowingAll 
    ? holdings 
    : holdings.slice(0, displayLimit);
    
  const toggleViewAll = () => {
    setDisplayLimit(isShowingAll ? 5 : holdings.length);
  };

  return (
    <div className="overflow-hidden">
      <CardHeader className="p-6 border-b border-neutral-200 bg-white">
        <div className="flex justify-between items-center">
          <CardTitle>Holdings ({holdings.length})</CardTitle>
          {showViewAll && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleViewAll}
              className="flex items-center gap-1 text-sm font-medium"
            >
              {isShowingAll ? (
                <>
                  <span>View Less</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>View All</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-7 gap-2 p-4 bg-neutral-100 border-b border-neutral-200 text-sm font-medium text-neutral-500">
        <div className="col-span-2">Coin</div>
        <div className="text-right">Holding</div>
        <div className="text-right">Current Value (₹)</div>
        <div className="text-right">Profit / Loss</div>
        <div className="text-right">Coin Status</div>
        <div className="flex justify-center">Harvest</div>
      </div>
      
      {/* Holdings List */}
      <div className="divide-y divide-neutral-200 bg-white">
        {isLoading && (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-300 border-t-primary"></div>
            <p className="mt-2 text-neutral-500">Loading your holdings...</p>
          </div>
        )}

        {error && (
          <div className="p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto text-destructive mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-700 mb-1">Failed to load holdings</h3>
            <p className="text-neutral-500">{error.message}</p>
          </div>
        )}

        {!isLoading && !error && holdings.length === 0 && (
          <div className="p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto text-neutral-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9.75L12 12m0 0l3 3m-3-3v-6.75" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-700 mb-1">No holdings found</h3>
            <p className="text-neutral-500">No holdings match your current filter criteria. Try adjusting your filters.</p>
          </div>
        )}

        {!isLoading && !error && holdings.length > 0 && visibleHoldings.map((holding) => (
          <HoldingItem
            key={holding.coin}
            holding={holding}
            isSelected={selectedHoldings.has(holding.coin)}
            onToggle={onHoldingToggle}
          />
        ))}
        
        {/* View All / View Less (Mobile) */}
        {showViewAll && !isLoading && !error && holdings.length > 0 && (
          <div className="p-4 flex justify-center md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleViewAll}
              className="w-full flex items-center justify-center gap-1"
            >
              {isShowingAll ? (
                <>
                  <span>View Less</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>View All ({holdings.length})</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
      
      {/* View All / View Less (Desktop) */}
      {showViewAll && !isLoading && !error && holdings.length > 0 && (
        <div className="p-4 border-t border-neutral-200 hidden md:block">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleViewAll}
            className="w-full flex items-center justify-center gap-1"
          >
            {isShowingAll ? (
              <>
                <span>View Less</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>View All ({holdings.length})</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
