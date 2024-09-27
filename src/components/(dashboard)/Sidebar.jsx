import {
  PieChartOutlined,
  ProductOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import { Divider, Menu } from 'antd'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ collapsed }) => {
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState('')

  const items = [
    {
      key: 'shop',
      label: <Link to="/">Website</Link>,
      icon: <ShopOutlined />,
    },
    {
      key: 'dashboard',
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <PieChartOutlined />,
    },
    {
      key: 'products',
      label: <Link to="/dashboard/products">Product Management</Link>,
      icon: <ProductOutlined />,
    },
  ]

  useEffect(() => {
    const path = location.pathname

    if (path === '/dashboard') setSelectedKey('dashboard')
    else if (path === '/dashboard/products') setSelectedKey('products')
  }, [location])

  return (
    <>
      <div className="py-5">
        <Link
          to="/"
          className="flex items-center hover:text-black justify-center"
        >
          <img
            className="block w-auto h-8 dark:hidden"
            src="/logo.png"
            alt="logo"
          />
          {!collapsed && (
            <span className="text-2xl font-medium ml-2">Spring Store</span>
          )}
        </Link>
      </div>
      <div className="px-4">
        <Divider className="my-0 bg-gray-400 opacity-30 h-px" />
      </div>
      <Menu
        className="mt-2"
        selectedKeys={selectedKey}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </>
  )
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
}

export default Sidebar
