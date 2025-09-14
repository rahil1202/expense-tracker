import { Filter, X } from 'lucide-react'
import { useUsersLite, useCategoriesLite } from './hooks'

export default function ExpenseFilters({ value, onChange, onClear }) {
  const { data: users } = useUsersLite()
  const { data: categories } = useCategoriesLite()

  function setField(field, v) {
    onChange({ ...value, [field]: v })
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4" />
        <div className="font-medium">Filters</div>
        <button onClick={onClear} className="ml-auto text-xs inline-flex items-center gap-1 text-gray-600 hover:text-black">
          <X className="w-3 h-3" /> Clear
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div>
          <label className="text-xs text-gray-600">User</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={value.user_id || ''}
            onChange={e=>setField('user_id', e.target.value || undefined)}
          >
            <option value="">All</option>
            {(users ?? []).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-600">Category</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={value.category || ''}
            onChange={e=>setField('category', e.target.value || undefined)}
          >
            <option value="">All</option>
            {(categories ?? []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-600">Start date</label>
          <input
            type="date"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={value.start_date || ''}
            onChange={e=>setField('start_date', e.target.value || undefined)}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600">End date</label>
          <input
            type="date"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={value.end_date || ''}
            onChange={e=>setField('end_date', e.target.value || undefined)}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600">Per page</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={value.limit}
            onChange={e=>setField('limit', Number(e.target.value))}
          >
            {[10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}
