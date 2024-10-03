import {
  DownOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import { Button, Dropdown, Modal } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ProductCreationDrawer from '../../components/(dashboard)/ProductCreationDrawer'
import ProductTable from '../../components/(dashboard)/ProductTable'
import ProductUpdateDrawer from '../../components/(dashboard)/ProductUpdateDrawer'
import useProduct from '../../hooks/useProduct'
const { confirm } = Modal

const ProductManagement = () => {
  useEffect(() => {
    document.title = 'Product Management'
  }, [])

  const [openCreationDrawer, setOpenCreationDrawer] = useState(false)
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const [updatedSelection, setUpdatedSelection] = useState({})
  const [selectedRows, setSelectedRows] = useState([])
  const {
    deleteProductMutation: { mutate },
  } = useProduct()

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

  const showCreationDrawer = () => setOpenCreationDrawer(true)

  const closeCreationDrawer = useCallback(
    () => setOpenCreationDrawer(false),
    [],
  )

  const showUpdateDrawer = useCallback((product) => {
    setOpenUpdateDrawer(true)
    setUpdatedSelection(product)
  }, [])

  const closeUpdateDrawer = useCallback(() => setOpenUpdateDrawer(false), [])

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

  return (
    <div className="p-8">
      <div className="bg-white p-4 rounded-lg">
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
        <ProductTable
          setSelectedRows={setSelectedRows}
          showUpdateDrawer={showUpdateDrawer}
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
