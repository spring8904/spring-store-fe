import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../services/product'

const useProduct = (id) => {
  const queryClient = useQueryClient()

  const getAllProductsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await getAllProducts()).data,
  })

  const getProductByIdQuery = useQuery({
    queryKey: ['product', id],
    queryFn: async () => (await getProductById(id)).data,
    enabled: !!id,
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
    mutationFn: async (values) =>
      await updateProduct(values.id, { ...values, id: undefined }),
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
    getAllProductsQuery,
    getProductByIdQuery,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  }
}

export default useProduct
