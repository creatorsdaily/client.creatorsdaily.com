import { forwardRef } from 'react'
import { Form, Input, Select } from 'antd'
import noop from 'lodash/noop'
import Editor from './Editor.dynamic'

const { Item } = Form

export default forwardRef((props, ref) => {
  const {
    form, onSubmit = noop, topics,
    setPreview, loading,
    ...rest
  } = props
  const { getFieldDecorator } = form
  if (ref) {
    ref.current = { props }
  }
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, fieldsValue) => {
      if (err) return
      onSubmit(fieldsValue)
    })
  }
  const typeSelector = getFieldDecorator('type', {
    initialValue: 'FEATURE',
    rules: [{
      required: true,
      message: '必须选择「新愿」类型！'
    }]
  })(
    <Select style={{ width: 96 }}>
      <Select.Option value='FEATURE'>请求功能</Select.Option>
      <Select.Option value='BUG'>报告缺陷</Select.Option>
    </Select>
  )
  return (
    <Form {...rest} onSubmit={handleSubmit}>
      <Item>
        {getFieldDecorator('title', {
          rules: [{
            required: true,
            message: '必须输入「新愿」标题！',
            max: 32
          }]
        })(
          <Input addonBefore={typeSelector} placeholder='「新愿」标题' />
        )}
      </Item>
      <Item>
        {getFieldDecorator('content', {
          initialValue: '',
          rules: [{
            required: true,
            message: '必须输入「新愿」内容！'
          }]
        })(
          <Editor placeholder='请输入「新愿」内容' />
        )}
      </Item>
    </Form>
  )
})
