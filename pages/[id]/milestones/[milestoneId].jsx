import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import styled from 'styled-components'
import { Col, Divider, Row } from 'antd'
import { GET_MILESTONE } from '../../../queries'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import ProductCell from '../../../components/ProductCell'
import ProductContent from '../../../components/ProductContent'
import Comments from '../../../components/Comments'
import SmallTitle from '../../../components/SmallTitle'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`

const MilestoneHeader = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`

const MilestoneTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 0;
`

const MilestoneContent = styled(ProductContent)`
background: #FFF;
padding: 24px;
margin-bottom: 24px;
`

export default () => {
  const { query: { id, milestoneId } } = useRouter()
  const { data } = useQuery(GET_MILESTONE, {
    variables: {
      id: milestoneId
    }
  })
  const milestone = get(data, 'getMilestone', {})
  const product = get(milestone, 'product', {})
  return (
    <Page>
      <Head>
        <title>{milestone.title} - {product.name} - {process.env.NAME}</title>
        <meta key='description' name='description' content={milestone.content} />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col md={12} xs={24}>
            <MilestoneHeader>
              <div>里程碑</div>
              <div>
                <Divider type='vertical' />
              </div>
              <MilestoneTitle>{milestone.title}</MilestoneTitle>
            </MilestoneHeader>
            <ProductCell {...product} />
            <MilestoneContent content={milestone.content} full />
            <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
            <Comments productId={id} milestoneId={milestoneId} product={product} />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
