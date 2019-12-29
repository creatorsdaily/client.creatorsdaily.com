import { forwardRef } from 'react'
import { Form, Input } from 'antd'
import noop from 'lodash/noop'

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
  return (
    <Form {...rest} onSubmit={handleSubmit}>
      <Item>
        {getFieldDecorator('codes', {
          initialValue: '',
          rules: [{
            required: true,
            message: '请输入兑换码'
          }]
        })(
          <Input.TextArea rows={10} placeholder='请输入兑换码，每行一个' />
        )}
      </Item>
    </Form>
  )
})
