import { Form, Input } from 'antd'
import Editor from './Editor.dynamic'

const { Item } = Form

export default (props) => {
  return (
    <Form {...props}>
      <Item
        name='title'
        rules={[{
          required: true,
          message: '必须输入里程碑标题！',
          max: 24
        }]}
      >
        <Input placeholder='标题' />
      </Item>
      <Item
        name='content'
        rules={[{
          required: true,
          message: '必须输入里程碑内容！'
        }]}
      >
        <Editor placeholder='里程碑内容' />
      </Item>
    </Form>
  )
}
