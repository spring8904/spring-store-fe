import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Dropdown, Image, Modal, Rate, Space, Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import ProductCreationDrawer from '../../components/(dashboard)/productCreationDrawer'
import { deleteProduct, getAllProducts } from '../../services/product'
const { confirm } = Modal

const ProductManagement = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await getAllProducts()
      return data.data.map((product) => ({
        ...product,
        key: product._id,
      }))
    },
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deleteProduct(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })

  const [openProductCreationDrawer, setOpenProductCreationDrawer] =
    useState(false)

  const columns = [
    {
      title: 'PRODUCT',
      dataIndex: 'title',
      render: (title, { image }) => (
        <div className="flex items-center gap-2">
          <Image width={32} src={image} /> {title}
        </div>
      ),
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: (price) => <span>${price}</span>,
    },
    {
      title: 'RATING',
      render: () => {
        const rate = Number((Math.random() * (5 - 1) + 1).toFixed(1))
        return (
          <div className="flex items-center gap-1">
            <Rate allowHalf disabled defaultValue={rate} /> {rate}
          </div>
        )
      },
    },
    {
      render: (_, { _id }) => (
        <Dropdown menu={{ items: getProductActionItems(_id) }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Action
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ]

  const getProductActionItems = (id) => [
    {
      key: 'edit',
      label: (
        <Button block type="primary" icon={<EditOutlined />} onClick={() => {}}>
          Edit
        </Button>
      ),
    },
    {
      key: 'preview',
      label: (
        <Button block color="default" variant="outlined" icon={<EyeOutlined />}>
          Preview
        </Button>
      ),
    },
    {
      key: 'delete',
      label: (
        <Button
          block
          color="danger"
          variant="outlined"
          icon={<DeleteOutlined />}
          onClick={() => showDeleteConfirm(id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  const items = [
    {
      key: 'deleteAll',
      label: (
        <Button type="link" danger>
          Delete all
        </Button>
      ),
    },
  ]

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this product?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        mutate(id)
      },
    })
  }

  const showProductCreationDrawer = () => setOpenProductCreationDrawer(true)

  const closeProductCreationDrawer = () => setOpenProductCreationDrawer(false)

  useEffect(() => {
    document.title = 'Product Management'
  }, [])

  if (isLoading)
    return (
      <div className="text-center">
        <Spin size="large" />
      </div>
    )

  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="p-8">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-end items-center gap-2 mb-3">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showProductCreationDrawer}
          >
            Add product
          </Button>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button icon={<DownOutlined />} iconPosition="end">
              Action
            </Button>
          </Dropdown>
        </div>
        <Table
          rowKey={(record) => record._id}
          rowSelection={{
            type: 'checkbox',
          }}
          columns={columns}
          dataSource={data}
        />
        <ProductCreationDrawer
          open={openProductCreationDrawer}
          onCloseDrawer={closeProductCreationDrawer}
        />
      </div>
    </div>
  )
}
export default ProductManagement
