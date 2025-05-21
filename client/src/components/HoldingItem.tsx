import React from "react"
import { Switch } from "@/components/ui/switch"
import { CryptoHolding } from "@/types/holdings"
import { formatCurrency, formatNumber, calculateProfitLossPercentage } from "@/lib/utils"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface HoldingItemProps {
  holding: CryptoHolding
  isSelected: boolean
  onToggle: (coin: string, isChecked: boolean) => void
}

export function HoldingItem({ holding, isSelected, onToggle }: HoldingItemProps) {
  const currentValue = holding.currentPrice * holding.totalHolding
  const buyValue = holding.averageBuyPrice * holding.totalHolding
  const profitLossAmount = currentValue - buyValue
  const profitLossPercentage = calculateProfitLossPercentage(currentValue, buyValue)
  const isProfitable = profitLossAmount >= 0
  
  const totalGain = (holding.stcg?.gain || 0) + (holding.ltcg?.gain || 0)
  const isHarvestable = totalGain < 0

  const handleToggle = (checked: boolean) => {
    onToggle(holding.coin, checked)
  }

  // Switch with tooltip for non-harvestable assets
  const HarvestSwitch = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Switch 
              checked={isSelected}
              onCheckedChange={handleToggle}
              disabled={!isHarvestable}
              className={!isHarvestable ? "cursor-not-allowed opacity-50" : ""}
            />
            {!isHarvestable && (
              <div className="absolute inset-0 z-10" aria-hidden="true"></div>
            )}
          </div>
        </TooltipTrigger>
        {!isHarvestable && (
          <TooltipContent className="text-xs max-w-[220px]">
            <p>This holding is in profit and cannot be used for tax loss harvesting.</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <>
      {/* Mobile view */}
      <div className="p-4 md:hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={holding.logo} alt={holding.coin} className="w-8 h-8 mr-3 rounded-full" />
            <div>
              <h3 className="font-medium">{holding.coin}</h3>
              <p className="text-xs text-neutral-500">{holding.coinName}</p>
            </div>
          </div>
          <div className="flex items-center">
            <HarvestSwitch />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-neutral-500">Holding</p>
            <p className="font-medium">{formatNumber(holding.totalHolding)}</p>
          </div>
          <div>
            <p className="text-neutral-500">Current Value</p>
            <p className="font-medium">{formatCurrency(currentValue)}</p>
          </div>
          <div>
            <p className="text-neutral-500">Profit/Loss</p>
            <p className={`font-medium ${isProfitable ? 'text-success' : 'text-destructive'}`}>
              {isProfitable ? '+' : ''}{formatCurrency(profitLossAmount)} ({isProfitable ? '+' : ''}{profitLossPercentage.toFixed(2)}%)
            </p>
          </div>
          <div>
            <p className="text-neutral-500">Coin Status</p>
            <p className={`font-medium ${isHarvestable ? 'text-destructive' : 'text-success'}`}>
              {isHarvestable ? 'Loss' : 'Profit'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Desktop view */}
      <div className={`hidden md:grid md:grid-cols-7 gap-2 p-4 items-center text-sm ${!isHarvestable ? 'opacity-90' : ''}`}>
        <div className="col-span-2 flex items-center">
          <img src={holding.logo} alt={holding.coin} className="w-8 h-8 mr-3 rounded-full" />
          <div>
            <h3 className="font-medium">{holding.coin}</h3>
            <p className="text-xs text-neutral-500">{holding.coinName}</p>
          </div>
        </div>
        <div className="text-right">{formatNumber(holding.totalHolding)}</div>
        <div className="text-right">{formatCurrency(currentValue)}</div>
        <div className={`text-right ${isProfitable ? 'text-success' : 'text-destructive'}`}>
          {isProfitable ? '+' : ''}{formatCurrency(profitLossAmount)} ({isProfitable ? '+' : ''}{profitLossPercentage.toFixed(2)}%)
        </div>
        <div className={`text-right ${isHarvestable ? 'text-destructive font-medium' : 'text-success font-medium'}`}>
          {isHarvestable ? 'Loss' : 'Profit'}
        </div>
        <div className="flex justify-center">
          <HarvestSwitch />
        </div>
      </div>
    </>
  )
}
