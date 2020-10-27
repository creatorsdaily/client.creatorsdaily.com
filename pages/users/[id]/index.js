import { Spin } from 'antd'
import validate from 'uuid-validate'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import User from '../../../layouts/User'
import withApollo from '../../../libs/with-apollo'
import UserActiveList from '../../../queries/UserActiveList.gql'

const Tip = styled.h1`
text-align: center;
margin: 60px 0;
color: #CCC;
`

const Content = ({ loading }) => {
  const { query: { id } } = useRouter()
  useQuery(UserActiveList, {
    variables: {
      user: id
    }
  })
  return (
    <Spin spinning={loading}>
      <Tip>敬请期待</Tip>
    </Spin>
  )
}

const UserPage = () => {
  return (
    <User>
      <Content />
    </User>
  )
}

UserPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(UserPage)
