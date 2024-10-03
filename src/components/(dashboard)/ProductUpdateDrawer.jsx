import { Drawer, message } from 'antd'
import deepEqual from 'deep-equal'
import { memo, useCallback } from 'react'
import useProduct from '../../hooks/useProduct'
import { handleError } from '../../utils'
import ProductForm from './ProductForm'

const ProductUpdateDrawer = ({ open, onClose, product }) => {
  const {
    updateProductMutation: { mutate, isPending },
  } = useProduct()

  const onFinish = useCallback(
    (values) => {
      const productData = (({ _id, updatedAt, key, createdAt, ...rest }) =>
        rest)(product)

      if (deepEqual(productData, values)) {
        message.warning('Nothing to update')
        onClose()
        return
      }

      mutate(
        { ...values, id: product._id },
        {
          onSuccess: () => {
            message.success('Product updated successfully')
            onClose()
          },
          onError: handleError,
        },
      )
    },
    [product],
  )

  return (
    <Drawer
      title="Update product"
      onClose={onClose}
      open={open}
      destroyOnClose
      width={388}
    >
      <ProductForm
        onFinish={onFinish}
        isPending={isPending}
        product={product}
      />
    </Drawer>
  )
}

export default memo(ProductUpdateDrawer)
