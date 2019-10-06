import React from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import { GET_POSTS } from '../../queries'
import usePagination from '../../hooks/usePagination'
import media from '../../libs/media'
import PostCell from '../../components/PostCell'

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

export default () => {
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/posts',
    query: GET_POSTS,
    getTotal: ({ data }) => get(data, 'getPosts.total', 0)
  })

  const posts = get(data, 'getPosts.data', [])
  const renderList = () => {
    if (posts.length) {
      return posts.map(post => (
        <PostCell {...post} key={post.id} />
      ))
    }
    return (
      <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }
  return (
    <Page>
      <StyledContainer>
        <Row type='flex' gutter={24} justify='center'>
          <Col xl={14} lg={16} md={22} sm={24} xs={24}>
            <Spin spinning={loading}>
              {renderList()}
            </Spin>
            <Pagination>
              {pagination}
            </Pagination>
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
