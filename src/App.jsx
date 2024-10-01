import { Navigate, Route, Routes } from 'react-router-dom'
import ClientLayout from './Layouts/ClientLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/(client)/Home'
import Login from './pages/(client)/Login'
import NotFound from './pages/(client)/NotFound'
import ProductDetail from './pages/(client)/ProductDetail'
import Register from './pages/(client)/Register'
import Shop from './pages/(client)/Shop'
import ProductManagement from './pages/(dashboard)/ProductManagement'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
