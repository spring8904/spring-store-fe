import {
  DribbbleOutlined,
  FacebookFilled,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800 border-t-2">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center hover:text-black">
              <img
                className="block w-auto h-8 dark:hidden"
                src="/logo.png"
                alt="logo"
              />
              <span className="text-xl font-medium ml-2">Spring Store</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="https://flowbite.com" className="hover:underline">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©{new Date().getFullYear()}{' '}
            <Link to="/" className="hover:underline">
              Spring Store
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FacebookFilled className="text-lg" />
            </Link>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <InstagramOutlined className="text-lg" />
            </Link>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <TwitterOutlined className="text-lg" />
            </Link>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <GithubOutlined className="text-lg" />
            </Link>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <DribbbleOutlined className="text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
