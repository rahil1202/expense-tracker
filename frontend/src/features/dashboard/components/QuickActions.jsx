import React from 'react'
import { Receipt, Layers, Users as UsersIcon } from 'lucide-react'
import ExpenseForm from '../../expenses/ExpenseForm'
import CategoryForm from '../../categories/CategoryForm'
import UserForm from '../../users/UserForm'
import api from '../../../lib/api'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

export default function QuickActions() {
  const [openExpense, setOpenExpense] = React.useState(false)
  const [openCategory, setOpenCategory] = React.useState(false)
  const [openUser, setOpenUser] = React.useState(false)
  const qc = useQueryClient()

  async function onExpenseSaved(payload) {
    try {
      await api.post('/expenses', payload)
      toast.success('Expense added')
      setOpenExpense(false)
      qc.invalidateQueries({ queryKey: ['expenses','thisMonth'] })
      qc.invalidateQueries({ queryKey: ['stats'] }) // broad
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Failed to add expense')
    }
  }
  async function onCategorySaved(payload) {
    try {
      await api.post('/categories', payload)
      toast.success('Category added')
      setOpenCategory(false)
      qc.invalidateQueries({ queryKey: ['categories'] })
      qc.invalidateQueries({ queryKey: ['expenses','thisMonth'] })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Failed to add category')
    }
  }
  async function onUserSaved(payload) {
    try {
      await api.post('/users', payload)
      toast.success('User added')
      setOpenUser(false)
      qc.invalidateQueries({ queryKey: ['users'] })
      qc.invalidateQueries({ queryKey: ['stats'] })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Failed to add user')
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button onClick={()=>setOpenExpense(true)} className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm text-white">
          <Receipt className="w-4 h-4" /> Add Expense
        </button>
        <button onClick={()=>setOpenCategory(true)} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <Layers className="w-4 h-4" /> Add Category
        </button>
        <button onClick={()=>setOpenUser(true)} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <UsersIcon className="w-4 h-4" /> Add User
        </button>
      </div>

      {openExpense && <ExpenseForm onClose={()=>setOpenExpense(false)} onSubmit={onExpenseSaved} isLoading={false} />}
      {openCategory && <CategoryForm onClose={()=>setOpenCategory(false)} onSubmit={onCategorySaved} isLoading={false} />}
      {openUser && <UserForm onClose={()=>setOpenUser(false)} onSubmit={onUserSaved} isLoading={false} />}
    </>
  )
}
