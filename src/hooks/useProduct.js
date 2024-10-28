import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from '../services/product'

const PRODUCT_QUERY_KEY = 'products'

const useProduct = (slug) => {
  const queryClient = useQueryClient()

  const getProductsQuery = useQuery({
    queryKey: [PRODUCT_QUERY_KEY],
    queryFn: getProducts,
  })

  const getProductBySlugQuery = useQuery({
    queryKey: [PRODUCT_QUERY_KEY, slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  })

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_QUERY_KEY],
      })
    },
  }

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    ...mutationOptions,
  })

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    ...mutationOptions,
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    ...mutationOptions,
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
