import { CryptoHolding } from "@/types/holdings"

export async function fetchHoldings(): Promise<CryptoHolding[]> {
  const response = await fetch('/api/holdings')
  
  if (!response.ok) {
    throw new Error(`Failed to fetch holdings: ${response.status} ${response.statusText}`)
  }
  
  return response.json()
}
