import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Link from 'next/link'
import styled from 'styled-components'
import { GET_USER } from '../queries'
import media from '../libs/media'
import UserCell from './UserCell'

const Container = styled.div`
  margin: 0 16px 24px;
  ${media.sm`
    margin: 0 0 24px;
  `}
`

const StyledLink = styled.a`
  margin-bottom: 16px;
  display: block;
`

const UserCellContainer = ({ id }) => {
  const { data } = useQuery(GET_USER, {
    variables: { id },
    errorPolicy: 'ignore'
  })
  const user = get(data, 'user', {})
  return (
    <Link href='/users/[id]' as={`/users/${user.id}`} passHref>
      <StyledLink>
        <UserCell user={user} />
      </StyledLink>
    </Link>
  )
}

export default () => {
  const users = [
    '588c9fbf-adeb-4380-9d9c-f042b0059f58',
    'f8738659-6e1c-475f-8ca8-b91837d0549f'
  ]
  return (
    <Container>
      {users.map(x => (
        <UserCellContainer id={x} key={x} />
      ))}
    </Container>
  )
}
