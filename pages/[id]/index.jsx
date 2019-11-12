import React from 'react'
import { useRouter } from 'next/router'
import { Col, Row, Spin } from 'antd'
import styled from 'styled-components'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import Product from '../../components/Product'
import PorductSider from '../../components/ProductSider'
import Comments from '../../components/Comments'
import { GET_PRODUCT } from '../../queries'
import SmallTitle from '../../components/SmallTitle'
import withApollo from '../../libs/with-apollo'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`

export default withApollo(() => {
  const { query: { id } } = useRouter()
  const { loading, data } = useQuery(GET_PRODUCT, { variables: { id } })
  const product = get(data, 'product', {})
  const keywords = (product.topics || []).map(x => x.name).join(',')
  const description = (product.description || '').slice(0, 120) + '...'
  return (
    <Page>
      <Head>
        <title>{product.name} - {process.env.NAME}</title>
        <meta key='description' name='description' content={description} />
        <meta key='keywords' name='keywords' content={keywords} />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col xl={12} lg={15} md={14} sm={24} xs={24}>
            <Spin spinning={loading}>
              <Product {...product} full />
            </Spin>
          </Col>
          <Col xl={6} lg={9} md={10} sm={24} xs={24}>
            <PorductSider {...product} />
          </Col>
        </Row>
        <Row type='flex' gutter={24}>
          <Col xl={12} lg={15} md={14} sm={24} xs={24}>
            <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
            <Comments productId={id} product={product} />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
