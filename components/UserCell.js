import styled from 'styled-components'
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
overflow: hidden;
text-overflow:ellipsis;
`
const Description = styled.div`
font-size: 12px;
margin-left: 8px;
line-height: 32px;
white-space: nowrap;
overflow: hidden;
text-overflow:ellipsis;
`

const UserCell = ({ user, hideName = false, showDescription = false, ...rest }) => {
  const nickname = user.nickname || ''
  const description = user.description || ''
  const renderAvatar = () => {
    const avatar = (
      <StyledAvatar user={user} />
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
      {showDescription && <Description>{description}</Description>}
    </Container>
  )
}
export default UserCell
