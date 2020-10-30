import React from 'react'
import Head from 'next/head'
import { Affix, Button, Col, Row, Spin } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { PlusOutlined } from '@ant-design/icons'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import RightSide from '../../../components/RightSide'
import withApollo from '../../../libs/with-apollo'
import LeftSide from '../../../components/LeftSide'
import QuestionDetail from '../../../queries/QuestionDetail.gql'
import QuestionBox from '../../../components/QuestionBox'
import useCreateOptionModal from '../../../hooks/useCreateOptionModal'
import Box from '../../../components/Box'
import RecommendTooltip from '../../../components/RecommendTooltip'
import QuestionOptions from '../../../components/QuestionOptions'

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const StyledBox = styled(Box)`
margin-bottom: 24px;
`

const AffixFooter = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
`

export default withApollo(() => {
  const { query: { id } } = useRouter()
  const { data, loading } = useQuery(QuestionDetail, {
    variables: {
      id
    }
  })
  const [modal, show] = useCreateOptionModal()
  const question = get(data, 'getQuestion', {})
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
            xl={{
              order: 1,
              span: 14
            }} lg={18} md={16} xs={24}
          >
            <Spin spinning={loading}>
              <QuestionBox {...question} onRecommend={() => show({ question: id })} />
              <QuestionOptions
                options={question.options}
                onClick={(qid, pid, v) => show({
                  question: qid,
                  product: pid,
                  positive: v,
                  fixed: true
                })}
              />
              <StyledBox>
                <Affix offsetBottom={0}>
                  <AffixFooter>
                    <RecommendTooltip>
                      <Button
                        type='primary'
                        onClick={() => show({ question: id })}
                        icon={<PlusOutlined />}
                      >我要推荐
                      </Button>
                    </RecommendTooltip>
                  </AffixFooter>
                </Affix>
              </StyledBox>
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
