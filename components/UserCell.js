import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Badge } from 'antd'
import UserAvatar from './UserAvatar'

const Container = styled.div`
display: flex;
color: #333;
.lazyload-placeholder {
  width: 32px;
}
`

const StyledAvatar = styled(UserAvatar)`
width: 32px;
height: 32px;
img {
  width: 32px;
  height: 32px;
}
`

const Username = styled.div`
line-height: 32px;
font-size: 13px;
font-weight: bold;
margin-right: 0;
margin-left: 12px;
white-space: nowrap;
flex: 1;
overflow: hidden;
text-overflow:ellipsis;
`

const UserCell = ({ user, hideName = false, ...rest }) => {
  const nickname = user.nickname || ''
  const renderAvatar = () => {
    const avatar = (
      <LazyLoad height={32} throttle={200} once>
        <StyledAvatar user={user} />
      </LazyLoad>
    )
    if (nickname.indexOf('oOcAI')) {
      return avatar
    }
    return (
      <Badge count='每观'>
        {avatar}
      </Badge>
    )
  }
  return (
    <Container {...rest}>
      {renderAvatar()}
      {!hideName && (<Username>{nickname}</Username>)}
    </Container>
  )
}
export default UserCell
