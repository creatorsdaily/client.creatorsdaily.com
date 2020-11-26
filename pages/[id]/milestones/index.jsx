import Head from 'next/head'
import styled from 'styled-components'
import validate from 'uuid-validate'
import { Spin } from 'antd'
import Container from '../../../components/Container'
import Milestones from '../../../components/Milestones'
import withApollo from '../../../libs/with-apollo'
import Product from '../../../layouts/Product'
import ProductInner from '../../../layouts/ProductInner'

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`

const MilestonesHeader = styled.h1`
margin-bottom: 24px;
border-bottom: 1px solid #F0F0F0;
padding-bottom: 24px;
`

const Content = ({ id, product, loading }) => {
  return (
    <StyledContainer>
      <Head>
        <title>里程碑 · {product.name} - {process.env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <ProductInner loading={loading} product={product}>
        <Spin spinning={loading}>
          <Milestones
            productId={id}
            product={product}
            renderHeader={() => (<MilestonesHeader>「{product.name}」的大事记</MilestonesHeader>)}
          />
        </Spin>
      </ProductInner>
    </StyledContainer>
  )
}

const MilestonesPage = () => {
  return (
    <Product>
      <Content />
    </Product>
  )
}

MilestonesPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(MilestonesPage)
