import { Affix, Spin } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import UserList from '../queries/UserList.gql'
import UserCell from './UserCell'
import Box from './Box'
import SmallTitle from './SmallTitle'

const StyledBox = styled(Box)`
padding: 16px;
`

const StyledUserCell = styled(UserCell)`
margin-top: 16px;
`

const HomeRightSide = () => {
  const { data, loading } = useQuery(UserList, {
    variables: {
      size: 8,
      isCreator: true
    }
  })
  const users = get(data, 'getUsers.data', [])
  return (
    <Affix offsetTop={24}>
      <StyledBox>
        <SmallTitle>推荐用户</SmallTitle>
        <Spin spinning={loading}>
          {users.map(x => (
            <StyledUserCell key={x.id} user={x} showDescription showFollow />
          ))}
        </Spin>
      </StyledBox>
    </Affix>
  )
}

export default HomeRightSide
