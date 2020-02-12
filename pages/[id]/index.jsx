import React from 'react'
import { Col, Row, Spin } from 'antd'
import validate from 'uuid-validate'
import styled from 'styled-components'
import Product from '../../components/Product'
import ProductLayout from '../../layouts/Product'
import Comments from '../../components/Comments'
import SmallTitle from '../../components/SmallTitle'
import withApollo from '../../libs/with-apollo'
import PorductSider from '../../components/ProductSider'
import Container from '../../components/Container'

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const Content = ({ id, product, loading }) => {
  return (
    <StyledContainer>
      <Row type='flex' gutter={24}>
        <Col xxl={18} xl={17} lg={16} md={14} sm={24} xs={24}>
          <Spin spinning={loading}>
            <Product {...product} full />
          </Spin>
          <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
          <Comments productId={id} product={product} />
        </Col>
        <Col xxl={6} xl={7} lg={8} md={10} sm={24} xs={24}>
          <PorductSider {...product} />
        </Col>
      </Row>
    </StyledContainer>
  )
}

const ProductPage = () => {
  return (
    <ProductLayout>
      <Content />
    </ProductLayout>
  )
}

ProductPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(ProductPage)
