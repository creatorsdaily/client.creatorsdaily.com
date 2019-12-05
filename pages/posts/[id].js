import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import Head from 'next/head'
import styled from 'styled-components'
import { Fragment } from 'react'
import Link from 'next/link'
import { GET_POST } from '../../queries'
import Article from '../../layouts/Article'
import ProductCell from '../../components/ProductCell'
import SmallTitle from '../../components/SmallTitle'
import IPFSImage from '../../components/IPFSImage'
import withApollo from '../../libs/with-apollo'
import UserCell from '../../components/UserCell'
import Time from '../../components/Time'

const StyledProductCell = styled(ProductCell)`
margin-top: 10px;
`

const StyledSmallTitle = styled(SmallTitle)`
margin-top: 24px;
text-align: center;
`

const PostTitle = styled.h1`
line-height: 30px;
margin-top: 0 !important;
margin-bottom: 0 !important;
border-bottom: 0 !important;
text-align: left !important;
`

const PostMedia = styled(IPFSImage)`
width: 100%;
height: 260px;
object-fit: cover;
display: block;
`

const PostMeta = styled.div`
padding: 12px 0;
display: flex;
align-items: center;
// border-top: 1px solid #F0F0F0;
// border-bottom: 1px solid #F0F0F0;
.ant-avatar i {
  color: #FFF;
}
`

const PostTime = styled.div`
font-size: 12px;
`

export default withApollo(() => {
  const { query: { id } } = useRouter()
  const { loading, data } = useQuery(GET_POST, {
    variables: {
      id
    }
  })
  const post = get(data, 'getPost', {})
  const user = get(post, 'user', {})
  const product = get(data, 'getPost.products[0]', {})
  return (
    <Article
      header={(
        post.media ? <PostMedia hash={post.media && `${post.media.hash}-800-400`} /> : null
      )}
      footer={(
        <Fragment>
          <StyledSmallTitle>相关产品</StyledSmallTitle>
          <StyledProductCell {...product} />
        </Fragment>
      )}
    >
      <Head>
        <title>{post.title} - {process.env.NAME}</title>
        <meta key='description' name='description' content={post.description} />
      </Head>
      <Spin spinning={loading}>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <Link href='/users/[id]' as={`/users/${user.id}`}>
            <a>
              <UserCell user={user} />
            </a>
          </Link>
          <PostTime>
            在 <Time time={post.createdAt} /> 发布
          </PostTime>
        </PostMeta>
        <ReactMarkdown source={post.content} transformImageUri={(uri) => {
          if (uri.indexOf(process.env.FILES) !== 0) {
            return uri
          }
          return `${uri}-1000-1000-inside`
        }} />
      </Spin>
    </Article>
  )
})
