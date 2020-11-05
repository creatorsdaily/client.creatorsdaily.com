import React, { useState } from 'react'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import { Col, Row } from 'antd'
import Home from '../../layouts/Home'
import withApollo from '../../libs/with-apollo'
import MobileAuthBar from '../../components/MobileAuthBar'
import ActiveListQuery from '../../queries/ActiveList.gql'
import ActiveList from '../../components/ActiveList'
import MoreButton from '../../components/MoreButton'
import HomeRightSide from '../../components/HomeRightSide'

export default withApollo(({ type = 'follow' }) => {
  const size = 30
  const [page, setPage] = useState(1)
  const { data, loading, fetchMore } = useQuery(ActiveListQuery, {
    variables: {
      timeline: type,
      size
    },
    notifyOnNetworkStatusChange: true
  })
  const list = get(data, 'getActives.data', [])
  const total = get(data, 'getActives.total', 0)
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
          getActives: {
            ...prev.getActives,
            data: [
              ...prev.getActives.data,
              ...fetchMoreResult.getActives.data
            ]
          }
        }
      }
    })
  }
  const renderMore = () => {
    if (page * size >= total) return null
    return (
      <MoreButton size='small' type='link' block loading={loading} onClick={handleFetchMore}>加载更多</MoreButton>
    )
  }
  return (
    <Home>
      <Row type='flex' gutter={24}>
        <Col xl={14} lg={15} xs={24}>
          <ActiveList list={list} loading={loading} />
          {renderMore()}
        </Col>
        <Col xl={10} lg={9} sm={0} xs={0}>
          <HomeRightSide />
        </Col>
      </Row>
    </Home>
  )
})
