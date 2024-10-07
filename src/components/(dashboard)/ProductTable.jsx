import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Button,
  Dropdown,
  Image,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
} from 'antd'
import { memo, useRef, useState } from 'react'
import useProduct from '../../hooks/useProduct'
import { handleError } from '../../utils'
import Highlighter from 'react-highlight-words'
const { confirm } = Modal

const ProductTable = ({ showCreationDrawer, showUpdateDrawer }) => {
  const {
    getProductsQuery: { data, isLoading, isError, error },
    deleteProductMutation: { mutate, isPending },
  } = useProduct()

  const [selectedRows, setSelectedRows] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div className="p-2 flex flex-col" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          allowClear
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-2"
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button type="default" size="small" onClick={close}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text, record) =>
      searchedColumn === dataIndex ? (
        <Space>
          {dataIndex === 'title' && <Image width={64} src={record.thumbnail} />}
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        </Space>
      ) : (
        <Space>
          {dataIndex === 'title' && <Image width={64} src={record.thumbnail} />}
          {text}
        </Space>
      ),
  })

  const columns = [
    {
      title: 'PRODUCT',
      dataIndex: 'title',
      render: (text, record) =>
        searchedColumn === 'title' ? (
          <Space>
            <Image width={64} src={record.thumbnail} />
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          </Space>
        ) : (
          <Space>
            <Image width={64} src={record.thumbnail} />
            {text}
          </Space>
        ),
      ...getColumnSearchProps('title'),
    },
    {
      title: 'QTY',
      dataIndex: 'quantity',
      render: (quantity) =>
        quantity < 10 ? (
          <Space>
            <span className="text-yellow-500">{quantity}</span>
            <Tag color="gold">Low stock</Tag>
          </Space>
        ) : (
          quantity
        ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: (price) => '$' + price,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case 'draft':
            return <Tag color="blue">Draft</Tag>
          case 'published':
            return <Tag color="green">Published</Tag>
          case 'inactive':
            return <Tag color="red">Inactive</Tag>
        }
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
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

  const showDeleteMultipleConfirm = () => {
    if (!selectedRows.length) return

    const content =
      selectedRows.length === 1
        ? `Are you sure you want to delete the "${selectedRows[0].title}" product?`
        : `Are you sure you want to delete ${selectedRows.length} products?`

    confirm({
      title: 'Are you sure?',
      content,
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

  if (isError) {
    return <div>{error.message}</div>
  }

  return (
    <>
      <div className="flex justify-end items-center gap-2 mb-3">
        <Button type="primary" onClick={showCreationDrawer}>
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
        dataSource={data
          ?.map((product) => ({
            ...product,
            key: product._id,
          }))
          .reverse()}
        loading={isLoading || isPending}
        showSorterTooltip={false}
      />
    </>
  )
}

export default memo(ProductTable)
