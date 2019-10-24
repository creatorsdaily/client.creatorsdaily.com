import { Fragment, useEffect, useState } from 'react'
import { Alert, Col, Divider, Form, Row, Typography } from 'antd'
import styled from 'styled-components'
import ProductForm, { formToProduct } from '../components/ProductForm'
import ProductCell from '../components/ProductCell'
import Product from './Product'

const { Text } = Typography

const StyledAlert = styled(Alert)`
  margin-bottom: 18px;
`

const StyledProductCell = styled(ProductCell)`
  margin-bottom: 48px;
`

const ProductEditorForm = styled(Form.create({
  onValuesChange ({ setPreview, product }, changed) {
    setPreview({
      ...product,
      ...formToProduct(changed)
    })
  }
})(ProductForm))`
background: #FFF;
padding: 24px;
`

export default ({ step, product = {}, ...rest }) => {
  const [preview, setPreview] = useState(product)
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  }
  const renderStep2Preview = () => {
    if (step === 2) {
      return (
        <Fragment>
          <Divider orientation='left'>列表预览</Divider>
          <StyledAlert message={(
            <div>
              产品会在列表页面这样展示，请上传图标，填写简介，并选择合适的话题，使产品看上去 <Text mark>漂亮</Text> 且 <Text mark>专业</Text> 。
            </div>
          )} type='success' />
          <StyledProductCell {...preview} disabled />
        </Fragment>
      )
    }
    return null
  }
  const renderStep3Preview = () => {
    const product = (
      <Product {...preview} full />
    )
    if (step === 'all') {
      return product
    }
    if (step === 3) {
      return (
        <Fragment>
          <Divider orientation='left'>详情预览</Divider>
          <StyledAlert message={(
            <div>
            为用户上传产品的预览图片并详细介绍一下该产品，产品详情支持 <Text mark>Markdown</Text> 格式。
            </div>
          )} type='success' />
          {product}
        </Fragment>
      )
    }
    return null
  }
  return (
    <Row type='flex' gutter={24} justify='center'>
      <Col md={12} xs={24}>
        <ProductEditorForm {...rest} {...formItemLayout} step={step} product={preview} setPreview={setPreview} />
      </Col>
      <Col md={step === 1 ? 0 : 12} xs={step === 1 ? 0 : 24}>
        {renderStep2Preview()}
        {renderStep3Preview()}
      </Col>
    </Row>
  )
}
