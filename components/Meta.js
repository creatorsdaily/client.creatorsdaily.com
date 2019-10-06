import styled from 'styled-components'
import Link from 'next/link'
import { Divider } from 'antd'
import Time from './Time'

const Meta = styled.div`
  font-size: 12px;
  color: #808080;
  padding: 12px 16px;
  margin-top: 16px;
  // border-top: 1px solid #F5F5F5;
`

export default ({ user = {}, createdAt, ...rest }) => {
  return (
    <Meta {...rest}>
      <Link href='/users/[id]' as={`/users/${user.id}`}>
        <a>{user.nickname}</a>
      </Link>
      <Divider type='vertical' />
      <Time time={createdAt} />
    </Meta>
  )
}
