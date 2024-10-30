import { Spin } from 'antd'
import { useEffect } from 'react'
import useProduct from '../../../hooks/useProduct'
import ProductCard from '../components/ProductCard'
import HeroSection from './components/HeroSection'

const Home = () => {
  const {
    getProductsQuery: { data, isLoading, isError, error },
  } = useProduct()

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <>
      <HeroSection />

      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 border-t-2">
        <h2 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white sm:text-4xl text-center mb-2">
          Popular Products
        </h2>
        <p className="text-center mb-5 text-xs sm:text-lg">
          All popular product find here
        </p>
        {isLoading && (
          <div className="text-center">
            <Spin size="large" />
          </div>
        )}
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {data?.map(
              (product) =>
                product.status === 'published' && (
                  <ProductCard key={product._id} product={product} />
                ),
            )}
            {isError && <p>Error: {error.message}</p>}
          </div>
        </div>
      </section>
    </>
  )
}
export default Home
