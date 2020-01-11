import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Link from 'next/link'
import styled from 'styled-components'
import { GET_USERS } from '../queries'
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

export default () => {
  const { data } = useQuery(GET_USERS, {
    variables: {
      ids: [
        '588c9fbf-adeb-4380-9d9c-f042b0059f58',
        'f8738659-6e1c-475f-8ca8-b91837d0549f',
        'd34c903c-c011-45b3-99b0-bfb8d0a58126',
        '5b2c2a78-c8c4-4414-bfe0-d4c322b6964d',
        '689b4be3-797a-478f-8977-1bf4f9065eb2'
      ]
    },
    errorPolicy: 'ignore'
  })
  const users = get(data, 'getUsers.data', [])
  return (
    <Container>
      {users.map(user => (
        <Link key={user.id} href='/users/[id]' as={`/users/${user.id}`} passHref>
          <StyledLink>
            <UserCell user={user} />
          </StyledLink>
        </Link>
      ))}
    </Container>
  )
}
