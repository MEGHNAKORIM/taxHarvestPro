import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TooltipIcon } from "@/components/ui/tooltip-icon"
import { formatCurrency } from "@/lib/utils"
import { CapitalGains } from "@/types/holdings"

interface CapitalGainsOverviewProps {
  beforeHarvesting: CapitalGains
  afterHarvesting: CapitalGains
}

export function CapitalGainsOverview({ 
  beforeHarvesting, 
  afterHarvesting 
}: CapitalGainsOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Before Harvesting Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-700">Before Harvesting</h2>
            <TooltipIcon content="This shows your capital gains before applying tax loss harvesting strategy." />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-neutral-200">
              <span className="text-neutral-500">Short-term capital gains</span>
              <div className="text-right">
                <span className={`font-medium ${beforeHarvesting.stcg >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(beforeHarvesting.stcg)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between py-2 border-b border-neutral-200">
              <span className="text-neutral-500">Long-term capital gains</span>
              <div className="text-right">
                <span className={`font-medium ${beforeHarvesting.ltcg >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(beforeHarvesting.ltcg)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="font-semibold text-neutral-700">Total capital gains</span>
              <div className="text-right">
                <span className={`font-semibold ${beforeHarvesting.total >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(beforeHarvesting.total)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* After Harvesting Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-700">After Harvesting</h2>
            <TooltipIcon content="This shows your capital gains after applying the tax loss harvesting strategy to your selected assets." />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-neutral-200">
              <span className="text-neutral-500">Short-term capital gains</span>
              <div className="text-right">
                <span className={`font-medium ${afterHarvesting.stcg >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(afterHarvesting.stcg)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between py-2 border-b border-neutral-200">
              <span className="text-neutral-500">Long-term capital gains</span>
              <div className="text-right">
                <span className={`font-medium ${afterHarvesting.ltcg >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(afterHarvesting.ltcg)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="font-semibold text-neutral-700">Total capital gains</span>
              <div className="text-right">
                <span className={`font-semibold ${afterHarvesting.total >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(afterHarvesting.total)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
