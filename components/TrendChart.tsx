import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const deliveryData = [
  { month: 'Jan', tracks: 65 },
  { month: 'Feb', tracks: 59 },
  { month: 'Mar', tracks: 80 },
  { month: 'Apr', tracks: 81 },
  { month: 'May', tracks: 56 },
  { month: 'Jun', tracks: 55 }
]

export function TrendChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-200 h-96">
      <h3 className="text-blue-900 text-2xl mb-6">Delivery Performance</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={deliveryData}>
          <XAxis dataKey="month" stroke="#1e3a8a" />
          <YAxis stroke="#1e3a8a" />
          <Tooltip
            contentStyle={{ 
              backgroundColor: "#bfdbfe",
              border: "1px solid #93c5fd",
              borderRadius: "8px"
            }}
          />
          <Line
            type="monotone"
            dataKey="tracks"
            stroke="#1d4ed8"
            strokeWidth={2}
            dot={{ fill: "#1e3a8a" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 