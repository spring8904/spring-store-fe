import {
  DollarOutlined,
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
} from '@ant-design/icons'
import { Rate } from 'antd'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const rate = Number((Math.random() * (5 - 1) + 1).toFixed(1))
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <Link to={`/products/${product.slug}`}>
          <img className="mx-auto h-full" src={product.thumbnail} />
          <img
            className="mx-auto hidden h-full dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
          />
        </Link>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            {' '}
            Up to {Math.floor(Math.random() * (50 - 10 + 1)) + 10}% off{' '}
          </span>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              data-tooltip-target="tooltip-quick-look"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only"> Quick look </span>
              <EyeOutlined className="text-lg" />
            </button>

            <button
              type="button"
              data-tooltip-target="tooltip-add-to-favorites"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only"> Add to Favorites </span>
              <HeartOutlined className="text-lg" />
            </button>
          </div>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.title}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            <Rate className="text-base" allowHalf disabled value={rate} />
          </div>

          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {rate}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            ({Math.round(Math.random() * (1000 - 50)) + 50})
          </p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <TruckOutlined className="text-gray-500 text-lg" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fast Delivery
            </p>
          </li>

          <li className="flex items-center gap-2">
            <DollarOutlined className="text-gray-500" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Best Price
            </p>
          </li>
        </ul>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
            ${product.price}
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <ShoppingCartOutlined className="-ms-2 me-2 text-lg" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
