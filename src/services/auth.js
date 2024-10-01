import instance from '../config/axiosConfig'

export const login = async (data) => await instance.post('/auth/login', data)

export const register = async (data) =>
  await instance.post('/auth/register', data)
