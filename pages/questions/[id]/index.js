import React from 'react'
import Head from 'next/head'
import { Affix, Col, Row, Spin, Tag } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import withApollo from '../../../libs/with-apollo'
import QuestionDetail from '../../../queries/QuestionDetail.gql'
import QuestionListWithoutOptions from '../../../queries/QuestionListWithoutOptions.gql'
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
  const { data: listData, loading: listLoading } = useQuery(QuestionListWithoutOptions, {
    variables: {
      size: 15
    }
  })
  const [modal, show] = useCreateOptionModal()
  const question = get(data, 'getQuestion', {})
  const options = question.options || []
  const list = get(listData, 'getQuestions.data', [])

  const renderOptions = () => {
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
  const getKeywords = () => {
    const questionTopics = question.topics || []
    const optionsTopics = flatten(options.map(x => {
      const productTopics = x.product.topics || []
      return productTopics.map(x => x.name)
    }))
    return uniq([
      ...questionTopics.map(x => x.name),
      ...optionsTopics
    ]).join(',')
  }
  const getDescription = () => {
    const products = options.map(x => x.product.name)
    if (!products.length) {
      return `快来帮帮我，问题「${question.name}」正在等你回答！`
    }
    return `为你推荐 ${options.length} 款「${question.name}」：${products.join('，')}，建议您选择「${products[0]}」。`
  }
  return (
    <Page>
      <Head>
        <title>{question.name} - {process.env.NAME}</title>
        <meta key='keywords' name='keywords' content={getKeywords()} />
        <meta key='description' name='description' content={getDescription()} />
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
                <Spin spinning={listLoading}>
                  <SmallTitle>热门问题</SmallTitle>
                  <QuestionList>
                    {list.map(x => (
                      <QuestionItem key={x.id}>
                        <Link href={`/questions/${x.id}`}>
                          <a>
                            {x.name}
                          </a>
                        </Link>
                        <Tag>{x.optionsCount ? `共 ${x.optionsCount} 项推荐` : '暂无推荐'}</Tag>
                      </QuestionItem>
                    ))}
                  </QuestionList>
                </Spin>
              </QuestionListBox>
            </Affix>
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
