import api from '../config/api'

export const getProducts = async () => await api.get('/products')

export const getProductBySlug = async (slug) =>
  await api.get(`/products/${slug}`)

export const deleteProduct = async (id) => await api.delete(`/products/${id}`)

export const createProduct = async (product) =>
  await api.post('/products', product)

export const updateProduct = async (formData) => {
  const id = formData.get('id')
  formData.delete('id')
  return await api.put(`/products/${id}`, formData)
}
