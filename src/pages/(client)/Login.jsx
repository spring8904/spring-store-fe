import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Flex, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/auth'
import { useEffect } from 'react'

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => await login(values),
    onSuccess: (res) => {
      if (res.data?.token) localStorage.setItem('token', res.data.token)

      form.resetFields()
      message.success('Login successfully')

      if (res.data?.isAdmin) navigate('/dashboard')
      else navigate('/')
    },
    onError: (error) => {
      if (Array.isArray(error.response?.data?.message)) {
        error.response?.data?.message.map((err) => {
          message.error(err)
        })
        return
      }
      message.error(error.response?.data?.message)
    },
  })

  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 pt-8 pb-20 mx-auto">
        <Link to="/" className="flex items-center hover:text-black mb-6">
          <img className="block w-auto h-9 dark:hidden" src="/logo.png" />
          <span className="text-2xl font-medium ml-2">Spring Store</span>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <Form
              className="space-y-4 md:space-y-6"
              name="login"
              form={form}
              onFinish={mutate}
              disabled={isPending}
              layout="vertical"
              requiredMark="optional"
            >
              <Form.Item
                label="Your email:"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a validate email!',
                  },
                ]}
              >
                <Input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>

              <Form.Item
                label="Your password:"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters!',
                  },
                ]}
              >
                <Input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>

              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </Flex>
              </Form.Item>

              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login
