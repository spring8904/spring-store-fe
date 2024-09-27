import { AppstoreOutlined, BellOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Input } from 'antd'
import { useEffect, useState } from 'react'
const { Search } = Input

const Navbar = () => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTitle(document.title)
    })

    observer.observe(document.querySelector('title'), {
      childList: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex items-center justify-between h-full text-gray-500">
      <span className="text-lg">{title}</span>
      <div className="flex gap-6 items-center">
        <Search className="w-52 border-black" placeholder="Search" allowClear />
        <AppstoreOutlined className="text-2xl" />
        <Badge count={100}>
          <BellOutlined className="text-2xl text-gray-500" />
        </Badge>
        <UserOutlined className="text-2xl" />
      </div>
    </div>
  )
}
export default Navbar
