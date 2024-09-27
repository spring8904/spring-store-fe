import instance from '../config/axiosConfig'

export const getAllProducts = async () => await instance.get('/products')

export const getProductById = async (id) =>
  await instance.get(`/products/${id}`)

export const deleteProduct = async (id) =>
  await instance.delete(`/products/${id}`)

export const createProduct = async (product) =>
  await instance.post('/products', product)

export const updateProduct = async (id, product) =>
  await instance.put(`/products/${id}`, product)
