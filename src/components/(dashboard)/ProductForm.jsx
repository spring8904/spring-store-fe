import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from 'antd'
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
        label="Thumbnail:"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        required
      >
        <Upload
          className="!flex justify-center"
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
          showUploadList={{ showPreviewIcon: !!product?.thumbnail }}
        >
          <button type="button">
            <PlusOutlined />
            <div>Upload</div>
          </button>
        </Upload>
      </Item>

      <Item
        label="Title:"
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
        label="Description:"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input the description of product!',
          },
        ]}
      >
        <TextArea rows={2} />
      </Item>

      <Row gutter={8}>
        <Col span={12}>
          <Item
            label="Price:"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input the price!',
              },
              {
                type: 'number',
                min: 0,
                message: 'Price must be greater than or equal to 0',
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Item>
        </Col>

        <Col span={12}>
          <Item
            label="Quantity:"
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Please input the quantity!',
              },
              {
                type: 'number',
                min: 1,
                message: 'Quantity must be greater than or equal to 1',
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Item>
        </Col>
      </Row>

      <Form.Item
        name="status"
        label="Status:"
        rules={[{ required: true, message: 'Please select the status!' }]}
      >
        <Select
          options={[
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Inactive', value: 'inactive' },
          ]}
        />
      </Form.Item>

      <Item
        label="Images:"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action={import.meta.env.VITE_CLOUDINARY_UPLOAD_URL}
          listType="picture"
          data={{
            upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          }}
          beforeUpload={beforeUpload}
          onChange={handleImagesChange}
          defaultFileList={
            product?.images.length
              ? product.images.map((url, i) => {
                  const parts = url.split('/')
                  const name = parts[parts.length - 1]
                  return {
                    uid: i,
                    url,
                    name,
                  }
                })
              : []
          }
          multiple
          accept="image/jpeg,image/png"
        >
          <Button block icon={<UploadOutlined />}>
            Upload
          </Button>
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
