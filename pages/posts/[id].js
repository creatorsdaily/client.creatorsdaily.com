import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import Head from 'next/head'
import styled from 'styled-components'
import { Fragment } from 'react'
import { GET_POST } from '../../queries'
import Article from '../../layouts/Article'
import ProductCell from '../../components/ProductCell'
import SmallTitle from '../../components/SmallTitle'
import IPFSImage from '../../components/IPFSImage'

const StyledProductCell = styled(ProductCell)`
margin-top: 10px;
`

const StyledSmallTitle = styled(SmallTitle)`
margin-top: 24px;
text-align: center;
`

const PostMedia = styled(IPFSImage)`
width: 100%;
max-width: 300px;
object-fit: cover;
box-shadow: 0 0 1px rgba(0,0,0,0.2);
margin: 0 auto 32px;
display: block;
`

export default () => {
  const { query: { id } } = useRouter()
  const { loading, data } = useQuery(GET_POST, {
    variables: {
      id
    }
  })
  const post = get(data, 'getPost', {})
  const product = get(data, 'getPost.products[0]', {})
  return (
    <Article footer={(
      <Fragment>
        <StyledSmallTitle>相关产品</StyledSmallTitle>
        <StyledProductCell {...product} />
      </Fragment>
    )}>
      <Head>
        <title>{post.title} | {process.env.NAME}</title>
        <meta key='description' name='description' content={post.description} />
      </Head>
      <Spin spinning={loading}>
        <h1>{post.title}</h1>
        <PostMedia hash={post.media && post.media.hash} />
        <ReactMarkdown source={post.content} />
      </Spin>
    </Article>
  )
}
