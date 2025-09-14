import React from 'react'
import { Receipt, Plus, RefreshCcw, Pencil, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react'
import ExpenseFilters from '../features/expenses/ExpenseFilters'
import ExpenseForm from '../features/expenses/ExpenseForm'
import { useExpenseList, useCreateExpense, useUpdateExpense, useDeleteExpense } from '../features/expenses/hooks'

const initialFilters = {
  user_id: undefined,
  category: undefined,
  start_date: undefined,
  end_date: undefined,
  limit: 10,
  offset: 0
}

export default function ExpensesPage() {
  const [filters, setFilters] = React.useState(initialFilters)
  const { data, isLoading, isFetching, refetch } = useExpenseList(filters)
  const createMut = useCreateExpense()
  const updateMut = useUpdateExpense()
  const deleteMut = useDeleteExpense()

  const [open, setOpen] = React.useState(false)
  const [editRow, setEditRow] = React.useState(null)
  const [deleteModal, setDeleteModal] = React.useState(null)

  function clearFilters() {
    setFilters(initialFilters)
  }

  function page(next) {
    setFilters(f => {
      const newOffset = Math.max(0, f.offset + (next ? f.limit : -f.limit))
      return { ...f, offset: newOffset }
    })
  }

  async function handleCreate(payload) {
    await createMut.mutateAsync(payload)
    setOpen(false)
  }

  async function handleUpdate(payload) {
    await updateMut.mutateAsync({ id: editRow.id, payload })
    setEditRow(null)
  }

  async function handleDelete(id) {
    await deleteMut.mutateAsync(id)
    setDeleteModal(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Receipt className="w-6 h-6 text-gray-600" /> Expenses
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            <RefreshCcw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      {/* Filters */}
      <ExpenseFilters
        value={filters}
        onChange={(f) => setFilters(f)}
        onClear={clearFilters}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">User</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Description</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (data ?? []).length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No expenses found
                </td>
              </tr>
            ) : (
              data.map((e) => (
                <tr key={e.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-700">{e.user_name}</td>
                  <td className="px-6 py-4 text-gray-700">{e.category_name}</td>
                  <td className="px-6 py-4 text-gray-700">{e.date?.replace('T', ' ').slice(0, 19) || e.date}</td>
                  <td className="px-6 py-4 text-right text-gray-700">₹ {Number(e.amount).toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-700">{e.description || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setEditRow(e)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteModal(e)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">Page size: {filters.limit}</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => page(false)}
              disabled={filters.offset === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={() => page(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {open && (
        <ExpenseForm
          isLoading={createMut.isLoading}
          onClose={() => setOpen(false)}
          onSubmit={handleCreate}
        />
      )}
      {editRow && (
        <ExpenseForm
          initial={editRow}
          isLoading={updateMut.isLoading}
          onClose={() => setEditRow(null)}
          onSubmit={handleUpdate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <button
                onClick={() => setDeleteModal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the expense for {deleteModal.description || 'this item'} dated {deleteModal.date?.replace('T', ' ').slice(0, 19) || deleteModal.date}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}