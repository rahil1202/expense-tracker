import api from '../../lib/api'

export const listExpenses = async (params) => {
  const { data } = await api.get('/expenses', { params })
  return data
}

export const getExpense = async (id) => (await api.get(`/expenses/${id}`)).data
export const createExpense = async (payload) => (await api.post('/expenses', payload)).data
export const updateExpense = async ({ id, payload }) => (await api.put(`/expenses/${id}`, payload)).data
export const deleteExpense = async (id) => (await api.delete(`/expenses/${id}`)).data

export const listUsersLite = async () => (await api.get('/users')).data
export const listCategoriesLite = async () => (await api.get('/categories')).data
