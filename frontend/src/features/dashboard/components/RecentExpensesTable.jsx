import React from 'react'
import { Link } from 'react-router-dom'

export default function RecentExpensesTable({ rows }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Recent Expenses (selected month)</h3>
        <Link to="/expenses" className="text-sm text-gray-600 hover:underline">Go to expenses</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">User</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-right">Amount</th>
              <th className="px-3 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).slice(0, 10).map((e) => (
              <tr key={e.id} className="border-t">
                <td className="px-3 py-2">{e.user_name}</td>
                <td className="px-3 py-2">{e.category_name}</td>
                <td className="px-3 py-2">{(e.date || '').replace('T',' ').slice(0,19)}</td>
                <td className="px-3 py-2 text-right">₹ {Number(e.amount).toFixed(2)}</td>
                <td className="px-3 py-2">{e.description || '-'}</td>
              </tr>
            ))}
            {(!rows || rows.length === 0) && (
              <tr><td colSpan="5" className="px-3 py-6 text-center text-gray-500">No data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
