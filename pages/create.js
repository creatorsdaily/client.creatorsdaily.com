import React, { useRef } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, Col, Row, Typography, message } from 'antd'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import Page from '../layouts/Page'
import Container from '../components/Container'
import useAuth from '../hooks/useAuth'
import ProductEditor from '../components/ProductEditor'
import formError from '../libs/form-error'
import { formToProduct } from '../components/ProductForm'

const { Title, Paragraph, Text } = Typography

const StyledTitle = styled(Title)`
text-align: center;
margin-top: 24px;
margin-bottom: 24px !important;
`

const StyledTypography = styled(Typography)`
margin-bottom: 24px;
`

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`

const StyledButton = styled(Button)`
margin: 24px auto 0;
display: block;
`

const CREATE_PRODUCT = gql`
mutation($product: IProduct!) {
  createProduct(product: $product) {
    id
    name
  }
}
`

export default () => {
  const ref = useRef()
  useAuth()
  const { replace } = useRouter()
  const [create, { loading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: data => {
      const id = get(data, 'createProduct.id')
      const step = 2
      message.success('提交成功')
      replace({
        pathname: '/[id]/editor',
        query: {
          id,
          step
        }
      }, `/${id}/editor?step=${step}`)
    },
    onError: error => {
      const { form } = ref.current.props
      const errors = formError(form, error)
      message.error(errors[0].message)
    }
  })
  const handleSubmit = values => {
    create({
      variables: {
        product: formToProduct(values)
      }
    })
  }
  return (
    <Page>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col span={12} offset={6}>
            <StyledTypography>
              <StyledTitle level={4}>提交产品</StyledTitle>
              <Paragraph>
                这里是爱意满满的作品展示区，无论您是产品的 <Text strong>创造者</Text> ，还是产品的 <Text strong>发现者</Text> ，都可以在这里将它展示给全世界。
              </Paragraph>
            </StyledTypography>
          </Col>
        </Row>
        <ProductEditor step={1} onSubmit={handleSubmit} wrappedComponentRef={ref} renderFooter={() => (
          <StyledButton loading={loading} htmlType='submit' type='primary'>提交产品</StyledButton>
        )} />
      </StyledContainer>
    </Page>
  )
}
