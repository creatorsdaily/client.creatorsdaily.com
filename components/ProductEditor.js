import { useState } from 'react'
import { Alert, Col, Divider, Form, Row, Typography } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ProductForm from '../components/ProductForm'
import ProductCell from '../components/ProductCell'
import useViewer from '../hooks/useViewer'
import { formToProduct, productToForm } from '../libs/form-utils'
import Product from './Product'
import Autofill from './Autofill'
import Box from './Box'

const CREATE_MEDIA = gql`
mutation($media: IMedia!) {
  createMedia(media: $media) {
    id,
    hash
  }
}
`

const { Text } = Typography

const StyledAlert = styled(Alert)`
  margin-bottom: 18px;
`

const StyledProductCell = styled(ProductCell)`
  margin-bottom: 48px;
`

const StyledBox = styled(Box)`
padding: 24px;
`

const ProductEditor = ({ step, product = {}, children, ...rest }) => {
  const [form] = Form.useForm()
  const [preview, setPreview] = useState(product)
  const { viewer: user } = useViewer()
  const [create] = useMutation(CREATE_MEDIA)
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  }
  const upload = async url => {
    const formData = new FormData()
    formData.append('urls', url)
    const { data } = await axios.post(process.env.UPLOAD, formData, {
      headers: {
        authorization: `Bearer ${user && user.token}`,
        'content-type': 'multipart/form-data'
      }
    })
    return data[0]
  }
  const renderStep2Preview = () => {
    if (step === 2) {
      return (
        <>
          <Divider orientation='left'>列表预览</Divider>
          <StyledAlert
            message={(
              <div>
                产品会在列表页面这样展示，请上传图标，填写简介，并选择合适的话题，使产品看上去 <Text mark>漂亮</Text> 且 <Text mark>专业</Text> 。
              </div>
            )} type='success'
          />
          <StyledProductCell {...preview} disabled />
        </>
      )
    }
    return null
  }
  const renderStep3Preview = () => {
    const product = (
      <Product {...preview} full withHeader />
    )
    if (step === 'all') {
      return product
    }
    if (step === 3) {
      return (
        <>
          <Divider orientation='left'>详情预览</Divider>
          <StyledAlert
            message={(
              <div>
                为用户上传产品的预览图片并详细介绍一下该产品，产品详情支持 <Text mark>Markdown</Text> 格式。
              </div>
            )} type='success'
          />
          {product}
        </>
      )
    }
    return null
  }
  const handleData = data => {
    if (data.title && !form.getFieldValue('name')) {
      form.setFieldsValue({
        name: data.title
      })
    }
    if (data.description && !form.getFieldValue('description')) {
      form.setFieldsValue({
        description: data.description
      })
    }
    if (data.content && !form.getFieldValue('content')) {
      form.setFieldsValue({
        content: data.content
      })
    }
  }
  const handleValuesChange = (changed, current) => {
    setPreview(formToProduct(current))
  }
  const handleSet = async (type, value) => {
    let file
    switch (type) {
      case 'name':
        return form.setFieldsValue({
          name: value
        })
      case 'icon':
        file = await upload(value)
        return new Promise((resolve) => {
          create({
            variables: {
              media: file
            },
            update (proxy, { data: { createMedia } }) {
              form.setFieldsValue({
                icon: createMedia.id
              })
              resolve()
            }
          })
        })
      case 'media':
        file = await upload(value)
        return new Promise((resolve, reject) => {
          const medias = form.getFieldValue('medias')
          if (medias.length >= 6) {
            return reject(new Error('请保留一张图片空位'))
          }
          create({
            variables: {
              media: file
            },
            update (proxy, { data: { createMedia } }) {
              form.setFieldsValue({
                medias: [
                  ...medias,
                  createMedia.id
                ]
              })
              resolve()
            }
          })
        })
      case 'description':
        return form.setFieldsValue({
          description: value
        })
      case 'content':
        return form.setFieldsValue({
          content: value
        })
    }
  }
  const renderAutofill = () => {
    if (step === 'all') return null
    return (<Autofill links={preview.links} step={step} onSet={handleSet} onData={handleData} />)
  }
  return (
    <>
      <Row type='flex' gutter={24} justify='center'>
        <Col md={12} xs={24}>
          <StyledBox>
            {children}
            <ProductForm
              {...rest}
              {...formItemLayout}
              form={form}
              step={step}
              initialValues={productToForm(product)}
              onValuesChange={handleValuesChange}
            />
          </StyledBox>
        </Col>
        <Col md={step === 1 ? 0 : 12} xs={step === 1 ? 0 : 24}>
          {renderStep2Preview()}
          {renderStep3Preview()}
        </Col>
      </Row>
      {renderAutofill()}
    </>
  )
}
export default ProductEditor
