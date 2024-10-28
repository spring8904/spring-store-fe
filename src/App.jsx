import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import useAuth from './hooks/useAuth'
import useCart from './hooks/useCart'
import ClientLayout from './layouts/ClientLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Cart from './pages/(client)/Cart'
import Home from './pages/(client)/Home'
import Login from './pages/(client)/Login'
import NotFound from './pages/(client)/NotFound'
import ProductDetail from './pages/(client)/ProductDetail'
import Register from './pages/(client)/Register'
import Shop from './pages/(client)/Shop'
import ProductManagement from './pages/(dashboard)/ProductManagement'
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
    setUser(user)
  }, [user, setUser])

  useEffect(() => {
    setCart(cart)
  }, [cart, setCart])

  if (userLoading || cartLoading) return <Loading />

  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="products" />} />
          <Route path="products" element={<ProductManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
export default App
