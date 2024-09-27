import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Footer from '../components/(client)/Footer'
import Header from '../components/(client)/Header'
const { Content } = Layout

const ClientLayout = () => {
  return (
    <div className="flex flex-col min-h-0 flex-auto">
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </div>
  )
}
export default ClientLayout
