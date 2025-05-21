import React from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { CryptoHolding, CapitalGains } from "@/types/holdings"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { Download } from "lucide-react"

interface ExportTaxReportProps {
  holdings: CryptoHolding[]
  selectedHoldings: Set<string>
  originalGains: CapitalGains
  currentGains: CapitalGains
}

export function ExportTaxReport({ 
  holdings, 
  selectedHoldings, 
  originalGains, 
  currentGains 
}: ExportTaxReportProps) {
  
  const exportCSV = () => {
    // Create CSV content
    const headers = [
      "Coin", 
      "Current Price (₹)", 
      "Total Holding", 
      "Average Buy Price (₹)", 
      "Current Value (₹)", 
      "Profit/Loss (₹)", 
      "Profit/Loss (%)", 
      "STCG Gain (₹)", 
      "LTCG Gain (₹)",
      "Selected for Harvesting"
    ]
    
    const rows = holdings.map(holding => {
      const currentValue = holding.currentPrice * holding.totalHolding
      const buyValue = holding.averageBuyPrice * holding.totalHolding
      const profitLossAmount = currentValue - buyValue
      const profitLossPercentage = buyValue !== 0 ? ((currentValue - buyValue) / buyValue) * 100 : 100
      
      return [
        holding.coin,
        holding.currentPrice.toString(),
        formatNumber(holding.totalHolding),
        holding.averageBuyPrice.toString(),
        currentValue.toString(),
        profitLossAmount.toString(),
        profitLossPercentage.toFixed(2),
        (holding.stcg?.gain || 0).toString(),
        (holding.ltcg?.gain || 0).toString(),
        selectedHoldings.has(holding.coin) ? "Yes" : "No"
      ]
    })
    
    // Add summary rows
    rows.push([])
    rows.push(["Capital Gains Summary", "", "", "", "", "", "", "", "", ""])
    rows.push(["", "Before Harvesting", "After Harvesting", "Difference", "", "", "", "", "", ""])
    rows.push([
      "STCG (₹)",
      originalGains.stcg.toString(),
      currentGains.stcg.toString(),
      (originalGains.stcg - currentGains.stcg).toString(),
      "", "", "", "", "", ""
    ])
    rows.push([
      "LTCG (₹)",
      originalGains.ltcg.toString(),
      currentGains.ltcg.toString(),
      (originalGains.ltcg - currentGains.ltcg).toString(),
      "", "", "", "", "", ""
    ])
    rows.push([
      "Total (₹)",
      originalGains.total.toString(),
      currentGains.total.toString(),
      (originalGains.total - currentGains.total).toString(),
      "", "", "", "", "", ""
    ])
    
    // Convert to CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n")
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.setAttribute('href', url)
    link.setAttribute('download', `tax_loss_harvesting_report_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportJSON = () => {
    // Create JSON data structure
    const data = {
      date: new Date().toISOString(),
      holdings: holdings.map(holding => {
        const currentValue = holding.currentPrice * holding.totalHolding
        const buyValue = holding.averageBuyPrice * holding.totalHolding
        
        return {
          ...holding,
          currentValue,
          buyValue,
          profitLossAmount: currentValue - buyValue,
          profitLossPercentage: buyValue !== 0 ? ((currentValue - buyValue) / buyValue) * 100 : 100,
          selectedForHarvesting: selectedHoldings.has(holding.coin)
        }
      }),
      capitalGains: {
        beforeHarvesting: originalGains,
        afterHarvesting: currentGains,
        difference: {
          stcg: originalGains.stcg - currentGains.stcg,
          ltcg: originalGains.ltcg - currentGains.ltcg,
          total: originalGains.total - currentGains.total
        }
      }
    }
    
    // Create and download file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.setAttribute('href', url)
    link.setAttribute('download', `tax_loss_harvesting_report_${new Date().toISOString().slice(0, 10)}.json`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportCSV}>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={exportJSON}>Export as JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}