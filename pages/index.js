import React from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Page from '../layouts/Page'
import Home from '../layouts/Home'
import Container from '../components/Container'
import ProductCell from '../components/ProductCell'
import { SEARCH_PRODUCTS } from '../queries'
import ProductList from '../queries/ProductList.gql'
import usePagination from '../hooks/usePagination'
import { TopicList, TopicSelect, TopicsBar } from '../components/Topics'
import RightSide from '../components/RightSide'
import media from '../libs/media'
import withApollo from '../libs/with-apollo'
import MobileAuthBar from '../components/MobileAuthBar'
import useViewer from '../hooks/useViewer'

const StyledContainer = styled(Container)`
${media.lg`
margin-top: 24px;
`}
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 24px;
`

const Pagination = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

const StyledTopicsBar = styled(TopicsBar)`
padding: 0 16px;
${media.sm`
  padding: 0;
`}
`

export default withApollo(() => {
  const { query: { keyword } } = useRouter()
  const { viewer } = useViewer()
  const key = keyword ? 'searchProducts' : 'getProducts'
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/',
    query: keyword ? SEARCH_PRODUCTS : ProductList,
    getTotal: ({ data }) => get(data, `${key}.total`, 0)
  })

  const products = get(data, `${key}.data`, [])
  const renderList = () => {
    if (!products.length) {
      return (
        <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    return products.map(product => (
      <StyledProductCell {...product} key={product.id} />
    ))
  }
  if (process.env.CLOSE_TIP) {
    return process.env.CLOSE_TIP
  }
  const content = (
    <>
      <Spin spinning={loading}>
        {renderList()}
      </Spin>
      <Pagination>
        {pagination}
      </Pagination>
    </>
  )
  if (!viewer) {
    return (
      <Page>
        <StyledContainer>
          <Row type='flex' gutter={24}>
            <Col lg={0} xs={24}>
              <StyledTopicsBar href='/' checkable />
            </Col>
            <Col xl={4} lg={5} xs={0}>
              <TopicList href='/' />
            </Col>
            <Col xl={14} lg={13} md={16} xs={24}>
              {content}
            </Col>
            <Col lg={6} md={8} xs={24}>
              <RightSide />
            </Col>
          </Row>
          <MobileAuthBar />
        </StyledContainer>
      </Page>
    )
  }
  return (
    <Home>
      <Row type='flex' gutter={24}>
        <Col xl={17} lg={16} xs={24}>
          <Row style={{ marginBottom: 24 }}>
            <Col xl={6} lg={7} md={8}>
              <TopicSelect href='/' />
            </Col>
          </Row>
          {content}
        </Col>
        <Col xl={7} lg={8} sm={0} xs={0}>
          <RightSide />
        </Col>
      </Row>
    </Home>
  )
})
