import React from "react"
import { CapitalGainsOverview } from "@/components/CapitalGainsOverview"
import { CryptoHoldingsList } from "@/components/CryptoHoldingsList"
import { HoldingsFilters } from "@/components/HoldingsFilters"
import { ExportTaxReport } from "@/components/ExportTaxReport"
import { HistoricalComparison } from "@/components/HistoricalComparison"
import { PriceTrendChart } from "@/components/PriceTrendChart"
import { DisclaimerSection } from "@/components/DisclaimerSection"
import { HowItWorksModal } from "@/components/HowItWorksModal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTaxHarvesting } from "@/context/TaxHarvestingContext"
import { InfoIcon } from "lucide-react"

export default function TaxLossHarvesting() {
  const {
    holdings,
    filteredHoldings,
    selectedHoldings,
    originalGains,
    currentGains,
    filters,
    isLoading,
    error,
    selectHolding,
    updateFilters,
    resetFilters
  } = useTaxHarvesting()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-neutral-700">Tax Optimisation</h1>
          <HowItWorksModal />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="gap-2">
            <InfoIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 3H2a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Z"></path><path d="M8 21v-8h8v8"></path><path d="M7 10h3V7"></path><path d="M14 7v3h3"></path></svg>
          </Button>
          <Button variant="ghost" className="gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          </Button>
          <Button variant="ghost" className="gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </Button>
        </div>
      </header>

      <DisclaimerSection className="mb-8" />

      <div className="mb-6">
        <p className="text-neutral-600 mb-4">Select the cryptocurrencies you want to harvest tax losses from to reduce your capital gains tax liability.</p>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <p className="text-sm text-neutral-500">
            The tax loss harvesting simulation shows how selling assets at a loss can offset capital gains.
          </p>
          <ExportTaxReport 
            holdings={holdings}
            selectedHoldings={selectedHoldings}
            originalGains={originalGains}
            currentGains={currentGains}
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="historical">Historical Analysis</TabsTrigger>
          <TabsTrigger value="price-trends">Price Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <CapitalGainsOverview 
            beforeHarvesting={originalGains}
            afterHarvesting={currentGains}
          />
          
          <div className="overflow-hidden rounded-lg border border-neutral-200 mb-8">
            <HoldingsFilters
              filters={filters}
              onFilterChange={updateFilters}
              onResetFilters={resetFilters}
            />
            
            <CryptoHoldingsList 
              holdings={filteredHoldings}
              selectedHoldings={selectedHoldings}
              onHoldingToggle={selectHolding}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="historical" className="mt-0">
          <HistoricalComparison />
        </TabsContent>
        
        <TabsContent value="price-trends" className="mt-0">
          <PriceTrendChart holdings={holdings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
