import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import { Col, Row, Spin } from 'antd'
import Head from 'next/head'
import styled from 'styled-components'
import { GET_COMMENT } from '../../queries'
import withApollo from '../../libs/with-apollo'
import CommentCell from '../../components/CommentCell'
import useCreateComment from '../../hooks/useCreateComment'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import Box from '../../components/Box'
import ProductCell from '../../components/ProductCell'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const StyledBox = styled(Box)`
padding: 16px;
margin-bottom: 24px;
`

const StyledProductCell = styled(ProductCell)`
border: 0px;
box-shadow: none;
height: 60px;
margin-bottom: 16px;
:hover {
  border: 0px;
}
a {
  padding: 0;
}
`

const Buttons = styled.div`
border-bottom: 1px solid #F0F0F0;
margin-bottom: 16px;
`

export default withApollo(() => {
  const { query: { id } } = useRouter()
  const { loading, data } = useQuery(GET_COMMENT, {
    variables: {
      id
    }
  })
  const comment = get(data, 'getComment', {})
  const product = get(comment, 'products[0]', {})
  const [handleReply, { loading: createLoading }] = useCreateComment({}, {
    refetchQueries: () => [{
      query: GET_COMMENT,
      variables: { id }
    }]
  })

  const renderComment = () => {
    if (loading) {
      return (<Spin><div style={{ height: 60 }} /></Spin>)
    }
    return (
      <CommentCell
        product={product}
        loading={loading || createLoading}
        comment={comment}
        onReply={handleReply}
      />
    )
  }
  return (
    <Page>
      <Head>
        <title>回复 - {process.env.NAME}</title>
        <meta key='description' name='description' content={comment.content} />
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <StyledBox>
              <StyledProductCell size='small' {...product} />
              <Buttons />
              {renderComment()}
            </StyledBox>
          </Col>
          <Col md={12} xs={24} />
        </Row>
      </StyledContainer>
    </Page>
  )
})
