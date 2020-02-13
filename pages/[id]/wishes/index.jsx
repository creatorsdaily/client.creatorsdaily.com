import Head from 'next/head'
import styled from 'styled-components'
import validate from 'uuid-validate'
import { Spin } from 'antd'
import Container from '../../../components/Container'
import Wishes from '../../../components/ProductWishes'
import withApollo from '../../../libs/with-apollo'
import Product from '../../../layouts/Product'
import ProductInner from '../../../layouts/ProductInner'

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`

const Content = ({ id, product, loading }) => {
  return (
    <StyledContainer>
      <Head>
        <title>新愿 · {product.name} - {process.env.NAME}</title>
      </Head>
      <ProductInner product={product}>
        <Spin spinning={loading}>
          <Wishes productId={id} product={product} />
        </Spin>
      </ProductInner>
    </StyledContainer>
  )
}

const WishesPage = () => {
  return (
    <Product>
      <Content />
    </Product>
  )
}

WishesPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(WishesPage)
