import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Upload } from 'antd'
import { memo, useEffect, useState } from 'react'
import { beforeUpload } from '../../utils'
const { Item } = Form
const { TextArea } = Input

const ProductForm = ({ onFinish, isPending, product }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [thumbnail, setThumbnail] = useState(product?.thumbnail || '')
  const [images, setImages] = useState(product?.images || [])

  useEffect(() => {
    if (product) form.setFieldsValue(product)
  }, [product, form])

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList)

  const handleThumbChange = ({ file }) => {
    if (file.status === 'uploading') setLoading(true)

    if (file.status === 'done') {
      setLoading(false)
      setThumbnail(file.response.secure_url)
    }
  }

  const handleImagesChange = ({ file, fileList }) => {
    switch (file.status) {
      case 'uploading':
        setLoading(true)
        break
      case 'done':
        setLoading(false)
        setImages((prev) => [...prev, file.response.secure_url])
        break
      case 'removed':
        setImages(fileList.map((file) => file.url || file.response.secure_url))
    }
  }

  const handleFinish = (values) => {
    if (loading) {
      message.warning('Image is uploading, please wait')
      return
    }

    onFinish({ ...values, thumbnail, images })
  }

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      disabled={isPending}
      layout="vertical"
      requiredMark="optional"
    >
      <Item
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
          onChange={handleThumbChange}
          maxCount={1}
          defaultFileList={
            product?.thumbnail ? [{ url: product.thumbnail }] : []
          }
          accept="image/jpeg,image/png"
        >
          <button type="button">
            <PlusOutlined />
            <div>Upload</div>
          </button>
        </Upload>
      </Item>

      <Item
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
      </Item>

      <Item
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
      </Item>

      <Item
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
      </Item>

      <Item
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
          onChange={handleImagesChange}
          defaultFileList={
            product?.images.length
              ? product.images.map((url, i) => ({
                  uid: i,
                  url,
                }))
              : []
          }
          multiple
          accept="image/jpeg,image/png"
        >
          <button type="button">
            <PlusOutlined />
            <div>Upload</div>
          </button>
        </Upload>
      </Item>

      <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  )
}

export default memo(ProductForm)
