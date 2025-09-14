import React from 'react'
import { Check, Loader2, X } from 'lucide-react'
import { useUsersLite, useCategoriesLite } from './hooks'

export default function ExpenseForm({ onClose, onSubmit, isLoading, initial }) {
  const { data: users } = useUsersLite()
  const { data: categories } = useCategoriesLite()

  const [form, setForm] = React.useState({
    user_id: initial?.user_id ?? '',
    category: initial?.category ?? '',
    amount: initial?.amount ?? '',
    date: initial?.date ? initial.date.slice(0,16).replace(' ', 'T') : '', // for datetime-local
    description: initial?.description ?? ''
  })
  const [errors, setErrors] = React.useState({})

  function setField(name, value) {
    setForm(f => ({ ...f, [name]: value }))
  }

  function validate() {
    const e = {}
    if (!form.user_id) e.user_id = 'User is required'
    if (!form.category) e.category = 'Category is required'
    if (!form.amount || Number(form.amount) < 0) e.amount = 'Amount must be >= 0'
    if (!form.date) e.date = 'Date is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function toBackendPayload() {
    // convert datetime-local -> "YYYY-MM-DD HH:mm:ss"
    const dt = form.date ? new Date(form.date) : null
    const pad = (n)=> String(n).padStart(2,'0')
    const dateStr = dt
      ? `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:00`
      : ''
    return {
      user_id: Number(form.user_id),
      category: Number(form.category),
      amount: Number(form.amount),
      date: dateStr,
      description: form.description || null
    }
  }

  async function submit(e) {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(toBackendPayload())
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">{initial ? 'Edit Expense' : 'Add Expense'}</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-black"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={submit} className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="text-sm font-medium">User</label>
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.user_id}
              onChange={(e)=>setField('user_id', e.target.value)}
            >
              <option value="">Select user</option>
              {(users ?? []).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            {errors.user_id && <p className="text-xs text-red-600 mt-1">{errors.user_id}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="text-sm font-medium">Category</label>
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.category}
              onChange={(e)=>setField('category', e.target.value)}
            >
              <option value="">Select category</option>
              {(categories ?? []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Amount</label>
            <input
              type="number" min="0" step="0.01"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.amount}
              onChange={(e)=>setField('amount', e.target.value)}
              placeholder="0.00"
            />
            {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Date & time</label>
            <input
              type="datetime-local"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.date}
              onChange={(e)=>setField('date', e.target.value)}
            />
            {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.description}
              onChange={(e)=>setField('description', e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
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
