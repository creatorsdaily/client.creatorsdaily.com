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

export default () => {
  const { data } = useQuery(GET_USERS, {
    variables: {
      size: 10
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
