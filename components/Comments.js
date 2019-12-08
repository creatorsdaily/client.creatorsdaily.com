import styled from 'styled-components'
import { Button, Empty, Spin } from 'antd'
import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import noop from 'lodash/noop'
import { GET_COMMENTS } from '../queries'
import useCreateComment from '../hooks/useCreateComment'
import Box from './Box'
import { Mini } from './Editor'
import CommentCell from './CommentCell'
import MoreButton from './MoreButton'

const StyledEditor = styled(Mini)`
min-height: 32px;
`

const StyledBox = styled(Box)`
padding: 16px;
`

const EditorBox = styled.div`
flex: 1;
margin-right: 16px;
`

const CommentBox = styled.div`
display: flex;
align-items: flex-end;
border-bottom: 1px solid #F0F0F0;
padding-bottom: 16px;
margin-bottom: 16px;
`

const StyledButton = styled(Button)`
font-size: 14px;
font-weight: bold;
`

export const updateComments = (cache, { data: { createComment } }, query, product) => {
  const { getComments } = cache.readQuery({
    query: query[0],
    variables: query[1]
  })
  const addComment = (comment, current) => {
    if (current.parentId === comment.id) {
      return {
        ...comment,
        children: [
          ...comment.children,
          current
        ]
      }
    } else {
      comment.children = comment.children.map(x => addComment(x, current))
    }
    return comment
  }
  cache.writeQuery({
    query: query[0],
    variables: query[1],
    data: {
      getComments: {
        ...getComments,
        total: getComments.total + 1,
        data: !createComment.parentId
          ? [{
            product,
            ...createComment
          }].concat(getComments.data)
          : getComments.data.map(x => addComment(x, createComment))
      }
    }
  })
}

export const CommentsBox = ({
  loading,
  list,
  productId,
  milestoneId,
  wishId,
  product,
  query,
  onFocus = noop,
  onBlur = noop,
  renderFooter = noop,
  renderHeader = noop,
  ...rest
}) => {
  const [
    handleReply,
    { loading: createLoading },
    content,
    setContent
  ] = useCreateComment({
    productId,
    milestoneId,
    wishId
  }, {
    update (cache, data) {
      updateComments(cache, data, query, product)
    }
  })
  const renderList = () => {
    if (!list.length) {
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无评论' />
      )
    }
    return list.map(x => (
      <CommentCell
        product={product}
        loading={createLoading}
        key={x.id}
        comment={x}
        onReply={handleReply}
      />
    ))
  }
  return (
    <StyledBox {...rest}>
      {renderHeader()}
      <CommentBox>
        <EditorBox>
          <StyledEditor value={content} type='mini' placeholder='吐槽一下？' onChange={setContent} onFocus={onFocus} onBlur={onBlur} />
        </EditorBox>
        <StyledButton loading={createLoading} type='primary' onClick={() => handleReply()}>来一发</StyledButton>
      </CommentBox>
      <Spin spinning={loading}>
        {renderList()}
      </Spin>
      {renderFooter()}
    </StyledBox>
  )
}

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
