import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import styled from 'styled-components'
import validate from 'uuid-validate'
import { Button, Divider, Spin } from 'antd'
import Link from 'next/link'
import { GET_MILESTONE } from '../../../queries'
import Container from '../../../components/Container'
import ProductContent from '../../../components/ProductContent.dynamic'
import Comments from '../../../components/Comments'
import SmallTitle from '../../../components/SmallTitle'
import media from '../../../libs/media'
import Time from '../../../components/Time'
import UserCell from '../../../components/UserCell'
import withApollo from '../../../libs/with-apollo'
import Product from '../../../layouts/Product'
import ProductInner from '../../../layouts/ProductInner'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
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

const Content = ({ id, product, loading: productLoading }) => {
  const { query: { milestoneId } } = useRouter()
  const { data, loading } = useQuery(GET_MILESTONE, {
    variables: {
      id: milestoneId
    }
  })
  const milestone = get(data, 'getMilestone', {})
  const user = get(milestone, 'user', {})
  const description = (milestone.content || '').slice(0, 120) + '...'
  return (
    <StyledContainer>
      <Head>
        <title>{milestone.title} · {product.name} - {process.env.NAME}</title>
        <meta key='description' name='description' content={description} />
      </Head>
      <ProductInner loading={loading} product={product}>
        <Spin spinning={loading}>
          <MilestoneHeader>
            <div>里程碑</div>
            <div>
              <Divider type='vertical' />
            </div>
            <MilestoneTitle>{milestone.title}</MilestoneTitle>
          </MilestoneHeader>
          <MilestoneMeta>
            <Link href='/users/[id]' as={`/users/${user.id}`}>
              <a>
                <UserCell user={user} />
              </a>
            </Link>
            <div>
              在
              <span> </span>
              <strong>
                <Time time={milestone.createdAt} />
              </strong>
              <span> </span>
              发布
            </div>
            <Link href='/[id]/milestones' as={`/${product.id}/milestones`}>
              <a>
                <Button type='link'>全部</Button>
              </a>
            </Link>
          </MilestoneMeta>
          <MilestoneContent content={milestone.content} full />
        </Spin>
        <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
        <Comments productId={id} milestoneId={milestoneId} product={product} />
      </ProductInner>
    </StyledContainer>
  )
}

const MilestonePage = () => {
  return (
    <Product>
      <Content />
    </Product>
  )
}

MilestonePage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(MilestonePage)
