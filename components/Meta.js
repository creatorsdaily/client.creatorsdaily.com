import styled from 'styled-components'
import { Divider } from 'antd'
import Time from './Time'
import UserCell from './UserCell'

const Meta = styled.div`
font-size: 12px;
color: #808080;
height: 32px;
`

export default ({ user = {}, createdAt, children, ...rest }) => {
  return (
    <Meta {...rest}>
      <UserCell user={user}>
        <Divider type='vertical' />
        <Time time={createdAt} /> {children}
      </UserCell>
    </Meta>
  )
}
