import styled from 'styled-components'
import { Divider } from 'antd'
import Link from 'next/link'
import UserCell from './UserCell'

const List = styled.div`
overflow: hidden;
`

const Users = styled.div`
margin-bottom: 24px;
`

const StyledUserCell = styled(UserCell)`
margin-bottom: 12px;
`

export default ({ discoverer, creators = [], ...rest }) => {
  const renderCreators = () => {
    if (!creators.length) return null
    return (
      <List>
        <Divider orientation='left'>创造者们</Divider>
        {creators.map(x => (
          <Link key={x.id} href='/users/[id]' as={`/users/${x.id}`}>
            <a>
              <StyledUserCell user={x} />
            </a>
          </Link>
        ))}
      </List>
    )
  }
  const renderDiscoverer = () => {
    if (!discoverer || creators.some(x => x.id === discoverer.id)) return null
    return (
      <List>
        <Divider orientation='left'>发现者</Divider>
        <Link href='/users/[id]' as={`/users/${discoverer.id}`}>
          <a>
            <StyledUserCell user={discoverer} />
          </a>
        </Link>
      </List>
    )
  }
  return (
    <Users {...rest}>
      {renderCreators()}
      {renderDiscoverer()}
    </Users>
  )
}
