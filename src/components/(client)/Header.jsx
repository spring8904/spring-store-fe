import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const token = localStorage.getItem('token')
  let isAdmin = false
  const isLogin = !!token

  if (token) {
    const decodedToken = jwtDecode(token)

    if (decodedToken.role === 'admin') isAdmin = true
  }

  const { logout } = useAuth()

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
              <svg
                className="w-5 h-5 lg:me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <span className="hidden sm:flex">My Cart</span>
            </button>

            <button
              id="userDropdownButton1"
              data-dropdown-toggle="userDropdown1"
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              <svg
                className="w-5 h-5 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
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
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
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
