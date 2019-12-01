import styled from 'styled-components'
import { Tag } from 'antd'
import Link from 'next/link'
import Avatar from './Avatar'
import Time from './Time'
import Box from './Box'
import SmallTitle from './SmallTitle'
import ProductCell from './ProductCell'

const Container = styled(Box)`
display: flex;
color: rgba(0, 0, 0, 0.65);
padding: 12px;
`

const UserAvatar = styled(Avatar)`
margin-right: 12px;
`

const UserContent = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
flex: 1;
overflow: hidden;
`

const UserActive = styled.div`
font-size: 12px;
margin-top: 8px;
height: 20px;
line-height: 20px;
.ant-tag {
  line-height: 18px;
}
`

const UserName = styled.b`
color: #303030;
transition: color 0.3s;
font-size: 15px !important;
:hover {
  color: #DE7B76;
}
`

const UserJoin = styled.div`
font-size: 12px;
`

const UserTitle = styled.div`
height: 20px;
line-height: 20px;
font-size: 12px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
b {
  font-size: 14px;
}
`

const ProductList = styled.div`
margin-top: 16px;
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

export default ({ user, children, ...rest }) => {
  const renderActive = () => {
    if (Date.now() - new Date(user.signinedAt) < 3 * 60 * 1000) {
      return (<UserActive>
        <Tag color='#87d068'>在线</Tag>
      </UserActive>)
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
        <SmallTitle>他参与创造了 {total} 个产品</SmallTitle>
        {data.map(x => (
          <StyledProductCell key={x.id} {...x} size='small' />
        ))}
      </ProductList>
    )
  }
  return (
    <Container {...rest}>
      <UserAvatar user={user} size={72} />
      <UserContent>
        <UserTitle>
          <Link href='/users/[id]' as={`/users/${user.id}`}>
            <a>
              <UserName>{user.nickname}</UserName>
            </a>
          </Link> 是{process.env.NAME}第 <b>{user.number}</b> 位成员
        </UserTitle>
        <UserJoin>
          <b><Time time={user.createdAt} format='YYYY年M月D日' /></b> 加入社区
        </UserJoin>
        {renderActive()}
        {children || renderCreateds(user.createdProducts)}
      </UserContent>
    </Container>
  )
}
