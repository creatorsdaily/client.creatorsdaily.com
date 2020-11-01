import styled from 'styled-components'
import { Button, Tag } from 'antd'
import Link from 'next/link'
import { blue } from '../libs/colors'
import UserAvatar from './UserAvatar'
import Time from './Time'
import Box from './Box'
import SmallTitle from './SmallTitle'
import ProductCell from './ProductCell'
import FollowButton from './FollowButton'

const Container = styled(Box)`
display: flex;
color: rgba(0, 0, 0, 0.65);
padding: 12px;
margin-top: 48px;
margin-bottom: 24px;
`

const StyledUserAvatar = styled(UserAvatar)`
margin-top: -48px;
margin-right: 12px;
background: #FFF;
color: #E0E0E0;
`

const UserContent = styled.div`
margin-top: -48px;
display: flex;
flex-direction: column;
justify-content: space-between;
flex: 1;
overflow: hidden;
`

const UserTitle = styled.div`
height: 36px;
font-size: 14px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
margin-bottom: 12px;
b {
  font-size: 14px;
}
`

const UserName = styled.b`
color: #303030;
transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
font-size: 20px !important;
margin-right: 8px;
:hover {
  color: ${blue};
}
`

const UserJoin = styled.div`
font-size: 12px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
height: 24px;
line-height: 24px;
margin-bottom: 6px;
`

const UserActive = styled.div`
font-size: 12px;
height: 24px;
line-height: 24px;
margin-bottom: 6px;
.ant-tag {
  line-height: 18px;
}
`

const UserLink = styled.div`
font-size: 12px;
height: 24px;
line-height: 24px;
margin-bottom: 6px;
white-space: nowrap;
overflow: hidden;
text-overflow:ellipsis;
a {
  color: ${blue};
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
`

const StyledSmallTitle = styled(SmallTitle)`
padding: 0;
margin-bottom: 0;
`

const ProductList = styled.div`
margin-top: 4px;
`

const StyledProductCell = styled(ProductCell)`
display: flex;
flex: 1;
margin-bottom: 12px;
border: 1px solid #F0F0F0;
:last-child {
  margin-bottom: 0;
}
`
const StyledFollowButton = styled(FollowButton)`
float: right;
`
const CounterContainer = styled.div`
margin-bottom: 6px;
`
const CounterButton = styled.a`
font-size: 12px;
margin-right: 8px;
color: rgba(0,0,0,0.65);
span {
  font-weight: bold;
  margin-right: 4px;
}
`
const UserCard = ({ user, children, ...rest }) => {
  const renderActive = () => {
    if (Date.now() - new Date(user.signinedAt) < 3 * 60 * 1000) {
      return (
        <UserActive>
          <Tag color='#87d068'>在线</Tag>
        </UserActive>
      )
    }
    return (
      <UserActive>
        最近在 <Time time={user.signinedAt} /> 活跃
      </UserActive>
    )
  }

  const renderCreateds = ({ total, data = [] } = {}) => {
    if (!data.length) return null
    return (
      <ProductList>
        <StyledSmallTitle>他参与创造了 {total} 个产品</StyledSmallTitle>
        {data.map(x => (
          <StyledProductCell key={x.id} {...x} size='small' />
        ))}
      </ProductList>
    )
  }

  const renderFollow = () => {
    const { following, followers } = user
    if (!following || !followers) return null
    return (
      <CounterContainer>
        <Link href={`/users/${user.id}/followers`} passHref>
          <CounterButton>
            <span>{followers.total}</span>粉丝
          </CounterButton>
        </Link>
        <Link href={`/users/${user.id}/following`} passHref>
          <CounterButton>
            <span>{following.total}</span>关注
          </CounterButton>
        </Link>
      </CounterContainer>
    )
  }
  return (
    <Container {...rest}>
      <StyledUserAvatar user={user} size={72} />
      <UserContent>
        <UserTitle>
          <Link href='/users/[id]' as={`/users/${user.id}`}>
            <a>
              <UserName>{user.nickname}</UserName>
            </a>
          </Link>
          {user.description}
          <StyledFollowButton user={user} />
        </UserTitle>
        <UserJoin>
          第 <b>{user.number}</b> 位成员，<b><Time time={user.createdAt} format='YYYY年M月D日' /></b> 加入社区
        </UserJoin>
        {renderFollow()}
        {user.link && (
          <UserLink>
            个人链接：<a href={user.link} target='_blank' rel='noopener noreferrer'>{user.link}</a>
          </UserLink>
        )}
        {renderActive()}
        {renderCreateds(user.createdProducts)}
        {children}
      </UserContent>
    </Container>
  )
}
export default UserCard
