import styled from 'styled-components'
import { Divider } from 'antd'
import Time from './Time'
import UserCell from './UserCell'

const Container = styled.div`
font-size: 12px;
color: #808080;
height: 32px;
box-sizing: border-box;
`

const Meta = ({ user = {}, createdAt, children, ...rest }) => {
  return (
    <Container {...rest}>
      <UserCell user={user}>
        <Divider type='vertical' />
        <Time time={createdAt} /> {children}
      </UserCell>
    </Container>
  )
}

export default Meta
