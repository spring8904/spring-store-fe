import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import Loading from './components/Loading'
import useAuth from './hooks/useAuth'
import useCart from './hooks/useCart'
import Router from './router'
import useAuthStore from './store/authStore'
import useCartStore from './store/cartStore'

const App = () => {
  const { setUser, setUserLoading } = useAuthStore()
  const { setCart } = useCartStore()
  const { getCurrentUserQuery } = useAuth()
  const { data: user, isLoading: userLoading, isError } = getCurrentUserQuery
  if (isError) localStorage.removeItem('token')

  const { getCartQuery } = useCart()
  const { data: cart, isLoading: cartLoading } = getCartQuery

  useEffect(() => {
    setUserLoading(userLoading)
  }, [userLoading, setUserLoading])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const id = token ? jwtDecode(token).id : null
    setUser({ ...user, id })
  }, [user, setUser])

  useEffect(() => {
    setCart(cart)
  }, [cart, setCart])

  if (userLoading || cartLoading) return <Loading />

  return <Router />
}
export default App
