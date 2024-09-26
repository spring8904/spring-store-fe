import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Footer from '../components/(client)/Footer'
import Header from '../components/(client)/Header'
const { Content } = Layout

const ClientLayout = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}
export default ClientLayout
