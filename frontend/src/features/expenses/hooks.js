import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listExpenses, getExpense, createExpense, updateExpense, deleteExpense,
  listUsersLite, listCategoriesLite
} from './api'

export const useExpenseList = (filters) =>
  useQuery({
    queryKey: ['expenses', filters],
    queryFn: () => listExpenses(filters),
    keepPreviousData: true
  })

export const useExpense = (id) =>
  useQuery({ queryKey: ['expenses', id], queryFn: () => getExpense(id), enabled: !!id })

export const useCreateExpense = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] })
  })
}

export const useUpdateExpense = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['expenses'] })
      qc.invalidateQueries({ queryKey: ['expenses', id] })
    }
  })
}

export const useDeleteExpense = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] })
  })
}

export const useUsersLite = () =>
  useQuery({ queryKey: ['users','lite'], queryFn: listUsersLite })

export const useCategoriesLite = () =>
  useQuery({ queryKey: ['categories','lite'], queryFn: listCategoriesLite })
