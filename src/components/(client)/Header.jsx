import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  let isAdmin = false
  const isLogin = !!token

  if (token) {
    const decodedToken = jwtDecode(token)

    if (decodedToken.role === 'admin') isAdmin = true
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/" className="flex items-center hover:text-black">
                <img className="block w-auto h-8 dark:hidden" src="/logo.png" />
                <span className="text-xl font-medium ml-2">Spring Store</span>
              </Link>
            </div>

            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              {isAdmin && (
                <li className="shrink-0">
                  <NavLink
                    to="/dashboard"
                    className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/"
                  className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Home
                </NavLink>
              </li>
              <li className="shrink-0">
                <NavLink
                  to="/shop"
                  className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Shop
                </NavLink>
              </li>
              {isLogin ? (
                <li className="shrink-0">
                  <button
                    onClick={logout}
                    className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="shrink-0">
                    <NavLink
                      to="/login"
                      className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="shrink-0">
                    <NavLink
                      to="/register"
                      className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex items-center lg:space-x-2">
            <button
              id="myCartDropdownButton1"
              data-dropdown-toggle="myCartDropdown1"
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              <span className="sr-only">Cart</span>
              <ShoppingCartOutlined className="text-lg me-1" />
              <span className="hidden sm:flex">My Cart</span>
            </button>

            <button
              id="userDropdownButton1"
              data-dropdown-toggle="userDropdown1"
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              <UserOutlined className="text-lg me-1" />
              Account
            </button>

            <button
              type="button"
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded="false"
              className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open Menu</span>
              <MenuOutlined className="text-lg" />
            </button>
          </div>
        </div>

        <div
          id="ecommerce-navbar-menu-1"
          className={`bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 ${
            isOpen ? '' : 'hidden'
          } px-4 mt-4 lg:hidden`}
        >
          <ul className="text-gray-900 dark:text-white text-sm font-medium space-y-3">
            {isAdmin && (
              <li className="shrink-0">
                <NavLink
                  to="/dashboard"
                  className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/"
                className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Home
              </NavLink>
            </li>
            <li className="shrink-0">
              <NavLink
                to="/shop"
                className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Shop
              </NavLink>
            </li>
            {isLogin ? (
              <li className="shrink-0">
                <button
                  onClick={logout}
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="shrink-0">
                  <NavLink
                    to="/login"
                    className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="shrink-0">
                  <NavLink
                    to="/register"
                    className="aria-[current=page]:text-primary-700 flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Header
