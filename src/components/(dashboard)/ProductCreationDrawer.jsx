import { Drawer, message } from 'antd'
import { memo, useCallback } from 'react'
import useProduct from '../../hooks/useProduct'
import { handleError } from '../../utils'
import ProductForm from './ProductForm'

const ProductCreationDrawer = ({ open, onClose }) => {
  const {
    createProductMutation: { mutate, isPending },
  } = useProduct()

  const onFinish = useCallback(
    (values) => {
      mutate(values, {
        onSuccess: () => {
          onClose()
          message.success('Product created successfully')
        },
        onError: handleError,
      })
    },
    [mutate, onClose],
  )

  return (
    <Drawer
      title="Create a new product"
      onClose={onClose}
      open={open}
      destroyOnClose
      width={388}
    >
      <ProductForm onFinish={onFinish} isPending={isPending} />
    </Drawer>
  )
}

export default memo(ProductCreationDrawer)
