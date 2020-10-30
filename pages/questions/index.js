import React from 'react'
import Head from 'next/head'
import { Col, Row } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import { SEARCH_QUESTION } from '../../queries'
import usePagination from '../../hooks/usePagination'
import media from '../../libs/media'
import RightSide from '../../components/RightSide'
import withApollo from '../../libs/with-apollo'
import { TopicList, TopicsBar } from '../../components/Topics'
import MobileAuthBar from '../../components/MobileAuthBar'
import QuestionList from '../../components/QuestionList'
import QuestionListQuery from '../../queries/QuestionList.gql'

const StyledContainer = styled(Container)`
${media.lg`
margin-top: 24px;
`}
`

const Pagination = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

const StyledTopicsBar = styled(TopicsBar)`
padding: 0 16px;
${media.sm`
  padding: 0;
`}
`

export default withApollo(() => {
  const { query: { keyword } } = useRouter()
  const key = keyword ? 'searchQuestion' : 'getQuestions'
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/questions',
    query: keyword ? SEARCH_QUESTION : QuestionListQuery,
    getTotal: ({ data }) => get(data, `${key}.total`, 0)
  })
  const questions = get(data, `${key}.data`, [])
  return (
    <Page>
      <Head>
        <title>问题 - {process.env.NAME}</title>
        <meta key='description' name='description' content='产品推荐，帮您决策' />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col lg={0} xs={24}>
            <StyledTopicsBar href='/questions' checkable />
          </Col>
          <Col xl={4} lg={5} xs={0}>
            <TopicList href='/questions' />
          </Col>
          <Col
            xl={14} lg={18} md={16} xs={24}
          >
            <QuestionList list={questions} loading={loading} />
            <Pagination>
              {pagination}
            </Pagination>
          </Col>
          <Col lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
        <MobileAuthBar />
      </StyledContainer>
    </Page>
  )
})
