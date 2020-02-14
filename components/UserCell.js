import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Badge } from 'antd'
import Avatar from './Avatar'

const Container = styled.div`
display: flex;
color: #333;
.lazyload-placeholder {
  width: 32px;
}
`

const StyledAvatar = styled(Avatar)`
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

export default ({ user, hideName = false, ...rest }) => {
  const nickname = user.nickname || ''
  return (
    <Container {...rest}>
      <Badge count={nickname.indexOf('oOcAI') === 0 ? '每观' : 0}>
        <LazyLoad height={32} throttle={200} once>
          <StyledAvatar user={user} />
        </LazyLoad>
      </Badge>
      {!hideName && (<Username>{nickname}</Username>)}
    </Container>
  )
}
