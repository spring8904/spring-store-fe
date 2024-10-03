import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from '@ant-design/icons'
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
import { memo } from 'react'
import useProduct from '../../hooks/useProduct'
import { handleError } from '../../utils'
const { confirm } = Modal

const ProductTable = ({ setSelectedRows, showUpdateDrawer }) => {
  const {
    getAllProductsQuery: { data, isLoading, isError, error },
    deleteProductMutation: { mutate, isPending },
  } = useProduct()

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
        <Dropdown
          trigger={['click']}
          menu={{ items: getProductActionItems(record) }}
        >
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
        mutate(_id, {
          onSuccess: () => message.success('Product deleted successfully!'),
          onError: handleError,
        })
      },
    })
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  return (
    <Table
      rowKey={(record) => record._id}
      rowSelection={{
        type: 'checkbox',
        onChange: (_, selectedRows) => setSelectedRows(selectedRows),
      }}
      columns={columns}
      dataSource={data?.map((product) => ({
        ...product,
        key: product._id,
      }))}
      loading={isLoading || isPending}
    />
  )
}

export default memo(ProductTable)
