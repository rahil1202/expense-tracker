import React from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { addMonths } from '../../../lib/date'

export default function MonthSelector({ month, onChange }) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => onChange(addMonths(month, -1))}
        className="rounded-lg border p-2 text-sm"
        title="Previous month"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-white">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">
          {new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long' }).format(month)}
        </span>
      </div>
      <button
        onClick={() => onChange(addMonths(month, +1))}
        className="rounded-lg border p-2 text-sm"
        title="Next month"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
