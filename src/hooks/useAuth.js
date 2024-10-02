import { useMutation } from '@tanstack/react-query'
import * as authServices from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const useAuth = () => {
  const navigate = useNavigate()

  const onError = (error) => {
    Array.isArray(error.response?.data?.message)
      ? error.response?.data?.message.map((err) => message.error(err))
      : message.error(error.response?.data?.message)
  }

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: async (values) => await authServices.login(values),
    onSuccess: (res) => {
      if (localStorage.getItem('token')) localStorage.removeItem('token')
      if (res.data?.token) localStorage.setItem('token', res.data.token)
      message.success('Login successfully')
      res.data?.isAdmin ? navigate('/dashboard') : navigate('/')
    },
    onError,
  })

  const { mutate: register, isPending: isRegisterPending } = useMutation({
    mutationFn: async (values) => await authServices.register(values),
    onSuccess: () => {
      message.success('Register successfully')
      navigate('/login')
    },
    onError,
  })

  const logout = () => {
    if (localStorage.getItem('token')) localStorage.removeItem('token')
    navigate('/login')
  }

  return {
    login,
    isLoginPending,
    register,
    isRegisterPending,
    logout,
  }
}

export default useAuth
