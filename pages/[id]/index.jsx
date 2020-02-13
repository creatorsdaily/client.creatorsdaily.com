import React from 'react'
import { Spin } from 'antd'
import validate from 'uuid-validate'
import styled from 'styled-components'
import Product from '../../components/Product'
import ProductLayout from '../../layouts/Product'
import ProductInner from '../../layouts/ProductInner'
import Comments from '../../components/Comments'
import SmallTitle from '../../components/SmallTitle'
import withApollo from '../../libs/with-apollo'
import Container from '../../components/Container'

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const Content = ({ id, product, loading }) => {
  return (
    <StyledContainer>
      <ProductInner loading={loading} product={product}>
        <Spin spinning={loading}>
          <Product {...product} full />
        </Spin>
        <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
        <Comments productId={id} product={product} />
      </ProductInner>
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
