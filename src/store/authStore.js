import { create } from 'zustand'

const initUser = {
  _id: '',
  email: '',
  name: '',
}

const useAuthStore = create((set) => ({
  user: initUser,
  isAuthenticated: false,
  isLoading: false,
  setUserLoading: (isLoading) => set({ isLoading }),
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: initUser, isAuthenticated: false }),
}))

export default useAuthStore
