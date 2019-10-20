import styled from 'styled-components'
import { Button, Tag, message } from 'antd'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import noop from 'lodash/noop'
import get from 'lodash/get'
import useToggle from 'react-use/lib/useToggle'
import Time from './Time'
import { Mini } from './Editor'
import UserCell from './UserCell'

const Comment = styled.div`
font-size: 13px;
margin-bottom: 24px;
position: relative;
${({ hasParent, hasChildren }) => (hasParent || !hasChildren) ? '' : `
  :before {
    content: '';
    width: 2px;
    background: #F0F0F0;
    position: absolute;
    top: 42px;
    bottom: 0;
    left: 15px;
  }
`}
`

const StyledTag = styled(Tag)`
height: 22px;
`

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
`

const CommentContent = styled.div`
margin-left: 44px;
margin-top: 10px;
`

const CommentButton = styled(Button)`
font-size: 12px;
margin-right: 20px;
padding: 0;
height: 20px;
font-weight: bold;
color: #6F6F6F;
`

const CommentMeta = styled.div`
display: flex;
line-height: 20px;
height: 20px;
font-weight: 300;
font-size: 12px;
margin-bottom: 12px;
`

const ReplyBox = styled.div`
display: flex;
align-items: flex-end;
margin-top: 12px;
margin-bottom: 12px;
`

const ReplyButton = styled(Button)`
font-size: 12px;
font-weight: bold;
`

const EditorBox = styled.div`
flex: 1;
margin-right: 16px;
`

const StyledEditor = styled(Mini)`
min-height: 32px;
`

const CommentCell = ({ product, comment, loading, onReply = noop }) => {
  const isCreator = get(product, 'creators', []).some(x => x.id === comment.user.id)
  const isDiscoverer = get(product, 'discovererId') === comment.user.id && !isCreator
  const [reply, setReply] = useState('')
  const [isReply, setIsReply] = useToggle(false)
  const handleClick = () => setIsReply(!isReply)
  const handleReply = async () => {
    try {
      await onReply(comment.id, reply)
      setReply('')
      setIsReply(false)
    } catch (err) {
      message.error(err.message)
    }
  }
  const renderReplyBox = comment => {
    if (!isReply) return null
    return (
      <ReplyBox>
        <EditorBox>
          <StyledEditor value={reply} type='mini' placeholder={`回复 ${comment.user.nickname}`} onChange={setReply} />
        </EditorBox>
        <ReplyButton loading={loading} type='primary' onClick={handleReply}>回复</ReplyButton>
      </ReplyBox>
    )
  }
  return (
    <Comment hasParent={!!comment.parentId} hasChildren={!!comment.children.length}>
      <CommentHeader id={`comments-${comment.id}`} name={`comments-${comment.id}`}>
        <UserCell user={comment.user} />
        {isDiscoverer && (<StyledTag color='gold'>发现者</StyledTag>)}
        {isCreator && (<StyledTag color='volcano'>创造者</StyledTag>)}
      </CommentHeader>
      <CommentContent>
        <ReactMarkdown key={comment.id} source={comment.content} />
        <CommentMeta>
          <CommentButton type='link' onClick={handleClick}>回复</CommentButton>
          <Time time={comment.createdAt} />
        </CommentMeta>
        {renderReplyBox(comment)}
        {comment.children.map(x => (
          <CommentCell key={x.id} product={product} comment={x} loading={loading} onReply={onReply} />
        ))}
      </CommentContent>
    </Comment>
  )
}

export default CommentCell
