import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response.data || 'Something went wrong'),
)

export default api
