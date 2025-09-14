import api from '../../lib/api'

export const listUsers = async () => (await api.get('/users')).data
export const getUser = async (id) => (await api.get(`/users/${id}`)).data
export const createUser = async (payload) => (await api.post('/users', payload)).data
export const updateUser = async ({ id, payload }) => (await api.put(`/users/${id}`, payload)).data
export const deleteUser = async (id) => (await api.delete(`/users/${id}`)).data
