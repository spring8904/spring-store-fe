import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, InputNumber, message, Upload } from 'antd'
import PropTypes from 'prop-types'
import { memo, useState } from 'react'
import { createProduct } from '../../services/product'
import { deleteImagesCloudinary } from '../../services/image'
const { TextArea } = Input

const ProductCreationDrawer = ({ open, onClose }) => {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const [thumbnail, setThumbnail] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => await createProduct(product),
    onSuccess: () => {
      onCloseDrawer()
      message.success('Product created successfully')
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })

  const onCloseDrawer = () => {
    onClose()
    form.resetFields()
    setThumbnail('')
    setImages([])
  }

  const normFile = (e) => {
    if (Array.isArray(e)) return e

    return e?.fileList
  }

  const handleUploadThumbChange = ({ file }) => {
    if (file.status === 'uploading') setLoading(true)

    if (file.status === 'done') {
      if (thumbnail) deleteImagesCloudinary([thumbnail])
      setLoading(false)
      setThumbnail(file.response.secure_url)
    }
  }

  const handleUploadImagesChange = ({ file, fileList }) => {
    if (file.status === 'uploading') setLoading(true)

    if (file.status === 'done') {
      setLoading(false)
      setImages(fileList.map((file) => file.response?.secure_url))
    }

    if (file.status === 'removed') {
      deleteImagesCloudinary([file.response?.secure_url])
      setImages(fileList.map((file) => file.response?.secure_url))
    }
  }

  const onFinish = (values) => {
    if (loading) {
      message.warning('Image is uploading, please wait')
      return
    }

    if (!thumbnail) {
      message.error('Please upload the thumbnail of product!')
      return
    }

    mutate({ ...values, thumbnail, images })
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!')

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) message.error('Image must smaller than 2MB!')

    return isJpgOrPng && isLt2M
  }

  return (
    <Drawer
      title="Create a new product"
      onClose={() => {
        if (thumbnail) deleteImagesCloudinary([thumbnail])

        if (images.length) deleteImagesCloudinary(images)

        onCloseDrawer()
      }}
      open={open}
      destroyOnClose
      width={388}
    >
      <Form
        name="createProduct"
        form={form}
        onFinish={onFinish}
        disabled={isPending}
        layout="vertical"
        requiredMark="optional"
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
          label="Description:"
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

ProductCreationDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default memo(ProductCreationDrawer)
