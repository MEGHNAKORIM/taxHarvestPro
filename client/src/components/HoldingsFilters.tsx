import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FilterOptions = {
  search: string
  status: 'all' | 'profit' | 'loss'
  sortBy: 'name' | 'value' | 'profit' | 'loss'
  sortOrder: 'asc' | 'desc'
}

interface HoldingsFiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: Partial<FilterOptions>) => void
  onResetFilters: () => void
}

export function HoldingsFilters({ 
  filters, 
  onFilterChange, 
  onResetFilters 
}: HoldingsFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value })
  }

  return (
    <div className="p-4 bg-neutral-50 border-b border-neutral-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search coins..." 
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Select 
            value={filters.status} 
            onValueChange={(value) => onFilterChange({ status: value as FilterOptions['status'] })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All holdings</SelectItem>
              <SelectItem value="profit">In profit</SelectItem>
              <SelectItem value="loss">In loss</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => onFilterChange({ sortBy: value as FilterOptions['sortBy'] })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Coin name</SelectItem>
              <SelectItem value="value">Current value</SelectItem>
              <SelectItem value="profit">Profit/Loss amount</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.sortOrder} 
            onValueChange={(value) => onFilterChange({ sortOrder: value as FilterOptions['sortOrder'] })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onResetFilters}
          className="whitespace-nowrap"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}