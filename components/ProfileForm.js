import { forwardRef } from 'react'
import { Button, Form, Input } from 'antd'
import noop from 'lodash/noop'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import pick from 'lodash/pick'
import formError from '../libs/form-error'
import ProductIcon from './ProductIcon'

const { Item } = Form

export const profileToForm = product => {
  const data = pick(omitBy(product, isUndefined), [
    'nickname', 'avatar', 'email', 'link', 'description'
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
  const handleAvatarError = error => {
    formError(form, error, 'avatar')
  }
  return (
    <Form {...rest} onSubmit={handleSubmit}>
      <Item label='昵称'>
        {getFieldDecorator('nickname', {
          rules: [{
            required: true,
            message: '必须输入昵称名！',
            max: 24
          }]
        })(
          <Input placeholder='输入您的昵称' />
        )}
      </Item>
      <Item label='电子邮件'>
        {getFieldDecorator('email', {
          rules: [{
            required: true,
            message: '电子邮件格式不正确！',
            type: 'email'
          }]
        })(
          <Input placeholder='输入你的电子邮件地址' />
        )}
      </Item>
      <Item label='头像'>
        {getFieldDecorator('avatar')(
          <ProductIcon onError={handleAvatarError} />
        )}
      </Item>
      <Item label='个人链接'>
        {getFieldDecorator('link', {
          rules: [{
            message: '链接格式不正确！',
            type: 'url'
          }]
        })(
          <Input placeholder='个人主页地址' />
        )}
      </Item>
      <Item label='一句话介绍'>
        {getFieldDecorator('description', {
          rules: [{
            max: 32,
            message: '个人介绍最长 32 个字符'
          }]
        })(
          <Input placeholder='一句话简单介绍一下自己' />
        )}
      </Item>
      <Item>
        <Button loading={loading} type='primary' block htmlType='submit'>确定</Button>
      </Item>
    </Form>
  )
})
