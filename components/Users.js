import styled from 'styled-components'
import UserCell from './UserCell'

const StyledUserCell = styled(UserCell)`
margin-bottom: 16px;
`

const Users = ({ list }) => {
  return list.map(user => (
    <StyledUserCell key={user.id} user={user} />
  ))
}
export default Users
