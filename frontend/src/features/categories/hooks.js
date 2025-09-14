import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { listCategories, getCategory, createCategory, updateCategory, deleteCategory } from './api'

export const useCategories = () =>
  useQuery({ queryKey: ['categories'], queryFn: listCategories })

export const useCategory = (id) =>
  useQuery({ queryKey: ['categories', id], queryFn: () => getCategory(id), enabled: !!id })

export const useCreateCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] })
  })
}

export const useUpdateCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['categories'] })
      qc.invalidateQueries({ queryKey: ['categories', id] })
    }
  })
}

export const useDeleteCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] })
  })
}
