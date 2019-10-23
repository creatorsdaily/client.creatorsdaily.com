import { Fragment, forwardRef } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import noop from 'lodash/noop'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import pick from 'lodash/pick'
import formError from '../libs/form-error'
import TopicSelect from './TopicSelect'
import Editor from './Editor'
import ProductIcon from './ProductIcon'
import ProductMedias from './ProductMedias'
import { Inputs } from './ProductLinks'

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
          <Input placeholder='输入您的电子邮件地址' />
        )}
      </Item>
      <Item label='头像'>
        {getFieldDecorator('avatar')(
          <ProductIcon onError={handleAvatarError} />
        )}
      </Item>
      <Item>
        <Button loading={loading} type='primary' block htmlType='submit'>确定</Button>
      </Item>
    </Form>
  )
})
