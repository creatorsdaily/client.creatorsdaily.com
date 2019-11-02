import { forwardRef } from 'react'
import { Button, Form, Input } from 'antd'
import noop from 'lodash/noop'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import pick from 'lodash/pick'
import Editor from './Editor'

const { Item } = Form

export const profileToForm = product => {
  const data = pick(omitBy(product, isUndefined), [
    'nickname', 'avatar', 'email'
  ])
  if (data.avatar) {
    data.avatar = data.avatar.id
  }
  return data
}

export const formToProfile = form => {
  const data = omitBy(form, isUndefined)
  if (data.avatar) {
    data.avatar = {
      id: data.avatar
    }
  }
  return data
}

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
        {getFieldDecorator('title', {
          rules: [{
            required: true,
            message: '必须输入里程碑标题！',
            max: 24
          }]
        })(
          <Input placeholder='标题' />
        )}
      </Item>
      <Item>
        {getFieldDecorator('content', {
          initialValue: '',
          rules: [{
            required: true,
            message: '必须输入里程碑内容！'
          }]
        })(
          <Editor placeholder='里程碑内容' />
        )}
      </Item>
    </Form>
  )
})
