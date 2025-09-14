import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { listUsers, getUser, createUser, updateUser, deleteUser } from './api'

export const useUsers = () => useQuery({ queryKey: ['users'], queryFn: listUsers })
export const useUser = (id) => useQuery({ queryKey: ['users', id], queryFn: () => getUser(id), enabled: !!id })

export const useCreateUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] })
  })
}

export const useUpdateUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['users'] })
      qc.invalidateQueries({ queryKey: ['users', id] })
    }
  })
}

export const useDeleteUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] })
  })
}
