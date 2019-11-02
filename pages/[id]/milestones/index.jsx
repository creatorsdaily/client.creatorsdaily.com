import Head from 'next/head'
import styled from 'styled-components'
import { Col, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import Milestones from '../../../components/Milestones'
import { GET_PRODUCT } from '../../../queries'
import ProductCell from '../../../components/ProductCell'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`

export default () => {
  const { query: { id } } = useRouter()
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      id
    }
  })
  const product = get(data, 'product', {})
  return (
    <Page>
      <Head>
        <title>里程碑 - {product.name} - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col md={12} xs={24}>
            <Spin spinning={loading}>
              <ProductCell {...product} />
            </Spin>
            <Milestones productId={id} />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
