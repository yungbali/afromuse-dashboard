import { TrendingUp } from "lucide-react"

export function BalanceCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200">
      <div className="text-blue-600 text-lg mb-4">Total Royalties</div>
      <div className="flex items-end gap-4">
        <div className="text-blue-900 text-5xl font-light">$62,340.48</div>
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm">+12% vs last quarter</span>
        </div>
      </div>
    </div>
  )
} 