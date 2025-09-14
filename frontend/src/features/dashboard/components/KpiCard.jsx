import React from 'react'

export default function KpiCard({ icon: Icon, title, value, footer }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border p-2">{Icon && <Icon className="w-5 h-5" />}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      {footer && <div className="mt-2 text-xs text-gray-500">{footer}</div>}
    </div>
  )
}
