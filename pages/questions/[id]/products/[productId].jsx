import React from 'react'
import { Button, Col, Row, Spin } from 'antd'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Page from '../../../../layouts/Page'
import Container from '../../../../components/Container'
import useCreateOptionModal from '../../../../hooks/useCreateOptionModal'
import QuestionBox from '../../../../components/QuestionBox'
import OptionBox from '../../../../components/OptionBox'
import { GET_QUESTION } from '../../../../queries'
import withApollo from '../../../../libs/with-apollo'
import LeftSide from '../../../../components/LeftSide'
import RightSide from '../../../../components/RightSide'

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const MoreButton = styled(Button)`
margin: 0 auto 24px;
display: block;
`

export default withApollo(() => {
  const { query: { id, productId } } = useRouter()
  const [modal, show] = useCreateOptionModal({ question: id })
  const { loading, data } = useQuery(GET_QUESTION, {
    variables: { id }
  })
  const question = get(data, 'getQuestion')
  const currentOption = question && question.options.find(x => x.product.id === productId)
  const renderQuestion = question => {
    if (!question) return null
    return (
      <>
        <QuestionBox {...question} onRecommend={() => show({ question: question.id })} />
        <OptionBox
          {...currentOption} mode='full' onClick={(qid, pid, v) => show({
            question: qid,
            product: pid,
            positive: v,
            fixed: true
          })}
        />
        <Link href='/questions/[id]' as={`/questions/${question.id}`}>
          <a>
            <MoreButton type='dashed'>
              <LeftOutlined />
              查看问题全部选项
              <RightOutlined />
            </MoreButton>
          </a>
        </Link>
      </>
    )
  }

  const products = question ? question.options.map(x => x.product.name) : []
  const topics = question ? question.topics.map(x => x.name) : []
  const title = question ? `${currentOption.product.name} · ${question.name}` : '未找到问题'
  const description = question ? `在问题${question.name}下的推荐有：${products.join('、')}，其中${currentOption.product.name}排名第${currentOption.rank}` : title
  const keywords = question ? [
    ...products,
    ...topics
  ].join(',') : ''

  return (
    <Page>
      <Head>
        <title>{title} - {process.env.NAME}</title>
        <meta key='description' name='description' content={description} />
        <meta key='keywords' name='keywords' content={keywords} />
      </Head>
      {modal}
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col
            xl={{
              order: 1,
              span: 14
            }} lg={18} md={16} xs={24}
          >
            <Spin spinning={loading}>
              {renderQuestion(question)}
            </Spin>
          </Col>
          <Col xl={4} md={0} xs={24}>
            <LeftSide />
          </Col>
          <Col xl={{ order: 2 }} lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
