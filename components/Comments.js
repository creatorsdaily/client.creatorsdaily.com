import styled from 'styled-components'
import { Button, Empty, Spin, message } from 'antd'
import { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import formError from '../libs/form-error'
import { GET_COMMENTS } from '../queries'
import Box from './Box'
import { Mini } from './Editor'
import CommentCell from './CommentCell'

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

const CREATE_COMMENT = gql`
mutation($comment: IComment!) {
  createComment(comment: $comment) {
    id
    content
    createdAt
    parentId
    children {
      id
    }
    user {
      id
      nickname
      email
    }
  }
}
`

export default ({ productId, product }) => {
  const size = 10
  const [page, setPage] = useState(1)
  const [content, setContent] = useState('')
  const query = [GET_COMMENTS, {
    size,
    productId
  }]
  const [create, { loading: createLoading }] = useMutation(CREATE_COMMENT, {
    onCompleted: data => {
      message.success('提交成功')
      setContent('')
    },
    onError: error => {
      const errors = formError(null, error)
      message.error(errors[0].message)
    },
    update (cache, { data: { createComment } }) {
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
              ? [createComment].concat(getComments.data)
              : getComments.data.map(x => addComment(x, createComment))
          }
        }
      })
    }
  })
  const { data, loading, fetchMore } = useQuery(query[0], {
    variables: query[1],
    notifyOnNetworkStatusChange: true
  })
  const list = get(data, 'getComments.data', [])
  const total = get(data, 'getComments.total', 0)
  const handleReply = (replyId, reply) => {
    const comment = {
      productId,
      content
    }
    if (replyId) {
      comment.parentId = replyId
      comment.content = reply
    }
    create({
      variables: {
        comment
      }
    })
  }
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
        onReply={handleReply} />
    ))
  }
  const renderMore = () => {
    if (page * size >= total) return null
    return (
      <Button type='link' block loading={loading} onClick={handleFetchMore}>加载更多</Button>
    )
  }
  return (
    <StyledBox>
      <CommentBox>
        <EditorBox>
          <StyledEditor value={content} type='mini' placeholder='你觉着这个产品怎么样？' onChange={setContent} />
        </EditorBox>
        <StyledButton loading={createLoading} type='primary' onClick={() => handleReply()}>来一发</StyledButton>
      </CommentBox>
      <Spin spinning={loading}>
        {renderList()}
      </Spin>
      {renderMore()}
    </StyledBox>
  )
}
