import { ArrowRightOutlined } from '@ant-design/icons'
import { Empty } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../../components/(client)/CartItem'
import useCartStore from '../../store/cartStore'

const Cart = () => {
  useEffect(() => {
    document.title = 'Cart'
  }, [])

  const { cart } = useCartStore()

  let total = 0
  if (cart)
    total = cart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    )

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart?.products.length ? (
                cart?.products.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>
              <div className="space-y-4">
                {cart?.products.map((item) => (
                  <dl
                    key={item._id}
                    className="flex items-center justify-between gap-4"
                  >
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {item.product.title} (x{item.quantity})
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${item.product.price * item.quantity}
                    </dd>
                  </dl>
                ))}

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${total}
                  </dd>
                </dl>
              </div>
              <button className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Proceed to Checkout
              </button>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {' '}
                  or{' '}
                </span>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <ArrowRightOutlined />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Cart
