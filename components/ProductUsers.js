import styled from 'styled-components'
import { Divider } from 'antd'
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

const ProductUsers = ({ discoverer, creators = [], ...rest }) => {
  const renderCreators = () => {
    if (!creators.length) return null
    return (
      <List>
        <Divider orientation='left'>创造者们</Divider>
        {creators.map(x => (
          <StyledUserCell key={x.id} user={x} showDescription showFollow />
        ))}
      </List>
    )
  }
  const renderDiscoverer = () => {
    if (!discoverer || creators.some(x => x.id === discoverer.id)) return null
    return (
      <List>
        <Divider orientation='left'>发现者</Divider>
        <StyledUserCell user={discoverer} showDescription showFollow />
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
export default ProductUsers
