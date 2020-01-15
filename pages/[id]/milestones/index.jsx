import Head from 'next/head'
import styled from 'styled-components'
import { Col, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import MilestoneList from '../../../components/MilestoneList'
import { GET_PRODUCT } from '../../../queries'
import ProductCell from '../../../components/ProductCell'
import withApollo from '../../../libs/with-apollo'
import RightSide from '../../../components/RightSide'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`

export default withApollo(() => {
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
          <Col lg={2} xs={0} />
          <Col lg={14} md={16} xs={24}>
            <Spin spinning={loading}>
              <ProductCell {...product} />
            </Spin>
            <MilestoneList productId={id} />
          </Col>
          <Col lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
