import { Layout } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/(dashboard)/Navbar'
import Sidebar from '../components/(dashboard)/Sidebar'
const { Header, Footer, Sider, Content } = Layout

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  const token = localStorage.getItem('token')

  if (!token) return <Navigate to="/login" />

  try {
    const decodedToken = jwtDecode(token)

    if (decodedToken.role !== 'admin') return <Navigate to="/" />
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return <Navigate to="/" />
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        className="drop-shadow-2xl"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        width={256}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header className="bg-white">
          <Navbar />
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer className="text-center">
          Spring Store ©{new Date().getFullYear()} Created by{' '}
          <a href="https://github.com/spring8904" target="_blank">
            spring8904
          </a>
        </Footer>
      </Layout>
    </Layout>
  )
}
export default DashboardLayout
