import { useMutation } from '@tanstack/react-query'
import * as authServices from '../services/auth'

const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: async (values) => await authServices.login(values),
    onSuccess: (res) => {
      if (res.token) localStorage.setItem('token', res.token)
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (values) => await authServices.register(values),
  })

  return {
    loginMutation,
    registerMutation,
  }
}

export default useAuth
