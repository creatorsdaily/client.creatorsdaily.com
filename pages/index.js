import React from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Page from '../layouts/Page'
import Container from '../components/Container'
import ProductCell from '../components/ProductCell'
import { GET_POSTS, GET_PRODUCTS, SEARCH_PRODUCTS } from '../queries'
import usePagination from '../hooks/usePagination'
import { TopicList, TopicsBar } from '../components/Topics'
import RightSide from '../components/RightSide'
import media from '../libs/media'
import PostCell from '../components/PostCell'
import SmallTitle from '../components/SmallTitle'
import MilestoneList from '../components/MilestoneList'
import withApollo from '../libs/with-apollo'
import MobileAuthBar from '../components/MobileAuthBar'

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

const StyledPostCell = styled(PostCell)`
margin-bottom: 12px;
`

const StyledTopicsBar = styled(TopicsBar)`
padding: 0 16px;
${media.sm`
  padding: 0;
`}
`

export default withApollo(() => {
  const { query: { topic, keyword, page } } = useRouter()
  const key = keyword ? 'searchProducts' : 'getProducts'
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/',
    query: keyword ? SEARCH_PRODUCTS : GET_PRODUCTS,
    getTotal: ({ data }) => get(data, `${key}.total`, 0)
  })

  const { data: postsData, loading: postsLoading } = useQuery(GET_POSTS, {
    variables: {
      size: 1
    },
    skip: (!!keyword || !!topic || !!Number(page))
  })

  const products = get(data, `${key}.data`, [])
  const posts = get(postsData, 'getPosts.data', [])
  const renderList = () => {
    if (products.length) {
      return products.map(product => (
        <StyledProductCell {...product} key={product.id} />
      ))
    }
    return (
      <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }
  const renderPosts = () => {
    if (!posts.length) {
      return (<div style={{ height: postsLoading ? 30 : 0 }} />)
    }
    return (
      <>
        {posts.map(post => (
          <StyledPostCell flag='每日精选' {...post} key={post.id} />
        ))}
      </>
    )
  }
  const renderMilestones = () => {
    if (!!keyword || !!topic || !!Number(page)) return null
    return (
      <>
        <SmallTitle>
          <Link href='/milestones'>
            <a>
            里程碑
            </a>
          </Link>
        </SmallTitle>
        <MilestoneList size={3} />
      </>
    )
  }
  const renderPostsTitle = () => {
    if (!!keyword || !!topic || !!Number(page)) return null
    return (<SmallTitle>产品展区</SmallTitle>)
  }
  if (process.env.CLOSE_TIP) {
    return process.env.CLOSE_TIP
  }
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
            <Spin spinning={postsLoading}>
              {renderPosts()}
            </Spin>
            {renderMilestones()}
            {renderPostsTitle()}
            <Spin spinning={loading}>
              {renderList()}
            </Spin>
            <Pagination>
              {pagination}
            </Pagination>
          </Col>
          <Col lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
        <MobileAuthBar />
      </StyledContainer>
    </Page>
  )
})
