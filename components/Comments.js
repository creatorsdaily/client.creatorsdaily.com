import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { GET_COMMENTS } from '../queries'
import MoreButton from './MoreButton'
import CommentsBox from './CommentsBox.dynamic'

export default ({ productId, milestoneId, wishId, ...rest }) => {
  const size = 10
  const [page, setPage] = useState(1)
  const query = [GET_COMMENTS, {
    size,
    productId,
    milestoneId,
    wishId
  }]

  const { data, loading, fetchMore } = useQuery(query[0], {
    variables: query[1],
    notifyOnNetworkStatusChange: true
  })
  const list = get(data, 'getComments.data', [])
  const total = get(data, 'getComments.total', 0)

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
          getComments: {
            ...prev.getComments,
            data: [
              ...prev.getComments.data,
              ...fetchMoreResult.getComments.data
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
    <CommentsBox
      list={list}
      query={query}
      loading={loading}
      renderFooter={renderMore}
      productId={productId}
      milestoneId={milestoneId}
      wishId={wishId}
      {...rest}
    />
  )
}
