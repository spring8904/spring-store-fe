import { useMutation, useQuery } from '@tanstack/react-query'
import { getCurrentUser, login, logout, register } from '../services/auth'

const useAuth = () => {
  const token = localStorage.getItem('token')
  const getCurrentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: !!token,
  })

  const loginMutation = useMutation({
    mutationFn: login,
  })

  const registerMutation = useMutation({
    mutationFn: register,
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
  })

  return {
    getCurrentUserQuery,
    loginMutation,
    registerMutation,
    logoutMutation,
  }
}

export default useAuth
