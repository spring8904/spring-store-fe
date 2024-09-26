import instance from '../config/axiosConfig'

export const getAllProducts = async () => await instance.get('/products')

export const getProductById = async (id) =>
  await instance.get(`/products/${id}`)
