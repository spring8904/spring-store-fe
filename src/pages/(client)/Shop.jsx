import {
  DownOutlined,
  FilterOutlined,
  HomeOutlined,
  RightOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Spin } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/(client)/ProductCard'
import useProduct from '../../hooks/useProduct'

const Shop = () => {
  const {
    getProductsQuery: { data, isLoading, isError, error },
  } = useProduct()

  useEffect(() => {
    document.title = 'Shop'
  }, [])

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
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
                  title: 'Shop',
                },
              ]}
            />
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shop page
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              data-modal-toggle="filterModal"
              data-modal-target="filterModal"
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            >
              <FilterOutlined className="-ms-0.5 me-2 text-base" />
              Filters
              <DownOutlined className="-me-0.5 ms-2" />
            </button>
            <button
              id="sortDropdownButton1"
              data-dropdown-toggle="dropdownSort1"
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            >
              <SortAscendingOutlined className="-ms-0.5 me-2 text-base" />
              Sort
              <DownOutlined className="-me-0.5 ms-2" />
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="text-center">
            <Spin size="large" />
          </div>
        )}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {isError && <p>Error: {error.message}</p>}
        </div>
      </div>
    </section>
  )
}
export default Shop
