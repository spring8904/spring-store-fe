import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, InputNumber, message, Upload } from 'antd'
import PropTypes from 'prop-types'
import { memo, useEffect, useState } from 'react'
import { updateProduct } from '../../services/product'
import { deleteImagesCloudinary } from '../../services/image'
const { TextArea } = Input

const ProductUpdateDrawer = ({ open, onClose, product }) => {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const [thumbnail, setThumbnail] = useState('')
  const [newThumbnail, setNewThumbnail] = useState('')
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    form.setFieldsValue(product)
    setThumbnail(product.thumbnail)
    setImages(product.images)
  }, [form, product, open])

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => await updateProduct(product?._id, values),
    onSuccess: () => {
      if (newThumbnail) deleteImagesCloudinary([thumbnail])

      const toBeDeleted = images.filter((url) => !newImages.includes(url))

      if (toBeDeleted.length) deleteImagesCloudinary(toBeDeleted)
      message.success('Product updated successfully')
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      onClose()
    },
  })

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const handleUploadThumbChange = ({ file }) => {
    if (file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (file.status === 'done') {
      setLoading(false)
      setNewThumbnail(file.response.secure_url)
    }
  }

  const handleUploadImagesChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      setLoading(true)
      return
    }

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
      deleteImagesCloudinary([file.url])
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

    if (!newThumbnail) {
      message.error('Please upload an image')
      return
    }

    mutate({ ...values, thumbnail: newThumbnail, images: newImages })
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const onCloseDrawer = () => {
    if (newThumbnail) {
      deleteImagesCloudinary([newThumbnail])
    }

    const toBeDeleted = newImages.filter((url) => !images.includes(url))

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
          label="Product Image:"
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
