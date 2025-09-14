import React from 'react'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Percent } from 'lucide-react'

// Consistent color palette for pie chart slices
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6EE7B7', '#F472B6']

export default function CategoryBreakdownPie({ data }) {
  // Ensure data is valid and not empty
  const hasData = data && Array.isArray(data) && data.length > 0

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Percent className="w-5 h-5 text-gray-600" /> Category Breakdown (selected month)
        </h3>
        <span className="text-xs text-gray-500">Top categories</span>
      </div>
      <div className="h-80" aria-label="Category breakdown pie chart">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) => `${name}: ₹${Number(value).toFixed(2)}`}
                labelLine={true}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                formatter={(value) => `₹${Number(value).toFixed(2)}`}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No category data available
          </div>
        )}
      </div>
    </div>
  )
}