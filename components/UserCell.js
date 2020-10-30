import styled from 'styled-components'
import { Badge } from 'antd'
import UserAvatar from './UserAvatar'
import Link from 'next/link'

const Container = styled.div`
display: flex;
.lazyload-placeholder {
  width: 32px;
}
`
const StyledAvatar = styled(UserAvatar)`
width: 32px;
height: 32px;
font-size: 0;
img {
  width: 32px;
  height: 32px;
}
`
const Content = styled.div`
flex: 1;
overflow: hidden;
white-space: nowrap;
text-overflow:ellipsis;
`
const StyledLink = styled.a`
color: #333;
width: 100%;
`
const Username = styled.span`
line-height: 32px;
font-size: 13px;
font-weight: bold;
margin-right: 0;
margin-left: 12px;
`
const Description = styled.span`
font-size: 12px;
margin-left: 8px;
line-height: 32px;
`

const UserCell = ({ user, hideName = false, link = true, showDescription = false, children, ...rest }) => {
  const nickname = user.nickname || ''
  const description = user.description || ''
  const renderAvatar = () => {
    let avatar = (
      <StyledAvatar user={user} />
    )
    if (nickname.indexOf('oOcAI') === 0) {
      avatar = (
        <Badge count='每观'>
          {avatar}
        </Badge>
      )
    }
    if (link) {
      avatar = (
        <Link href={`/users/${user.id}`}>
          <a>
            {avatar}
          </a>
        </Link>
      )
    }
    return avatar
  }
  const renderNickname = () => {
    if (hideName) return null
    const nicknameNode = (<Username>{nickname}</Username>)
    if (!link) {
      return nicknameNode
    }
    return (
      <Link href={`/users/${user.id}`} passHref>
        <StyledLink>
          {nicknameNode}
        </StyledLink>
      </Link>
    )
  }
  return (
    <Container {...rest}>
      {renderAvatar()}
      <Content>
        {renderNickname()}
        {showDescription && <Description>{description}</Description>}
        {children}
      </Content>
    </Container>
  )
}
export default UserCell
