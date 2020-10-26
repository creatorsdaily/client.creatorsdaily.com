import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import styled from 'styled-components'
import { GET_USERS } from '../queries'
import media from '../libs/media'
import Users from './Users'

const Container = styled.div`
  margin: 0 16px 24px;
  ${media.sm`
    margin: 0 0 24px;
  `}
`

const CoreUsers = () => {
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
      <Users list={users} />
    </Container>
  )
}

export default CoreUsers
