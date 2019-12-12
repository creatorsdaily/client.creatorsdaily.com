import styled from 'styled-components'
import Avatar from './Avatar'

const Container = styled.div`
  display: flex;
  color: #333;
`

const CommentAvatar = styled(Avatar)`
`

const CommentUsername = styled.div`
line-height: 32px;
font-size: 13px;
font-weight: bold;
margin-right: 8px;
margin-left: 12px;
`

export default ({ user, hideName = false, ...rest }) => {
  return (
    <Container {...rest}>
      <CommentAvatar user={user} />
      {!hideName && (<CommentUsername>{user.nickname}</CommentUsername>)}
    </Container>
  )
}
