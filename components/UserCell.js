import { Avatar } from 'antd'
import styled from 'styled-components'
import md5 from 'crypto-js/md5'

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
  let url = `https://www.gravatar.com/avatar/${user.email ? md5(user.email) : ''}`
  url = `${url}?size=${64 * 2}&d=robohash`
  return (
    <Container {...rest}>
      <CommentAvatar shape='square' icon='user' src={url} />
      <CommentUsername>{user.nickname}</CommentUsername>
    </Container>
  )
}
