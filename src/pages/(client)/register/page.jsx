import { Button, Checkbox, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { handleError } from '../../../utils'
const { Password } = Input
const { Item } = Form

const Register = () => {
  useEffect(() => {
    document.title = 'Register'
  }, [])

  const [form] = Form.useForm()
  const {
    registerMutation: { mutate, isPending },
  } = useAuth()
  const navigate = useNavigate()

  const onFinish = (values) =>
    mutate(values, {
      onSuccess: () => {
        navigate('/login')
        message.success('Register successfully')
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
              Create your Free Account
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
                    message: 'Password must be at least 6 characters',
                  },
                ]}
              >
                <Password />
              </Item>

              <Item name="remember" valuePropName="checked" noStyle>
                <Checkbox defaultChecked>
                  I accept the{' '}
                  <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Terms and Conditions
                  </span>
                </Checkbox>
              </Item>

              <Button block type="primary" htmlType="submit">
                Create an account
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Register
