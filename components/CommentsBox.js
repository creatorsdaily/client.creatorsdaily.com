import noop from 'lodash/noop'
import styled from 'styled-components'
import { Button, Empty, Spin } from 'antd'
import useCreateComment from '../hooks/useCreateComment'
import CommentCell from './CommentCell'
import Box from './Box'
import { Mini } from './Editor.dynamic'

const StyledEditor = styled(Mini)`
min-height: 32px;
`

const StyledBox = styled(Box)`
padding: 16px;
margin-bottom: 24px;
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

const StyledCommentCell = styled(CommentCell)`
margin-bottom: 10px;
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
      return {
        ...comment,
        children: comment.children.map(x => addComment(x, current))
      }
    }
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

const CommentsBox = ({
  loading,
  list,
  productId,
  milestoneId,
  wishId,
  product,
  query,
  hideInput = false,
  onFocus = noop,
  onBlur = noop,
  renderFooter = noop,
  renderHeader = noop,
  ...rest
}) => {
  productId = productId || (product && product.id)
  const [
    handleReply,
    { loading: createLoading },
    content,
    setContent
  ] = useCreateComment({
    productIds: productId ? [productId] : [],
    milestoneIds: milestoneId ? [milestoneId] : [],
    wishIds: wishId ? [wishId] : []
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
      <StyledCommentCell
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
      {!hideInput && (
        <CommentBox>
          <EditorBox>
            <StyledEditor value={content} type='mini' placeholder='输入你的评论...' onChange={setContent} onFocus={onFocus} onBlur={onBlur} />
          </EditorBox>
          <StyledButton loading={createLoading} type='primary' onClick={() => handleReply()}>来一发</StyledButton>
        </CommentBox>
      )}
      <Spin spinning={loading}>
        {renderList()}
      </Spin>
      {renderFooter()}
    </StyledBox>
  )
}
export default CommentsBox
