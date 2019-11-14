import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import styled from 'styled-components'
import { Button, Col, Divider, Row } from 'antd'
import Link from 'next/link'
import { GET_MILESTONE } from '../../../queries'
import Page from '../../../layouts/Page'
import Container from '../../../components/Container'
import ProductCell from '../../../components/ProductCell'
import ProductContent from '../../../components/ProductContent'
import Comments from '../../../components/Comments'
import SmallTitle from '../../../components/SmallTitle'
import media from '../../../libs/media'
import Time from '../../../components/Time'
import UserCell from '../../../components/UserCell'
import withApollo from '../../../libs/with-apollo'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 16px;
`

const MilestoneHeader = styled.div`
  display: flex;
  margin: 0 16px 24px;
  align-items: center;
  ${media.sm`
    margin: 0 0 24px;
  `}
`

const MilestoneMeta = styled.div`
margin: 0 16px 16px;
font-size: 13px;
line-height: 32px;
display: flex;
align-items: center;
${media.sm`
  margin: 0 0 16px;
`}
button {
  font-size: 13px;
}
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

export default withApollo(() => {
  const { query: { id, milestoneId } } = useRouter()
  const { data } = useQuery(GET_MILESTONE, {
    variables: {
      id: milestoneId
    }
  })
  const milestone = get(data, 'getMilestone', {})
  const product = get(milestone, 'product', {})
  const user = get(milestone, 'user', {})
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
            <StyledProductCell {...product} size='small' />
            <MilestoneMeta>
              <Link href='/users/[id]' as={`/users/${user.id}`}>
                <a>
                  <UserCell user={user} />
                </a>
              </Link>
              <div>在 <strong>
                <Time time={milestone.createdAt} />
              </strong> 发布
              </div>
              <Link href='/[id]' as={`/${product.id}#milestones`}>
                <a>
                  <Button type='link'>全部</Button>
                </a>
              </Link>
            </MilestoneMeta>
            <MilestoneContent content={milestone.content} full />
            <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
            <Comments productId={id} milestoneId={milestoneId} product={product} />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
