import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import Head from 'next/head'
import styled from 'styled-components'
import PostDetail from '../../queries/PostDetail.gql'
import Article from '../../layouts/Article'
import ProductCell from '../../components/ProductCell'
import SmallTitle from '../../components/SmallTitle'
import IPFSImage from '../../components/IPFSImage'
import withApollo from '../../libs/with-apollo'
import UserCell from '../../components/UserCell'
import Time from '../../components/Time'

const StyledProductCell = styled(ProductCell)`
margin-top: 10px;
margin-bottom: 24px;
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
margin-left: 8px;
font-size: 12px;
`

export default withApollo(() => {
  const { query: { id } } = useRouter()
  const { loading, data } = useQuery(PostDetail, {
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
        <>
          <StyledSmallTitle>相关产品</StyledSmallTitle>
          <StyledProductCell {...product} />
        </>
      )}
    >
      <Head>
        <title>{post.title} - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta key='description' name='description' content={post.description} />
        <meta key='og-title' property='og:title' content={post.name} />
        <meta key='og-url' property='og:url' content={`${process.env.NEXT_PUBLIC_INDEX}/posts/${id}`} />
      </Head>
      <Spin spinning={loading}>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <UserCell user={user} />
          <PostTime>
            在 <Time time={post.createdAt} /> 发布
          </PostTime>
        </PostMeta>
        <ReactMarkdown
          source={post.content} transformImageUri={(uri) => {
            if (uri.indexOf(process.env.NEXT_PUBLIC_FILES) !== 0) {
              return uri
            }
            return `${uri}-1000-1000-inside`
          }}
        />
      </Spin>
    </Article>
  )
})
