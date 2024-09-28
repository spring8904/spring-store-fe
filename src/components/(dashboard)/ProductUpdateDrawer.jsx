import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, InputNumber, message, Upload } from 'antd'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { updateProduct } from '../../services/product'
const { TextArea } = Input

const ProductUpdateDrawer = ({ open, onClose, product }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(product)
    setImageUrl(product.image)
  }, [form, product])

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      await updateProduct(product?._id, values)
    },
    onSuccess: () => {
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

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      setLoading(false)
      setImageUrl(info.file.response.secure_url)
    }
  }
  const onFinish = (values) => {
    if (loading) {
      message.warning('Image is uploading, please wait')
      return
    }

    mutate({ ...values, image: imageUrl })
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

  return (
    <Drawer
      title="Update product"
      onClose={() => {
        onClose()
        form.resetFields()
      }}
      open={open}
      destroyOnClose={true}
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
          label="Product Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          required
        >
          <Upload
            action="https://api.cloudinary.com/v1_1/spring8904/image/upload"
            listType="picture-card"
            data={{
              upload_preset: 'web209',
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            className="w-full"
            maxCount={1}
            showUploadList={imageUrl || loading}
          >
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
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
          <InputNumber style={{ width: '100%' }} />
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
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }),
}

export default ProductUpdateDrawer
