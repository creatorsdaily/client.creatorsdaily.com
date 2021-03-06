import Head from 'next/head'
import styled from 'styled-components'
import validate from 'uuid-validate'
import { Spin } from 'antd'
import Container from '../../../components/Container'
import Codes from '../../../components/ProductCodes.dynamic'
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
        <title>兑换码 · {product.name} - {process.env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <ProductInner loading={loading} product={product}>
        <Spin spinning={loading}>
          <Codes productId={id} product={product} />
        </Spin>
      </ProductInner>
    </StyledContainer>
  )
}

const CodesPage = () => {
  return (
    <Product>
      <Content />
    </Product>
  )
}

CodesPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(CodesPage)
