import React, { useState } from 'react'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import Timeline from '../../layouts/Timeline'
import withApollo from '../../libs/with-apollo'
import MobileAuthBar from '../../components/MobileAuthBar'
import ActiveListQuery from '../../queries/ActiveList.gql'
import ActiveList from '../../components/ActiveList'
import MoreButton from '../../components/MoreButton'

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
    <Timeline>
      <ActiveList list={list} loading={loading} />
      {renderMore()}
      <MobileAuthBar />
    </Timeline>
  )
})
