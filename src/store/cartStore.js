import { create } from 'zustand'

const useCartStore = create((set) => ({
  cart: { products: [] },
  setCart: (cart) => set({ cart }),
}))

export default useCartStore
