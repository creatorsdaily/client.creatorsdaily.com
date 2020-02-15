import styled from 'styled-components'
import Link from 'next/link'
import { Divider } from 'antd'
import Time from './Time'
import UserCell from './UserCell'

const Meta = styled.div`
font-size: 12px;
color: #808080;
padding: 16px;
line-height: 32px;
`

const UserCellContainer = styled.a`
display: block;
float: left;
`

export default ({ user = {}, createdAt, ...rest }) => {
  return (
    <Meta {...rest}>
      <Link href='/users/[id]' as={`/users/${user.id}`} passHref>
        <UserCellContainer>
          <UserCell user={user} />
        </UserCellContainer>
      </Link>
      <Divider type='vertical' />
      <Time time={createdAt} /> 提问
    </Meta>
  )
}
