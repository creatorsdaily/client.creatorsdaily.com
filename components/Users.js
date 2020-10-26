import styled from 'styled-components'
import Link from 'next/link'
import UserCell from './UserCell'

const StyledLink = styled.a`
margin-bottom: 16px;
display: block;
`

const Users = ({ list }) => {
  return list.map(user => (
    <Link key={user.id} href='/users/[id]' as={`/users/${user.id}`} passHref>
      <StyledLink>
        <UserCell user={user} />
      </StyledLink>
    </Link>
  ))
}
export default Users
