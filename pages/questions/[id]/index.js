import React from 'react'
import Head from 'next/head'
import { Affix, Col, Row, Spin, Tag } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import withApollo from '../../../libs/with-apollo'
import QuestionDetail from '../../../queries/QuestionDetail.gql'
import QuestionListQuery from '../../../queries/QuestionList.gql'
import useCreateOptionModal from '../../../hooks/useCreateOptionModal'
import OptionBoxV2 from '../../../components/OptionBox.v2'
import QuestionBox from '../../../components/QuestionBox'
import Box from '../../../components/Box'
import SmallTitle from '../../../components/SmallTitle'
import media from '../../../libs/media'

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const QuestionListBox = styled(Box)`
padding: 16px;
`

const QuestionList = styled.ul`
padding: 0;
`

const QuestionItem = styled.li`
display: flex;
justify-content: space-between;
margin-bottom: 8px;
a {
  margin-right: 8px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.ant-tag {
  ${media.md`
    display: none;
  `}
  ${media.lg`
    display: block;
  `}
}
`

export default withApollo(() => {
  const { query: { id } } = useRouter()
  const { data, loading } = useQuery(QuestionDetail, {
    variables: {
      id
    }
  })
  const { data: listData, loading: listLoading } = useQuery(QuestionListQuery, {
    variables: {
      size: 15
    }
  })
  const [modal, show] = useCreateOptionModal()
  const question = get(data, 'getQuestion', {})
  const list = get(listData, 'getQuestions.data', [])
  console.log(list)

  const renderOptions = () => {
    const options = question.options || []
    return options.map(option => (
      <OptionBoxV2
        key={option.product.id}
        option={option} onVote={(positive) => show({
          question: id,
          product: option.product.id,
          positive: positive,
          fixed: true
        })}
      />
    ))
  }
  return (
    <Page>
      <Head>
        <title>{question.name} - {process.env.NAME}</title>
        <meta key='description' name='description' content={question.name} />
      </Head>
      {modal}
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col
            xl={12} lg={14} md={16} xs={24}
          >
            <Spin spinning={loading}>
              <article>
                <QuestionBox
                  {...question} onRecommend={() => show({
                    question: id
                  })}
                />
                {renderOptions()}
              </article>
            </Spin>
          </Col>
          <Col
            xl={12} lg={10} md={8} xs={24}
          >
            <Affix offsetTop={24}>
              <QuestionListBox>
                <SmallTitle>热门问题</SmallTitle>
                <QuestionList>
                  {list.map(x => (
                    <QuestionItem key={x.id}>
                      <Link href={`/questions/${x.id}`}>
                        <a>
                          {x.name}
                        </a>
                      </Link>
                      <Tag>共 {x.options.length} 项推荐</Tag>
                    </QuestionItem>
                  ))}
                </QuestionList>
              </QuestionListBox>
            </Affix>
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
