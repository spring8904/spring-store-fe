import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, InputNumber, message, Upload } from 'antd'
import PropTypes from 'prop-types'
import { memo, useEffect, useState } from 'react'
import { updateProduct } from '../../services/product'
import { deleteImagesCloudinary } from '../../services/image'
import deepEqual from 'deep-equal'
const { TextArea } = Input

const ProductUpdateDrawer = ({ open, onClose, product }) => {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const [oldThumbnail, setOldThumbnail] = useState('')
  const [newThumbnail, setNewThumbnail] = useState('')
  const [oldImages, setOldImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    form.setFieldsValue(product)
    setOldThumbnail(product.thumbnail)
    setOldImages(product.images)
    setNewImages(product.images)
  }, [form, product, open])

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => await updateProduct(product?._id, values),
    onSuccess: () => {
      message.success('Product updated successfully')
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      onClose()
    },
    onError: (error) => {
      if (Array.isArray(error.response?.data?.message)) {
        error.response?.data?.message.map((err) => {
          message.error(err)
        })
        return
      }
      message.error(error.response?.data?.message)
    },
  })

  const normFile = (e) => {
    if (Array.isArray(e)) return e
    return e?.fileList
  }

  const handleUploadThumbChange = ({ file }) => {
    if (file.status === 'uploading') setLoading(true)

    if (file.status === 'done') {
      setLoading(false)
      setNewThumbnail(file.response.secure_url)
    }
  }

  const handleUploadImagesChange = ({ file, fileList }) => {
    if (file.status === 'uploading') setLoading(true)

    if (file.status === 'done') {
      setLoading(false)
      setNewImages(
        fileList.map((file) => {
          if (file.url) return file.url
          return file.response?.secure_url
        }),
      )
    }

    if (file.status === 'removed') {
      setNewImages(
        fileList.map((file) => {
          if (file.url) return file.url
          return file.response?.secure_url
        }),
      )
    }
  }

  const onFinish = (values) => {
    if (loading) {
      message.warning('Image is uploading, please wait')
      return
    }

    const updateData = {
      ...values,
      thumbnail: newThumbnail || oldThumbnail,
      images: newImages,
    }

    // eslint-disable-next-line no-unused-vars
    const productData = (({ _id, updatedAt, key, createdAt, ...rest }) => rest)(
      product,
    )

    if (deepEqual(productData, updateData)) {
      message.warning('Nothing to update')
      onClose()
      return
    }

    mutate(updateData)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!')

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) message.error('Image must smaller than 2MB!')

    return isJpgOrPng && isLt2M
  }

  const onCloseDrawer = () => {
    if (newThumbnail) deleteImagesCloudinary([newThumbnail])

    const toBeDeleted = newImages.filter((url) => !oldImages.includes(url))
    if (toBeDeleted.length) deleteImagesCloudinary(toBeDeleted)

    onClose()
    form.resetFields()
    setNewThumbnail('')
    setNewImages([])
  }

  return (
    <Drawer
      title="Update product"
      onClose={onCloseDrawer}
      open={open}
      destroyOnClose
      width={388}
    >
      <Form
        name="updateProduct"
        form={form}
        onFinish={onFinish}
        disabled={isPending}
        layout="vertical"
        requiredMark="optional"
        initialValues={product}
      >
        <Form.Item
          label="Product Thumbnail:"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          required
        >
          <Upload
            action={import.meta.env.VITE_CLOUDINARY_UPLOAD_URL}
            listType="picture-card"
            data={{
              upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            }}
            beforeUpload={beforeUpload}
            onChange={handleUploadThumbChange}
            maxCount={1}
            defaultFileList={[{ url: product.thumbnail }]}
          >
            <button type="button">
              <PlusOutlined />
              <div>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Product title:"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input the title of product!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price:"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input the price of product!',
            },
            {
              type: 'number',
              min: 0,
              message: 'Price must be greater than 0',
            },
          ]}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input the description of product!',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Product Images:"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action={import.meta.env.VITE_CLOUDINARY_UPLOAD_URL}
            listType="picture-card"
            data={{
              upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            }}
            beforeUpload={beforeUpload}
            onChange={handleUploadImagesChange}
            defaultFileList={product.images?.map((url, i) => ({
              uid: i,
              url,
            }))}
            multiple
          >
            <button type="button">
              <PlusOutlined />
              <div>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

ProductUpdateDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default memo(ProductUpdateDrawer)
