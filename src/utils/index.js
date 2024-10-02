import { message } from 'antd'

export const handleError = (error) => {
  error.message
    ? Array.isArray(error.message)
      ? error.message.map((err) => message.error(err))
      : message.error(error.message)
    : message.error('Something went wrong')
}
