import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useQuery } from "@tanstack/react-query"
import { CryptoHolding, CapitalGains } from '@/types/holdings'
import { fetchHoldings } from '@/services/api'
import { FilterOptions } from '@/components/HoldingsFilters'

interface TaxHarvestingContextType {
  holdings: CryptoHolding[]
  filteredHoldings: CryptoHolding[]
  selectedHoldings: Set<string>
  originalGains: CapitalGains
  currentGains: CapitalGains
  filters: FilterOptions
  isLoading: boolean
  error: Error | null
  selectHolding: (coin: string, isSelected: boolean) => void
  updateFilters: (newFilters: Partial<FilterOptions>) => void
  resetFilters: () => void
}

const defaultFilters: FilterOptions = {
  search: "",
  status: "all",
  sortBy: "name",
  sortOrder: "asc"
}

const defaultGains: CapitalGains = {
  stcg: 0,
  ltcg: 0,
  total: 0
}

const TaxHarvestingContext = createContext<TaxHarvestingContextType | undefined>(undefined)

export function TaxHarvestingProvider({ children }: { children: ReactNode }) {
  const [selectedHoldings, setSelectedHoldings] = useState<Set<string>>(new Set())
  const [originalGains, setOriginalGains] = useState<CapitalGains>(defaultGains)
  const [currentGains, setCurrentGains] = useState<CapitalGains>(defaultGains)
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters)

  const { data: holdings = [], isLoading, error } = useQuery({
    queryKey: ['/api/holdings'],
    queryFn: fetchHoldings
  })

  // Calculate initial gains when holdings data is loaded
  useEffect(() => {
    if (holdings.length > 0) {
      const stcg = holdings.reduce((sum, holding) => sum + (holding.stcg?.gain || 0), 0)
      const ltcg = holdings.reduce((sum, holding) => sum + (holding.ltcg?.gain || 0), 0)
      const total = stcg + ltcg
      
      const gains = { stcg, ltcg, total }
      setOriginalGains(gains)
      setCurrentGains(gains)
    }
  }, [holdings])

  // Recalculate gains when selected holdings change
  const recalculateGains = (selected: Set<string>) => {
    // Reset to original gains
    let stcg = originalGains.stcg
    let ltcg = originalGains.ltcg
    
    // Subtract negative gains from selected holdings (tax loss harvesting)
    holdings.forEach(holding => {
      if (selected.has(holding.coin)) {
        // Only subtract if it's a loss (negative gain)
        const stcgGain = holding.stcg?.gain || 0
        const ltcgGain = holding.ltcg?.gain || 0
        
        if (stcgGain < 0) {
          stcg -= stcgGain // Subtracting a negative value = adding its absolute value
        }
        
        if (ltcgGain < 0) {
          ltcg -= ltcgGain
        }
      }
    })
    
    // Calculate total and update state
    const total = stcg + ltcg
    setCurrentGains({ stcg, ltcg, total })
  }

  // Helper function to get the sort value based on sortBy option
  const getSortValue = (holding: CryptoHolding, sortBy: string) => {
    const currentValue = holding.currentPrice * holding.totalHolding
    const buyValue = holding.averageBuyPrice * holding.totalHolding
    const profitLoss = currentValue - buyValue
    
    switch (sortBy) {
      case "name":
        return holding.coin
      case "value":
        return currentValue
      case "profit":
        return profitLoss
      default:
        return holding.coin
    }
  }

  // Apply filters to holdings
  const filteredHoldings = holdings.filter(holding => {
    // Apply search filter
    if (filters.search && 
        !holding.coin.toLowerCase().includes(filters.search.toLowerCase()) && 
        !holding.coinName.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    
    // Apply status filter
    if (filters.status !== "all") {
      const currentValue = holding.currentPrice * holding.totalHolding
      const buyValue = holding.averageBuyPrice * holding.totalHolding
      const isProfitable = currentValue >= buyValue
      
      if (filters.status === "profit" && !isProfitable) return false
      if (filters.status === "loss" && isProfitable) return false
    }
    
    return true
  }).sort((a, b) => {
    // Apply sorting
    const aValue = getSortValue(a, filters.sortBy)
    const bValue = getSortValue(b, filters.sortBy)
    
    if (filters.sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Handler for toggling a holding selection
  const selectHolding = (coin: string, isSelected: boolean) => {
    const newSelected = new Set(selectedHoldings)
    
    if (isSelected) {
      newSelected.add(coin)
    } else {
      newSelected.delete(coin)
    }
    
    setSelectedHoldings(newSelected)
    recalculateGains(newSelected)
  }

  // Handler for updating filters
  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  // Handler for resetting filters
  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  const value = {
    holdings,
    filteredHoldings,
    selectedHoldings,
    originalGains,
    currentGains,
    filters,
    isLoading,
    error: error as Error,
    selectHolding,
    updateFilters,
    resetFilters
  }

  return (
    <TaxHarvestingContext.Provider value={value}>
      {children}
    </TaxHarvestingContext.Provider>
  )
}

export function useTaxHarvesting() {
  const context = useContext(TaxHarvestingContext)
  if (context === undefined) {
    throw new Error('useTaxHarvesting must be used within a TaxHarvestingProvider')
  }
  return context
}