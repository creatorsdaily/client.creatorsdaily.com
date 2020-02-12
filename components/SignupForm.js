import { Button, Form, Input } from 'antd'
import LockOutlined from '@ant-design/icons/LockOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

const { Item } = Form

export default (props) => {
  const { loading, ...rest } = props
  return (
    <Form {...rest}>
      <Item
        name='username'
        rules={[{
          required: true, message: '请输入用户名'
        }]}
      >
        <Input
          placeholder='用户名'
          prefix={<UserOutlined />}
        />
      </Item>
      <Item
        name='password'
        rules={[{
          required: true, message: '请输入密码'
        }]}
      >
        <Input
          placeholder='密码'
          type='password'
          prefix={<LockOutlined />}
        />
      </Item>
      <Item>
        <Button loading={loading} type='primary' block htmlType='submit'>注册</Button>
      </Item>
    </Form>
  )
}
