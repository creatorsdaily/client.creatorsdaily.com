import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import styled from 'styled-components'
import { Button, Divider, Spin, Tag, Tooltip } from 'antd'
import Link from 'next/link'
import validate from 'uuid-validate'
import { GET_WISH } from '../../../queries'
import Container from '../../../components/Container'
import ProductContent from '../../../components/ProductContent.dynamic'
import Comments from '../../../components/Comments'
import SmallTitle from '../../../components/SmallTitle'
import media from '../../../libs/media'
import Time from '../../../components/Time'
import UserCell from '../../../components/UserCell'
import withApollo from '../../../libs/with-apollo'
import WishLike from '../../../components/WishLike'
import { wishTypeColors, wishTypes } from '../../../libs/enums'
import Product from '../../../layouts/Product'
import ProductInner from '../../../layouts/ProductInner'

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
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

const Content = ({ id, product, loading }) => {
  const { query: { wishId } } = useRouter()
  const { data } = useQuery(GET_WISH, {
    variables: {
      id: wishId
    }
  })
  const wish = get(data, 'getWish', {})
  const user = get(wish, 'user', {})
  const description = (wish.content || '').slice(0, 120) + '...'
  return (
    <StyledContainer>
      <Head>
        <title>{wish.title} · {product.name} - {process.env.NAME}</title>
        <meta key='description' name='description' content={description} />
      </Head>
      <ProductInner loading={loading} product={product}>
        <Spin spinning={loading}>
          <WishHeader>
            <Tag color={wishTypeColors[wish.type]}>
              {wishTypes[wish.type]}
            </Tag>
            <div>
              <Divider type='vertical' />
            </div>
            <WishTitle>{wish.title}</WishTitle>
          </WishHeader>
          <WishMeta>
            <Link href='/users/[id]' as={`/users/${user.id}`}>
              <a>
                <UserCell user={user} />
              </a>
            </Link>
            <div>在 <strong><Time time={wish.createdAt} /></strong> 发布</div>
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
        </Spin>
      </ProductInner>
    </StyledContainer>
  )
}

const WishPage = () => {
  return (
    <Product>
      <Content />
    </Product>
  )
}

WishPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(WishPage)
