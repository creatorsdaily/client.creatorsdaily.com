import React from 'react'
import Head from 'next/head'
import { Button, Col, Row } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import { LinkOutlined } from '@ant-design/icons'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import PostListQuery from '../../queries/PostList.gql'
import usePagination from '../../hooks/usePagination'
import media from '../../libs/media'
import RightSide from '../../components/RightSide'
import withApollo from '../../libs/with-apollo'
import LeftSide from '../../components/LeftSide'
import MobileAuthBar from '../../components/MobileAuthBar'
import PostList from '../../components/PostList'

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const Pagination = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

const StyledFeed = styled.a`
  margin: 0 auto 24px;
  display: block;
  width: 160px;
`

export default withApollo(() => {
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/posts',
    query: PostListQuery,
    getTotal: ({ data }) => get(data, 'getPosts.total', 0)
  })

  const posts = get(data, 'getPosts.data', [])

  return (
    <Page>
      <Head>
        <title>日报 - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta key='description' name='description' content='每天发现一款有趣产品' />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col
            xl={{
              order: 1,
              span: 14
            }} lg={18} md={16} xs={24}
          >
            <PostList list={posts} loading={loading} />
            <StyledFeed href='/api/posts.atom' rel='noreferrer' target='_blank'>
              <Button icon={<LinkOutlined />} block>订阅日报</Button>
            </StyledFeed>
            <Pagination>
              {pagination}
            </Pagination>
          </Col>
          <Col xl={4} md={0} xs={24}>
            <LeftSide />
          </Col>
          <Col xl={{ order: 2 }} lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
        <MobileAuthBar />
      </StyledContainer>
    </Page>
  )
})
