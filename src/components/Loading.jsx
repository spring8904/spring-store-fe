import { Spin } from 'antd'

const Loading = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spin size="large" />
    </div>
  )
}
export default Loading
