import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response.data),
)

export default instance
