import api from '../config/api'

export const login = async (data) => await api.post('/auth/login', data)

export const register = async (data) => await api.post('/auth/register', data)

export const getCurrentUser = async () => await api.get('/auth/me')

export const logout = async () => await api.post('/auth/logout')
