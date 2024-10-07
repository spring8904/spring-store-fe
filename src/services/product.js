import instance from '../config/axiosConfig'

export const getProducts = async () => await instance.get('/products')

export const getProductBySlug = async (slug) =>
  await instance.get(`/products/${slug}`)

export const deleteProduct = async (id) =>
  await instance.delete(`/products/${id}`)

export const createProduct = async (product) =>
  await instance.post('/products', product)

export const updateProduct = async (id, product) =>
  await instance.put(`/products/${id}`, product)
