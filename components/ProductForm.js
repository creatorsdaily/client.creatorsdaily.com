import { Fragment, forwardRef } from 'react'
import { Button, Checkbox, Form, Input, Radio } from 'antd'
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

export const productToForm = product => {
  const data = pick(omitBy(product, isUndefined), [
    'name', 'description', 'topics', 'medias', 'content', 'icon', 'links', 'isMiniProgram', 'miniProgramQRCode'
  ])
  if (data.icon) {
    data.icon = data.icon.id
  }
  if (data.miniProgramQRCode) {
    data.miniProgramQRCode = data.miniProgramQRCode.id
  }
  if (data.topics.length) {
    data.topics = data.topics.map(x => x.id)
  }
  if (data.medias.length) {
    data.medias = data.medias.map(x => x.id)
  }
  if (data.links) {
    data.links = data.links.filter(x => !!x)
  }
  return data
}

export const formToProduct = form => {
  const data = omitBy(form, isUndefined)
  if (data.icon) {
    data.icon = {
      id: data.icon
    }
  }
  if (data.miniProgramQRCode) {
    data.miniProgramQRCode = {
      id: data.miniProgramQRCode
    }
  }
  if (data.topics) {
    data.topics = data.topics.map(x => ({
      id: x
    }))
  }
  if (data.medias) {
    data.medias = data.medias.map(x => ({
      id: x
    }))
  }
  if (data.links) {
    data.links = data.links.filter(x => !!x)
  }
  return data
}

export default forwardRef((props, ref) => {
  const {
    form, showButton = false, renderFooter = noop, onSubmit = noop, step = 'all', topics,
    setPreview, product,
    ...rest
  } = props
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form
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
  const handleCreate = ({ id }) => {
    const topics = getFieldValue('topics') || []
    setFieldsValue({
      topics: [...topics, id]
    })
  }
  const handleIconError = error => {
    formError(form, error, 'icon')
  }
  const handleQRCodeError = error => {
    formError(form, error, 'miniProgramQRCode')
  }
  const renderQRCode = () => {
    const isMiniProgram = getFieldValue('isMiniProgram')
    return (
      <Item label='小程序码' colon={false} style={{ display: isMiniProgram ? 'block' : 'none' }}>
        {getFieldDecorator('miniProgramQRCode')(
          <ProductIcon onError={handleQRCodeError} />
        )}
      </Item>
    )
  }
  const renderStep1 = () => {
    if (step !== 1 && step !== 'all') return null
    return (
      <Fragment>
        <Item label='名称' colon={false}>
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '必须输入产品名！'
            }]
          })(
            <Input placeholder='输入要推荐的产品名称' />
          )}
        </Item>
        <Item label='链接地址' colon={false}>
          {getFieldDecorator('links', {
            rules: [{
              transform (v) {
                return v.filter(x => !!x)
              },
              validator (rule, value, callback) {
                if (!Array.isArray(value)) {
                  callback(new Error('链接地址必须为数组'))
                } else if (value.length && value.some(x => !/^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(x))) {
                  callback(new Error('地址格式不正确！'))
                } else {
                  callback()
                }
              }
            }]
          })(
            <Inputs placeholder='产品的访问链接' />
          )}
        </Item>
        <Item label='是否微信小程序？' colon={false}>
          {getFieldDecorator('isMiniProgram', {
            initialValue: false
          })(
            <Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          )}
        </Item>
        {renderQRCode()}
      </Fragment>
    )
  }
  const renderStep2 = () => {
    if (step !== 2 && step !== 'all') return null
    return (
      <Fragment>
        <Item label='图标' colon={false}>
          {getFieldDecorator('icon')(
            <ProductIcon onError={handleIconError} />
          )}
        </Item>
        <Item label='简介' colon={false}>
          {getFieldDecorator('description', {
            initialValue: ''
          })(
            <Input placeholder='一句话介绍' />
          )}
        </Item>
        <Item label='话题' colon={false}>
          {getFieldDecorator('topics', {
            rules: [{
              type: 'array',
              max: 5,
              message: '每个产品最多添加 5 个话题！'
            }]
          })(
            <TopicSelect onCreate={handleCreate} />
          )}
        </Item>
      </Fragment>
    )
  }
  const renderStep3 = () => {
    if (step !== 3 && step !== 'all') return null
    return (
      <Fragment>
        <Item label='产品图片' colon={false}>
          {getFieldDecorator('medias')(
            <ProductMedias height={160} />
          )}
        </Item>
        <Item label='产品详情' colon={false}>
          {getFieldDecorator('content', {
            initialValue: ''
          })(
            <Editor placeholder='详细介绍' />
          )}
        </Item>
        {step === 3 && (
          <Item label='创造者' colon={false}>
            {getFieldDecorator('isCreator', {
              initialValue: false,
              valuePropName: 'checked'
            })(
              <Checkbox>我是这个产品的创造者</Checkbox>
            )}
          </Item>
        )}
      </Fragment>
    )
  }
  return (
    <Form {...rest} onSubmit={handleSubmit} hideRequiredMark>
      {renderStep1()}
      {renderStep2()}
      {renderStep3()}
      {renderFooter()}
      {showButton && (
        <Item>
          <Button type='primary' block htmlType='submit'>确定</Button>
        </Item>
      )}
    </Form>
  )
})
