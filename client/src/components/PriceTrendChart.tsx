import React, { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { formatCurrency } from "@/lib/utils"
import { CryptoHolding } from "@/types/holdings"

// Sample price trend data (to be replaced with real API data)
const samplePriceData = {
  "BTC": [
    { date: "Apr 1", price: 212000 },
    { date: "Apr 8", price: 225000 },
    { date: "Apr 15", price: 219000 },
    { date: "Apr 22", price: 232000 },
    { date: "Apr 29", price: 228000 },
    { date: "May 6", price: 241000 },
    { date: "May 13", price: 238000 },
    { date: "May 20", price: 248000 },
  ],
  "ETH": [
    { date: "Apr 1", price: 196000 },
    { date: "Apr 8", price: 202000 },
    { date: "Apr 15", price: 198000 },
    { date: "Apr 22", price: 208000 },
    { date: "Apr 29", price: 212000 },
    { date: "May 6", price: 210000 },
    { date: "May 13", price: 214000 },
    { date: "May 20", price: 216000 },
  ],
  "MATIC": [
    { date: "Apr 1", price: 18.5 },
    { date: "Apr 8", price: 19.2 },
    { date: "Apr 15", price: 20.1 },
    { date: "Apr 22", price: 19.8 },
    { date: "Apr 29", price: 21.0 },
    { date: "May 6", price: 20.8 },
    { date: "May 13", price: 21.5 },
    { date: "May 20", price: 22.2 },
  ],
  "USDC": [
    { date: "Apr 1", price: 85.32 },
    { date: "Apr 8", price: 85.38 },
    { date: "Apr 15", price: 85.35 },
    { date: "Apr 22", price: 85.40 },
    { date: "Apr 29", price: 85.36 },
    { date: "May 6", price: 85.39 },
    { date: "May 13", price: 85.41 },
    { date: "May 20", price: 85.42 },
  ]
}

interface PriceTrendChartProps {
  holdings: CryptoHolding[]
}

export function PriceTrendChart({ holdings }: PriceTrendChartProps) {
  // Get list of unique coins from holdings
  const availableCoins = holdings
    .filter(holding => holding.totalHolding > 0)
    .map(holding => holding.coin)
  
  const [selectedCoin, setSelectedCoin] = useState<string>(availableCoins[0] || "")
  const [timeframe, setTimeframe] = useState<string>("30d")
  
  // Get price data for selected coin
  const priceData = selectedCoin ? samplePriceData[selectedCoin as keyof typeof samplePriceData] || [] : []
  
  // Find current holding info for the selected coin
  const selectedHolding = holdings.find(h => h.coin === selectedCoin)
  
  // Find historical min and max prices for selected timeframe
  const minPrice = priceData.length > 0 ? Math.min(...priceData.map(d => d.price)) : 0
  const maxPrice = priceData.length > 0 ? Math.max(...priceData.map(d => d.price)) : 0
  const currentPrice = selectedHolding?.currentPrice || 0
  
  // Calculate percentage change over the period
  const startPrice = priceData.length > 0 ? priceData[0].price : 0
  const percentChange = startPrice ? ((currentPrice - startPrice) / startPrice) * 100 : 0
  const isPositiveChange = percentChange >= 0
  
  return (
    <Card className="overflow-hidden mb-8">
      <CardHeader className="p-6 border-b border-neutral-200">
        <CardTitle>Cryptocurrency Price Trends</CardTitle>
      </CardHeader>
      
      <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row gap-4">
        <Select value={selectedCoin} onValueChange={setSelectedCoin}>
          <SelectTrigger className="w-full sm:w-60">
            <SelectValue placeholder="Select coin" />
          </SelectTrigger>
          <SelectContent>
            {availableCoins.map(coin => (
              <SelectItem key={coin} value={coin}>
                {coin}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <CardContent className="p-0">
        {selectedCoin && priceData.length > 0 ? (
          <>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-b border-neutral-200">
              <div>
                <p className="text-neutral-500 text-sm">Current Price</p>
                <p className="text-xl font-medium">{formatCurrency(currentPrice)}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Period Change</p>
                <p className={`text-xl font-medium ${isPositiveChange ? 'text-success' : 'text-destructive'}`}>
                  {isPositiveChange ? '+' : ''}{percentChange.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Period Low</p>
                <p className="text-xl font-medium">{formatCurrency(minPrice)}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Period High</p>
                <p className="text-xl font-medium">{formatCurrency(maxPrice)}</p>
              </div>
            </div>
            
            <div className="p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => formatCurrency(value).split(' ')[1]}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Price"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    name={`${selectedCoin} Price`}
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto text-neutral-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a1 1 0 001 1h12a1 1 0 001-1v-1M3 15l6.75-6.75M3 15l6.75 6.75M19 15V3a1 1 0 00-1-1H7l4 4m8 8l-4-4" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-700 mb-1">No price data available</h3>
            <p className="text-neutral-500">Please select a coin to view price trend data.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}