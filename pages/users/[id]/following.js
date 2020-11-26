import React from 'react'
import Head from 'next/head'
import { Col, Empty, Row, Spin } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import Link from 'next/link'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import RightSide from '../../../components/RightSide'
import media from '../../../libs/media'
import withApollo from '../../../libs/with-apollo'
import Box from '../../../components/Box'
import UserFollowing from '../../../queries/UserFollowing.gql'
import usePagination from '../../../hooks/usePagination'
import UserCell from '../../../components/UserCell'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const LikeContent = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

const Content = styled(Box)`
padding: 24px;
display: flex;
align-items: center;
flex-direction: column;
margin-bottom: 24px;
.ant-spin-nested-loading {
  width: 100%;
}
`

export default withApollo(() => {
  const { query: { id } } = useRouter()
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/users/[id]/following',
    query: UserFollowing,
    getTotal: ({ data }) => get(data, 'user.following.total', 0),
    getLink: (path, queryString) => ({
      href: `${path}${queryString}`,
      as: `/users/${id}/following${queryString}`
    }),
    getQuery: ({ id, ...rest }) => rest,
    options: {
      variables: {
        id
      }
    }
  })
  const user = get(data, 'user', {})
  const list = get(user, 'following.data', [])
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty description='暂无关注' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    return (
      <Row gutter={[16, 16]}>
        {list.map(x => (
          <Col key={x.id} span={12}>
            <UserCell user={x} showDescription showFollow />
          </Col>
        ))}
      </Row>
    )
  }
  return (
    <Page>
      <Head>
        <title>关注 - {process.env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col lg={18} md={17} xs={24}>
            <LikeContent>
              <h1>关注</h1>
              <Link href={`/users/${user.id}`}><a>{user.nickname}</a></Link> 关注的用户
            </LikeContent>
            <Content>
              <Spin spinning={loading}>
                {renderList()}
              </Spin>
              {pagination}
            </Content>
          </Col>
          <Col lg={6} md={7} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
