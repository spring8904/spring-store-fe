import { Button, Checkbox, Flex, Form, Input } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useAuthStore from '../../../store/authStore'
import { handleError } from '../../../utils'
const { Item } = Form
const { Password } = Input

const Login = () => {
  useEffect(() => {
    document.title = 'Login'
  }, [])

  const { setUser } = useAuthStore()

  const [form] = Form.useForm()
  const {
    loginMutation: { mutate, isPending },
  } = useAuth()
  const navigate = useNavigate()

  const onFinish = (values) =>
    mutate(values, {
      onSuccess: (res) => {
        const id = jwtDecode(res.token).id
        setUser({ ...res.user, id })
        localStorage.setItem('token', res.token)
        res.user?.role === 'admin' ? navigate('/dashboard') : navigate('/')
      },
      onError: handleError,
    })

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
              onFinish={onFinish}
              disabled={isPending}
              layout="vertical"
              requiredMark="optional"
            >
              <Item
                label="Your email:"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Email is required!',
                  },
                  {
                    type: 'email',
                    message: 'Email must be a valid email!',
                  },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Your password:"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Password is required!',
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters!',
                  },
                ]}
              >
                <Password />
              </Item>

              <Item>
                <Flex justify="space-between" align="center">
                  <Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Item>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </Flex>
              </Item>

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
