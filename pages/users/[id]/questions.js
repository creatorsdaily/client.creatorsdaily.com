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
import { GET_QUESTIONS } from '../../../queries'
import QuestionList from '../../../components/QuestionList'

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
      loading: questionsLoading,
      data
    },
    pagination
  } = usePagination({
    path: '/users/[id]/questions',
    query: GET_QUESTIONS,
    getTotal: ({ data }) => get(data, 'getQuestions.total', 0),
    getLink: (path, queryString) => ({
      href: `${path}${queryString}`,
      as: `/users/${id}/questions${queryString}`
    }),
    getQuery: ({ id, ...rest }) => rest,
    options: {
      variables: {
        user: id
      }
    }
  })
  const questions = get(data, 'getQuestions.data', [])
  return (
    <Spin spinning={loading}>
      <Head>
        <title>{user.nickname}发起的问题 - {process.env.NAME}</title>
      </Head>
      <Container>
        <SmallTitle>{user.nickname} 发起的问题</SmallTitle>
        <QuestionList list={questions} loading={questionsLoading} />
        <Pagination>
          {pagination}
        </Pagination>
      </Container>
    </Spin>
  )
}

const UserQuestionsPage = () => {
  return (
    <User>
      <Content />
    </User>
  )
}

UserQuestionsPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(UserQuestionsPage)
