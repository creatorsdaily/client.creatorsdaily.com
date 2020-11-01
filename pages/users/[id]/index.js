import { Spin } from 'antd'
import validate from 'uuid-validate'
import styled from 'styled-components'
import get from 'lodash/get'
import Head from 'next/head'
import User from '../../../layouts/User'
import withApollo from '../../../libs/with-apollo'
import ActiveListQuery from '../../../queries/ActiveList.gql'
import usePagination from '../../../hooks/usePagination'
import media from '../../../libs/media'
import ActiveList from '../../../components/ActiveList'

const Container = styled.div`
padding-top: 24px;
`
const Pagination = styled.div`
padding: 0 24px;
${media.sm`
  padding: 0;
`}
`
const Content = ({ id, user, loading }) => {
  const {
    result: {
      loading: activesLoading,
      data
    },
    pagination
  } = usePagination({
    path: '/users/[id]',
    query: ActiveListQuery,
    getTotal: ({ data }) => get(data, 'getActives.total', 0),
    getLink: (path, queryString) => ({
      href: `${path}${queryString}`,
      as: `/users/${id}${queryString}`
    }),
    getQuery: ({ id, ...rest }) => rest,
    options: {
      variables: {
        user: id
      }
    }
  })
  const actives = get(data, 'getActives.data', [])
  return (
    <Spin spinning={loading}>
      <Head>
        <title>{user.nickname}的动态 - {process.env.NAME}</title>
      </Head>
      <Container>
        <ActiveList loading={activesLoading} list={actives} />
        <Pagination>
          {pagination}
        </Pagination>
      </Container>
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
