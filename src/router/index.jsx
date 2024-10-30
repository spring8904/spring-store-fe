import { Navigate, Route, Routes } from 'react-router-dom'
import ClientLayout from '../layouts/ClientLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Cart from '../pages/(client)/cart/page'
import Home from '../pages/(client)/home/page'
import Login from '../pages/(client)/login/page'
import NotFound from '../pages/(client)/notFound/page'
import ProductDetail from '../pages/(client)/products/[slug]/page'
import Register from '../pages/(client)/register/page'
import Shop from '../pages/(client)/shop/page'
import ProductManagement from '../pages/dashboard/products/page'

const Router = () => {
  return (
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
  )
}
export default Router
