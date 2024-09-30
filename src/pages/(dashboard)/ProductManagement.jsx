import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Dropdown,
  Image,
  message,
  Modal,
  Rate,
  Space,
  Table,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ProductCreationDrawer from '../../components/(dashboard)/ProductCreationDrawer'
import ProductUpdateDrawer from '../../components/(dashboard)/ProductUpdateDrawer'
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
    mutationFn: async (id) => await deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      message.success('Product deleted successfully!')
    },
    onError: (error) => {
      message.error('Failed to delete the product: ' + error.message)
      console.error(error)
    },
  })

  const [openCreationDrawer, setOpenCreationDrawer] = useState(false)
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const [updatedSelection, setUpdatedSelection] = useState({})
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(() => {
    document.title = 'Product Management'
  }, [])

  const columns = [
    {
      title: 'PRODUCT',
      dataIndex: 'title',
      render: (title, { thumbnail }) => (
        <div className="flex items-center gap-4">
          <Image width={64} src={thumbnail} /> {title}
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
            <Rate allowHalf disabled value={rate} /> {rate}
          </div>
        )
      },
    },
    {
      render: (_, record) => (
        <Dropdown menu={{ items: getProductActionItems(record) }}>
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

  const getProductActionItems = (product) => [
    {
      key: 'edit',
      label: (
        <Button
          block
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            showUpdateDrawer(product)
          }}
        >
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
          onClick={() => showDeleteConfirm(product)}
        >
          Delete
        </Button>
      ),
    },
  ]

  const showDeleteConfirm = ({ _id, title }) => {
    confirm({
      title: 'Are you sure?',
      content: `Are you sure you want to delete the "${title}" product?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        mutate(_id)
      },
    })
  }

  const showDeleteMultipleConfirm = () => {
    if (!selectedRows.length) return

    if (selectedRows.length === 1) {
      showDeleteConfirm(selectedRows[0])
      return
    }

    confirm({
      title: 'Are you sure?',
      content: `Are you sure you want to delete ${selectedRows.length} products?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        selectedRows.forEach((product) => {
          mutate(product._id)
        })
      },
    })
  }

  const items = [
    {
      key: 'deleteMultipleProducts',
      label: (
        <Button type="link" danger onClick={showDeleteMultipleConfirm}>
          Delete
        </Button>
      ),
    },
  ]

  const showCreationDrawer = () => setOpenCreationDrawer(true)

  const closeCreationDrawer = useCallback(
    () => setOpenCreationDrawer(false),
    [],
  )

  const showUpdateDrawer = (product) => {
    setOpenUpdateDrawer(true)
    setUpdatedSelection(product)
  }

  const closeUpdateDrawer = useCallback(() => setOpenUpdateDrawer(false), [])

  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="p-8">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-end items-center gap-2 mb-3">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreationDrawer}
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
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }}
          columns={columns}
          dataSource={data}
          loading={isLoading}
        />
        <ProductCreationDrawer
          open={openCreationDrawer}
          onClose={closeCreationDrawer}
        />
        <ProductUpdateDrawer
          open={openUpdateDrawer}
          onClose={closeUpdateDrawer}
          product={updatedSelection}
        />
      </div>
    </div>
  )
}
export default ProductManagement
