import styled from 'styled-components'
import { Spin } from 'antd'
import get from 'lodash/get'
import validate from 'uuid-validate'
import Head from 'next/head';
import User from '../../../layouts/User'
import SmallTitle from '../../../components/SmallTitle'
import withApollo from '../../../libs/with-apollo'
import usePagination from '../../../hooks/usePagination'
import media from '../../../libs/media'
import { GET_POSTS } from '../../../queries'
import PostList from '../../../components/PostList'

const Container = styled.div`
padding: 10px 0 0;
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
      loading: postsLoading,
      data
    },
    pagination
  } = usePagination({
    path: '/users/[id]/posts',
    query: GET_POSTS,
    getTotal: ({ data }) => get(data, 'getPosts.total', 0),
    getLink: (path, queryString) => ({
      href: `${path}${queryString}`,
      as: `/users/${id}/posts${queryString}`
    }),
    getQuery: ({ id, ...rest }) => rest,
    options: {
      variables: {
        user: id
      }
    }
  })
  const posts = get(data, 'getPosts.data', [])
  return (
    <Spin spinning={loading}>
      <Head>
        <title>{user.nickname}发布的文章 - {process.env.NAME}</title>
      </Head>
      <Container>
        <SmallTitle>{user.nickname} 发布的文章</SmallTitle>
        <PostList list={posts} loading={postsLoading} />
        <Pagination>
          {pagination}
        </Pagination>
      </Container>
    </Spin>
  )
}

const UserPostsPage = () => {
  return (
    <User>
      <Content />
    </User>
  )
}

UserPostsPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(UserPostsPage)
