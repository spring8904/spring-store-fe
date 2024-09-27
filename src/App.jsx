import { Navigate, Route, Routes } from 'react-router-dom'
import ClientLayout from './Layouts/ClientLayout'
import Home from './pages/(client)/Home'
import ProductDetail from './pages/(client)/ProductDetail'
import Shop from './pages/(client)/Shop'
import DashboardLayout from './layouts/DashboardLayout'
import ProductManagement from './pages/(dashboard)/ProductManagement'
import NotFound from './pages/(client)/NotFound'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:id" element={<ProductDetail />} />
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
