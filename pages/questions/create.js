import React, { useState } from 'react'
import styled from 'styled-components'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, Col, Form, Modal, Row } from 'antd'
import get from 'lodash/get'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import useAuth from '../../hooks/useAuth'
import withApollo from '../../libs/with-apollo'
import { formToQuestion } from '../../libs/form-utils'
import graphqlError from '../../libs/graphql-error'
import QuestionForm from '../../components/QuestionForm'
import Box from '../../components/Box'
import message from '../../libs/message.dynamic'
import SearchQuestion from '../../queries/SearchQuestion.gql'

const StyledBox = styled(Box)`
padding: 0 24px;
margin-bottom: 24px;
`

const StyledTitle = styled.h1`
text-align: center;
margin-top: 24px;
margin-bottom: 24px !important;
`

const StyledTypography = styled.div`
margin-bottom: 24px;
`

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`

const CREATE_QUESTION = gql`
mutation($question: IQuestion!) {
  createQuestion(question: $question) {
    id
    name
  }
}
`

const ModalContent = withApollo(({ list }) => {
  return (
    <div style={{ marginTop: 24 }}>
      {
        list.map(x => (
          <Link key={x.id} href={`/questions/${x.id}`}>
            <a>
              <Button type='link'>
                {x.name}
              </Button>
            </a>
          </Link>
        ))
      }
    </div>
  )
})

export default withApollo(() => {
  const [form] = Form.useForm()
  const [searchLoading, setSearchLoading] = useState(false)
  useAuth()
  const { replace } = useRouter()
  const {
    refetch
  } = useQuery(SearchQuestion, {
    skip: true
  })
  const [create, { loading }] = useMutation(CREATE_QUESTION, {
    onCompleted: data => {
      const id = get(data, 'createQuestion.id')
      message.success('提问成功')
      replace(`/questions/${id}`)
    },
    onError: error => {
      const errors = graphqlError(error)
      message.error(errors[0].message)
    }
  })
  const handleFinish = async values => {
    const runCreate = () => create({
      variables: {
        question: formToQuestion(values)
      }
    })
    // return runCreate()
    setSearchLoading(true)
    const { data } = await refetch({
      keyword: values.name,
      score: 10,
      size: 3
    })
    setSearchLoading(false)
    const list = get(data, 'searchQuestion.data', [])
    const total = get(data, 'searchQuestion.total', 0)
    if (total) {
      return Modal.confirm({
        getContainer: '#page-create',
        title: '搜索到已存在以下问题，是否继续提问？',
        okText: '继续提问',
        maskClosable: true,
        autoFocusButton: null,
        icon: null,
        content: (
          <RouterContext.Provider value={Router}>
            <ModalContent list={list} />
          </RouterContext.Provider>
        ),
        onOk () {
          runCreate()
        }
      })
    }
    runCreate()
  }
  return (
    <Page id='page-create'>
      <StyledContainer>
        <Row type='flex' gutter={24} justify='center'>
          <Col xxl={9} xl={10} lg={12} md={16} xs={24}>
            <StyledBox>
              <StyledTypography>
                <StyledTitle>发起问题</StyledTitle>
                <strong>请注意！</strong>这里不适合提问如 <strong style={{ textDecoration: 'line-through' }}>女生长得特别丑怎么办?</strong> 这类开放问题，仅支持您提问产品推荐相关问题，比如：
                <br /><br /><strong>最好的5G手机是什么？</strong><br /><br /><strong>好用的图片压缩工具有哪些？</strong>
              </StyledTypography>
              <QuestionForm
                form={form}
                onFinish={handleFinish}
                loading={loading || searchLoading}
              />
            </StyledBox>
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
