import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from '../services/cart'
import useAuthStore from '../store/authStore'

const CART_QUERY_KEY = 'cart'

const useCart = () => {
  const queryClient = useQueryClient()

  const { user } = useAuthStore()
  const userId = user?.id

  const getCartQuery = useQuery({
    queryKey: [CART_QUERY_KEY, userId],
    queryFn: async () => await getCart(userId),
    enabled: !!userId,
  })

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CART_QUERY_KEY, userId],
      })
    },
  }

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }) =>
      await addToCart(productId, quantity),
    ...mutationOptions,
  })

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }) =>
      await updateQuantity(productId, quantity),
    ...mutationOptions,
  })

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId) => {
      await removeFromCart(productId)
    },
    ...mutationOptions,
  })

  return {
    getCartQuery,
    addToCartMutation,
    updateQuantityMutation,
    removeFromCartMutation,
  }
}

export default useCart
