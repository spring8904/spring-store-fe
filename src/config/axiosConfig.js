import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

instance.interceptors.response.use(
  (response) => {
    console.log(response.data)
    return response.data
  },
  (error) => {
    console.log(error.response.data)
    return Promise.reject(error.response.data)
  },
)

export default instance
