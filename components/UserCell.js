import { Avatar } from 'antd'
import styled from 'styled-components'

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
      <CommentAvatar shape='square' icon='user' />
      <CommentUsername>{user.nickname}</CommentUsername>
    </Container>
  )
}
