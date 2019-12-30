import styled from 'styled-components'
import Avatar from './Avatar'

const Container = styled.div`
display: flex;
color: #333;
`

const CommentAvatar = styled(Avatar)`
width: 32px;
height: 32px;
img {
  width: 32px;
  height: 32px;
}
`

const CommentUsername = styled.div`
line-height: 32px;
font-size: 13px;
font-weight: bold;
margin-right: 8px;
margin-left: 12px;
white-space: nowrap;
flex: 1;
overflow: hidden;
text-overflow:ellipsis;
`

export default ({ user, hideName = false, ...rest }) => {
  return (
    <Container {...rest}>
      <CommentAvatar user={user} />
      {!hideName && (<CommentUsername>{user.nickname}</CommentUsername>)}
    </Container>
  )
}
