import React, { useState } from 'react'
import Head from 'next/head'
import { Col, Empty, Row, Spin, Typography } from 'antd'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import withApollo from '../../libs/with-apollo'
import { GET_USERS } from '../../queries'
import UserCard from '../../components/UserCard'
import RightSide from '../../components/RightSide'
import MoreButton from '../../components/MoreButton'
import media from '../../libs/media'
import LeftSide from '../../components/LeftSide'

const StyledMoreButton = styled(MoreButton)`
margin-bottom: 24px;
`

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const StyledUserCard = styled(UserCard)`
margin-bottom: 24px;
`

const Header = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

export default withApollo(() => {
  const size = 30
  const [page, setPage] = useState(1)
  const query = [GET_USERS, {
    size,
    isCreator: true
  }]
  const { data, loading, fetchMore } = useQuery(query[0], {
    variables: query[1],
    notifyOnNetworkStatusChange: true
  })
  const creators = get(data, 'getUsers.data', [])
  const total = get(data, 'getUsers.total', 0)
  const handleFetchMore = () => {
    fetchMore({
      variables: {
        page: page + 1
      },
      updateQuery (prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        setPage(page + 1)
        return {
          ...prev,
          getUsers: {
            ...prev.getUsers,
            data: [
              ...prev.getUsers.data,
              ...fetchMoreResult.getUsers.data
            ]
          }
        }
      }
    })
  }
  const renderMore = () => {
    if (page * size >= total) return null
    return (
      <StyledMoreButton size='small' type='link' block loading={loading} onClick={handleFetchMore}>加载更多</StyledMoreButton>
    )
  }
  const renderList = () => {
    if (!creators.length) {
      return (
        <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }
    return creators.map(x => (
      <div key={x.id} style={{ overflow: 'hidden' }}>
        <StyledUserCard user={x} />
      </div>
    ))
  }
  return (
    <Page>
      <Head>
        <title>创造者们 - {process.env.NAME}</title>
        <meta key='description' name='description' content='已经入驻日报的创造者们' />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col
            xl={{
              order: 1,
              span: 14
            }} lg={18} md={16} xs={24}
          >
            <Header>
              <Typography.Title level={4}>创造者们</Typography.Title>
                创造者们是创造者日报的灵魂，目前已入驻 <Typography.Text type='danger'>{total}</Typography.Text> 位创造者，你也是创造者？加入我们吧～
            </Header>
            <Spin spinning={loading}>
              {renderList()}
            </Spin>
            {renderMore()}
          </Col>
          <Col xl={4} md={0} xs={24}>
            <LeftSide />
          </Col>
          <Col xl={{ order: 2 }} lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
