import React from 'react'
import { Check, Loader2, X } from 'lucide-react'

export default function CategoryForm({ onClose, onSubmit, isLoading, initial }) {
  const [name, setName] = React.useState(initial?.name ?? '')
  const [error, setError] = React.useState('')

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Name is required'); return }
    onSubmit({ name: name.trim() })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">{initial ? 'Edit Category' : 'Add Category'}</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-black"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={submit} className="px-5 py-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10"
              value={name} onChange={(e)=>{ setName(e.target.value); setError('') }} placeholder="Groceries"
            />
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
