import { Route, Routes } from 'react-router-dom'
import ClientLayout from './Layouts/ClientLayout'
import Home from './pages/(client)/Home'
import NotFound from './pages/(client)/NotFound'
import ProductDetail from './pages/(client)/ProductDetail'
import Shop from './pages/(client)/Shop'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
export default App
