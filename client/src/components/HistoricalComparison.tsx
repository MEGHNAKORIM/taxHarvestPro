import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

interface HistoricalData {
  month: string
  beforeHarvesting: number
  afterHarvesting: number
  savings: number
}

// Sample historical data (to be replaced with real data from API)
const sampleHistoricalData: HistoricalData[] = [
  { month: "Jan", beforeHarvesting: 12000, afterHarvesting: 8000, savings: 4000 },
  { month: "Feb", beforeHarvesting: 13500, afterHarvesting: 9000, savings: 4500 },
  { month: "Mar", beforeHarvesting: 14000, afterHarvesting: 8800, savings: 5200 },
  { month: "Apr", beforeHarvesting: 11000, afterHarvesting: 7000, savings: 4000 },
  { month: "May", beforeHarvesting: 15000, afterHarvesting: 9500, savings: 5500 },
  { month: "Jun", beforeHarvesting: 16000, afterHarvesting: 10000, savings: 6000 },
]

interface HistoricalComparisonProps {
  // In a real implementation, we might pass real data or use a query hook
  // historicalData: HistoricalData[] 
}

export function HistoricalComparison({}: HistoricalComparisonProps) {
  // Using sample data for now - would be replaced with props or API data
  const historicalData = sampleHistoricalData
  
  // Calculate totals for the table
  const totalBeforeHarvesting = historicalData.reduce((sum, month) => sum + month.beforeHarvesting, 0)
  const totalAfterHarvesting = historicalData.reduce((sum, month) => sum + month.afterHarvesting, 0)
  const totalSavings = historicalData.reduce((sum, month) => sum + month.savings, 0)
  
  return (
    <Card className="overflow-hidden mb-8">
      <CardHeader className="p-6 border-b border-neutral-200">
        <CardTitle>Historical Tax Savings Comparison</CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="chart">
        <div className="p-4 bg-neutral-50 border-b border-neutral-200">
          <TabsList>
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-6">
          <TabsContent value="chart" className="mt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historicalData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    name="Before Harvesting" 
                    dataKey="beforeHarvesting" 
                    fill="#3B82F6" 
                  />
                  <Bar 
                    name="After Harvesting" 
                    dataKey="afterHarvesting" 
                    fill="#10B981" 
                  />
                  <Bar 
                    name="Savings" 
                    dataKey="savings" 
                    fill="#6366F1" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="table" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-neutral-600">Month</th>
                    <th className="px-4 py-3 text-right font-medium text-neutral-600">Before Harvesting</th>
                    <th className="px-4 py-3 text-right font-medium text-neutral-600">After Harvesting</th>
                    <th className="px-4 py-3 text-right font-medium text-neutral-600">Tax Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {historicalData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                      <td className="px-4 py-3 font-medium">{item.month}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(item.beforeHarvesting)}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(item.afterHarvesting)}</td>
                      <td className="px-4 py-3 text-right text-success font-medium">{formatCurrency(item.savings)}</td>
                    </tr>
                  ))}
                  <tr className="bg-neutral-100 font-semibold">
                    <td className="px-4 py-3">Total</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(totalBeforeHarvesting)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(totalAfterHarvesting)}</td>
                    <td className="px-4 py-3 text-right text-success">{formatCurrency(totalSavings)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}