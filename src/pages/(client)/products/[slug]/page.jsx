import {
  HeartOutlined,
  HomeOutlined,
  RightOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Breadcrumb, message, Spin, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useCart from '../../../../hooks/useCart'
import useProduct from '../../../../hooks/useProduct'
import { handleError } from '../../../../utils'

const ProductDetail = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [product, setProduct] = useState({})

  const {
    getProductBySlugQuery: { data, isLoading, isError, error },
  } = useProduct(slug)

  useEffect(() => {
    if (!isLoading)
      if (data && data.status === 'published') {
        setProduct(data)
        document.title = data.title
      } else navigate('/404')
  }, [data, isLoading, navigate])

  const { addToCartMutation } = useCart()
  const { mutate, isPending } = addToCartMutation

  const handleAddToCart = () =>
    mutate(
      { productId: product._id },
      {
        onSuccess: () => message.success('Added to cart'),
        onError: handleError,
      },
    )

  const tab = product.images?.length
    ? product.images?.map((img, index) => ({
        key: `${index + 2}`,
        label: (
          <img
            className="w-16 h-16 object-contain"
            src={img}
            alt={product.title}
          />
        ),

        children: <img className="w-full" src={img} alt={product.title} />,
      }))
    : []

  const items = [
    {
      key: '1',
      label: (
        <img
          className="w-16 h-16 object-contain"
          src={product.thumbnail}
          alt={product.title}
        />
      ),
      children: (
        <img className="w-full" src={product.thumbnail} alt={product.title} />
      ),
    },
    ...tab,
  ]

  if (isLoading)
    return (
      <div className="text-center py-8">
        <Spin size="large" />
      </div>
    )

  if (isError) return <p>Error: {error.message}</p>

  return (
    <>
      <section className="pt-4 pb-8 bg-white md:pt-12 md:pb-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="mb-8 md:mb-12">
            <Breadcrumb
              separator={<RightOutlined />}
              className="text-sm font-medium"
              items={[
                {
                  title: (
                    <Link to="/">
                      <HomeOutlined className="me-2.5" />
                      Home
                    </Link>
                  ),
                },
                {
                  title: <Link to="/shop">Shop</Link>,
                },

                {
                  title: product.title,
                },
              ]}
            />
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto overflow-hidden">
              <Tabs
                tabPosition="left"
                defaultActiveKey="1"
                items={items}
                className="h-96"
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.title}
              </h1>
              <div className="mt-4">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  ${product.price}
                </p>

                <p className="text-base text-gray-900 mt-2">
                  Stock: {product.quantity}
                </p>
              </div>

              <div className="mt-3 sm:gap-4 sm:items-center sm:flex sm:mt-4">
                <Link
                  to="#"
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <HeartOutlined className="text-lg -ms-2 me-2" />
                  Add to favorites
                </Link>

                <button
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  disabled={isPending}
                  onClick={handleAddToCart}
                >
                  <ShoppingCartOutlined className="text-lg -ms-2 me-2" />
                  Add to cart
                </button>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default ProductDetail
