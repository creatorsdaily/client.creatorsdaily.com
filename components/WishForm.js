import { Form, Input, Select } from 'antd'
import Editor from './Editor.dynamic'

const { Item } = Form

export default (props) => {
  return (
    <Form
      {...props}
      initialValues={{
        type: 'FEATURE',
        content: ''
      }}
    >
      <Item
        name='title'
        rules={[{
          required: true,
          message: '必须输入「新愿」标题！',
          max: 32
        }]}
      >
        <Input
          addonBefore={(
            <Item
              name='type' rules={[{
                required: true,
                message: '必须选择「新愿」类型！'
              }]} noStyle
            >
              <Select style={{ width: 98 }}>
                <Select.Option value='FEATURE'>请求功能</Select.Option>
                <Select.Option value='BUG'>报告缺陷</Select.Option>
              </Select>
            </Item>
          )} placeholder='「新愿」标题'
        />
      </Item>
      <Item
        name='content'
        rules={[{
          required: true,
          message: '必须输入「新愿」内容！'
        }]}
      >
        <Editor placeholder='请输入「新愿」内容' />
      </Item>
    </Form>
  )
}
