import React from 'react'
import Head from 'next/head'
import { Col, Empty, Row, Spin } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import { GET_QUESTIONS } from '../../queries'
import usePagination from '../../hooks/usePagination'
import media from '../../libs/media'
import RightSide from '../../components/RightSide'
import withApollo from '../../libs/with-apollo'
import QuestionBox from '../../components/QuestionBox'
import useCreateOptionModal from '../../hooks/useCreateOptionModal'
import { TopicList, TopicsBar } from '../../components/Topics'

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
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/questions',
    query: GET_QUESTIONS,
    getTotal: ({ data }) => get(data, 'getQuestions.total', 0)
  })
  const [modal, show] = useCreateOptionModal()
  const questions = get(data, 'getQuestions.data', [])
  const renderList = () => {
    if (questions.length) {
      return questions.map(question => (
        <QuestionBox key={question.id} {...question} onRecommend={() => show({ question: question.id })} />
      ))
    }
    return (
      <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }
  return (
    <Page>
      <Head>
        <title>问题 - {process.env.NAME}</title>
        <meta key='description' name='description' content='产品推荐，帮您决策' />
      </Head>
      {modal}
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
            <Spin spinning={loading}>
              {renderList()}
            </Spin>
            <Pagination>
              {pagination}
            </Pagination>
          </Col>
          <Col lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
