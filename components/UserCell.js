import styled from 'styled-components'
import Avatar from './Avatar'

const Container = styled.div`
  display: flex;
`

const CommentAvatar = styled(Avatar)`
margin-right: 12px;
`

const CommentUsername = styled.div`
line-height: 32px;
font-size: 13px;
font-weight: bold;
margin-right: 8px;
`

export default ({ user, ...rest }) => {
  return (
    <Container {...rest}>
      <CommentAvatar user={user} />
      <CommentUsername>{user.nickname}</CommentUsername>
    </Container>
  )
}
