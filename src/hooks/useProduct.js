import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from '../services/product'

const useProduct = (slug) => {
  const queryClient = useQueryClient()

  const getProductsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getProducts(),
  })

  const getProductBySlugQuery = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => await getProductBySlug(slug),
    enabled: !!slug,
  })

  const createProductMutation = useMutation({
    mutationFn: async (product) => await createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: async (formData) => {
      const id = formData.get('id')
      formData.delete('id')
      return await updateProduct(id, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => await deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    },
  })

  return {
    getProductsQuery,
    getProductBySlugQuery,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  }
}

export default useProduct
