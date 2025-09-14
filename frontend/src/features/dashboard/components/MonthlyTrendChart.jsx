import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { LineChart as LineIcon } from 'lucide-react'

// Consistent color for the line chart
const CHART_COLOR = '#3B82F6'

export default function MonthlyTrendChart({ data }) {
  // Ensure data is valid and not empty
  const hasData = data && Array.isArray(data) && data.length > 0

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <LineIcon className="w-5 h-5 text-gray-600" /> Monthly Spend Trend
        </h3>
        <span className="text-xs text-gray-500">Aggregated across users</span>
      </div>
      <div className="h-80" aria-label="Monthly spend trend line chart">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                formatter={(value) => `₹${Number(value).toFixed(2)}`}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke={CHART_COLOR}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No data available
          </div>
        )}
      </div>
    </div>
  )
}