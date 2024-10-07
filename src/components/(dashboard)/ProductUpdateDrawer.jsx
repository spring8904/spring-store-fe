import { Drawer, message } from 'antd'
import { memo, useCallback } from 'react'
import useProduct from '../../hooks/useProduct'
import { handleError } from '../../utils'
import ProductForm from './ProductForm'

const ProductUpdateDrawer = ({ open, onClose, product }) => {
  const {
    updateProductMutation: { mutate, isPending },
  } = useProduct()

  const onFinish = useCallback(
    (formData) => {
      formData.append('id', product._id)
      mutate(formData, {
        onSuccess: () => {
          message.success('Product updated successfully')
          onClose()
        },
        onError: handleError,
      })
    },
    [mutate, onClose, product],
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
