interface ChannelRowProps {
  platform: string
  deliveredTracks: number
  status: "delivered" | "processing" | "failed"
  nextSync: string
}

export function DistributionChannelTable() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-blue-200">
      <h3 className="text-blue-900 text-2xl mb-6">Platform Distribution</h3>
      <div className="space-y-4">
        <ChannelRow
          platform="Spotify"
          deliveredTracks={2450}
          status="delivered"
          nextSync="2024-03-15"
        />
        <ChannelRow
          platform="Apple Music"
          deliveredTracks={1820}
          status="processing"
          nextSync="2024-03-16"
        />
      </div>
    </div>
  )
}

function ChannelRow({ platform, deliveredTracks, status, nextSync }: ChannelRowProps) {
  const statusColor = {
    delivered: "text-green-600",
    processing: "text-yellow-600",
    failed: "text-red-600"
  }

  return (
    <div className="flex items-center justify-between text-blue-900 py-3 border-b border-blue-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="font-medium">{platform}</span>
      </div>
      <div className="flex gap-8">
        <span className="w-24 text-right">{deliveredTracks.toLocaleString()}</span>
        <span className={`w-32 ${statusColor[status]}`}>{status}</span>
        <span className="w-32 text-blue-600">{nextSync}</span>
      </div>
    </div>
  )
} 
