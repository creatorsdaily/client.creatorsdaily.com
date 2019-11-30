import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import styled from 'styled-components'
import { Button, Col, Divider, Row, Tag, Tooltip } from 'antd'
import Link from 'next/link'
import { GET_WISH } from '../../../queries'
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
import { wishTypeColors, wishTypes } from '../../../components/Wishes'
import WishLike from '../../../components/WishLike'

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 16px;
`

const WishHeader = styled.div`
  display: flex;
  margin: 0 16px 24px;
  align-items: center;
  ${media.sm`
    margin: 0 0 24px;
  `}
`

const WishMeta = styled.div`
margin: 0 16px 16px;
font-size: 13px;
line-height: 32px;
display: flex;
align-items: center;
position: relative;
${media.sm`
  margin: 0 0 16px;
`}
button {
  font-size: 13px;
}
`

const WishTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
`

const WishContent = styled(ProductContent)`
background: #FFF;
padding: 24px;
margin-bottom: 24px;
`

const WishLikeContainer = styled.div`
position: absolute;
bottom: -38px;
right: 24px;
z-index: 1;
`

export default withApollo(() => {
  const { query: { id, wishId } } = useRouter()
  const { data } = useQuery(GET_WISH, {
    variables: {
      id: wishId
    }
  })
  const wish = get(data, 'getWish', {})
  const product = get(wish, 'product', {})
  const user = get(wish, 'user', {})
  return (
    <Page>
      <Head>
        <title>{wish.title} - {product.name} - {process.env.NAME}</title>
        <meta key='description' name='description' content={wish.content} />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col md={12} xs={24}>
            <WishHeader>
              <Tag color={wishTypeColors[wish.type]}>
                {wishTypes[wish.type]}
              </Tag>
              <div>
                <Divider type='vertical' />
              </div>
              <WishTitle>{wish.title}</WishTitle>
            </WishHeader>
            <StyledProductCell {...product} size='small' />
            <WishMeta>
              <Link href='/users/[id]' as={`/users/${user.id}`}>
                <a>
                  <UserCell user={user} />
                </a>
              </Link>
              <div>在 <strong>
                <Time time={wish.createdAt} />
              </strong> 发布
              </div>
              <Link href='/[id]' as={`/${product.id}#wishes`}>
                <a>
                  <Button type='link'>全部</Button>
                </a>
              </Link>
              <WishLikeContainer>
                <Tooltip title='支持这个「新愿」' placement='left'>
                  <div>
                    <WishLike id={wish.id} isLike={wish.isLike} likeCount={wish.likeCount} />
                  </div>
                </Tooltip>
              </WishLikeContainer>
            </WishMeta>
            <WishContent content={wish.content} full />
            <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
            <Comments productId={id} wishId={wishId} product={product} />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
