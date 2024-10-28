import {
  CloseOutlined,
  ExclamationCircleFilled,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { message, Modal, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import useCart from '../../hooks/useCart'
const { confirm } = Modal

const CartItem = ({ item }) => {
  const { product } = item
  const { updateQuantityMutation, removeFromCartMutation } = useCart()
  const { mutate: updateQuantity } = updateQuantityMutation
  const { mutate: removeFromCart } = removeFromCartMutation

  const [quantity, setQuantity] = useState(item.quantity)
  const debouncedUpdateQuantity = useDebouncedCallback(updateQuantity, 200)

  useEffect(() => {
    debouncedUpdateQuantity({ productId: product._id, quantity })
  }, [product._id, quantity, debouncedUpdateQuantity])

  const handleIncrement = () => {
    if (quantity >= product.quantity) {
      message.error('Maximum quantity reached')
      return
    }

    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity <= 1) {
      showRemoveConfirm()
      return
    }

    setQuantity((prev) => prev - 1)
  }

  const handleRemove = () => {
    removeFromCart(product._id, {
      onSuccess: () => {
        message.success('Removed from cart')
      },
      onError: (error) => {
        message.error(error.message)
      },
    })
  }

  const showRemoveConfirm = () => {
    confirm({
      title: 'Are you sure?',
      content: `Are you sure you want to remove the  product?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleRemove()
      },
    })
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link to={`/products/${product.slug}`} className="shrink-0 md:order-1">
          <img className="h-20 w-20" src={product.thumbnail} />
        </Link>
        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <MinusOutlined />
            </button>
            <input
              type="text"
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              value={quantity}
              disabled
            />
            <button
              onClick={handleIncrement}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <PlusOutlined />
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              ${product.price}
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link
            to={`/products/${product.slug}`}
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {product.title}
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <HeartOutlined className="me-1.5" />
              Add to Favorites
            </button>

            <button
              onClick={showRemoveConfirm}
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <CloseOutlined className="me-1.5" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CartItemLoading = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Skeleton.Image active />
        <Skeleton active />
      </div>
    </div>
  )
}

export default CartItem
