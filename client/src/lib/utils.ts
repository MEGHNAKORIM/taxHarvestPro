import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return `₹ ${parseFloat(value.toFixed(2)).toLocaleString('en-IN')}`
}

export function formatNumber(value: number, decimals = 4): string {
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(2)
  }
  
  return parseFloat(value.toFixed(decimals)).toString()
}

export function calculateProfitLossPercentage(currentValue: number, buyValue: number): number {
  if (buyValue === 0) return 100 // If bought for free, it's 100% profit
  return ((currentValue - buyValue) / buyValue) * 100
}
