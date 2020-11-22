import { Form, Input } from 'antd'

const { Item } = Form

const CodeForm = (props) => {
  return (
    <Form {...props}>
      <Item
        name='codes'
        rules={[{
          required: true,
          message: '请输入兑换码'
        }]}
      >
        <Input.TextArea rows={10} placeholder='请输入兑换码，每行一个' />
      </Item>
    </Form>
  )
}
export default CodeForm
