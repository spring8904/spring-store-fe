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
  Spin,
  Upload,
} from 'antd'
import deepEqual from 'deep-equal'
import { memo, useEffect, useState } from 'react'
import { beforeUpload, getPublicIdFromUrl } from '../../utils'
const { Item } = Form
const { TextArea } = Input

const ProductForm = ({ onFinish, isPending, product }) => {
  const [form] = Form.useForm()
  const [thumbnail, setThumbnail] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    if (product) {
      const { thumbnail, images, ...rest } = product

      const convertedImage = images.map((url) => {
        const parts = url.split('/')
        const name = parts[parts.length - 1]
        return {
          uid: getPublicIdFromUrl(url),
          url,
          name,
          old: true,
        }
      })

      setImages(convertedImage)

      form.setFieldsValue({
        ...rest,
        thumbnail: [{ uid: '0', url: thumbnail }],
        images: convertedImage,
      })
    }
  }, [product, form])

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList)

  const handleThumbChange = ({ fileList }) => setThumbnail(fileList)

  const handleImagesChange = ({ fileList }) => setImages(fileList)

  const handleFinish = (values) => {
    if (product) {
      const isChange = hasChangesDetected()

      if (!isChange) {
        message.info('No changes detected!')
        return
      }
    }

    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      if (
        values[key] !== undefined &&
        values[key] !== null &&
        values[key] !== '' &&
        key !== 'images' &&
        key !== 'thumbnail'
      )
        formData.append(key, values[key])
    })

    if (thumbnail.length)
      formData.append('thumbnail', thumbnail[0].originFileObj)

    if (images.length)
      images.forEach((image) => {
        if (image.originFileObj) formData.append('images', image.originFileObj)

        if (image.old) formData.append('oldImages', image.url)
      })

    onFinish(formData)
  }

  const hasChangesDetected = () => {
    const formValues = form.getFieldsValue()
    const transformedData = {
      ...formValues,
      thumbnail: formValues.thumbnail[0]?.url || '',
      images: formValues.images.map((image) => image.url),
    }

    // eslint-disable-next-line no-unused-vars
    const { createdAt, key, slug, updatedAt, _id, ...productValues } = product

    return !deepEqual(transformedData, productValues)
  }

  return (
    <Spin spinning={isPending}>
      <Form
        form={form}
        onFinish={handleFinish}
        disabled={isPending}
        layout="vertical"
        requiredMark="optional"
      >
        <Item
          label="Thumbnail:"
          name="thumbnail"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Thumbnail is required!' }]}
        >
          <Upload
            className="!flex justify-center"
            listType="picture-card"
            accept="image/jpeg,image/png"
            beforeUpload={beforeUpload}
            fileList={thumbnail}
            onChange={handleThumbChange}
            maxCount={1}
            showUploadList={{ showPreviewIcon: false }}
          >
            <button type="button">
              <PlusOutlined />
              <div>{thumbnail.length ? 'Edit' : 'Upload'}</div>
            </button>
          </Upload>
        </Item>

        <Item
          label="Title:"
          name="title"
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Title is required!',
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
              whitespace: true,
              message: 'Description is required!',
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
                  message: 'Price is required!',
                },
                {
                  type: 'number',
                  min: 0,
                  message: 'Price must be greater than or equal to 0!',
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
                  message: 'Quantity is required!',
                },
                {
                  type: 'number',
                  min: 1,
                  message: 'Quantity must be greater than or equal to 1!',
                },
              ]}
            >
              <InputNumber className="w-full" />
            </Item>
          </Col>
        </Row>

        <Form.Item
          label="Status:"
          name="status"
          rules={[
            { required: true, message: 'Status is required!' },
            {
              type: 'enum',
              enum: ['draft', 'published', 'inactive'],
              message: 'Status is invalid!',
            },
          ]}
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
          name="images"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture"
            accept="image/jpeg,image/png"
            maxCount={10}
            multiple
            beforeUpload={beforeUpload}
            fileList={images}
            onChange={handleImagesChange}
          >
            <Button block icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" disabled={isPending}>
            Submit
          </Button>
        </Item>
      </Form>
    </Spin>
  )
}

export default memo(ProductForm)
