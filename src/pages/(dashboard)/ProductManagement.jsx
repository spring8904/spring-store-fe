import { useCallback, useEffect, useState } from 'react'
import ProductCreationDrawer from '../../components/(dashboard)/ProductCreationDrawer'
import ProductTable from '../../components/(dashboard)/ProductTable'
import ProductUpdateDrawer from '../../components/(dashboard)/ProductUpdateDrawer'

const ProductManagement = () => {
  useEffect(() => {
    document.title = 'Product Management'
  }, [])

  const [openCreationDrawer, setOpenCreationDrawer] = useState(false)
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const [updatedSelection, setUpdatedSelection] = useState({})

  const showCreationDrawer = useCallback(() => setOpenCreationDrawer(true), [])

  const closeCreationDrawer = useCallback(
    () => setOpenCreationDrawer(false),
    [],
  )

  const showUpdateDrawer = useCallback((product) => {
    setOpenUpdateDrawer(true)
    setUpdatedSelection(product)
  }, [])

  const closeUpdateDrawer = useCallback(() => setOpenUpdateDrawer(false), [])

  return (
    <div className="p-8">
      <div className="bg-white p-4 rounded-lg">
        <ProductTable
          showCreationDrawer={showCreationDrawer}
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
