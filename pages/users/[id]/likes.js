import styled from 'styled-components'
import { Empty, Spin } from 'antd'
import get from 'lodash/get'
import { useState } from 'react'
import validate from 'uuid-validate'
import Head from 'next/head'
import User from '../../../layouts/User'
import ProductCell from '../../../components/ProductCell'
import SmallTitle from '../../../components/SmallTitle'
import withApollo from '../../../libs/with-apollo'
import MoreButton from '../../../components/MoreButton'
import Box from '../../../components/Box'

const StyledProductCell = styled(ProductCell)`
border: 1px solid #FFF;
background: #F5F5F5 !important;
margin-bottom: 24px;
`

const Container = styled.div`
padding: 10px 24px 24px;
border-top: 1px solid #F0F0F0;
`

const StyledBox = styled(Box)`
border: 0;
:hover {
  border: 0;
}
`

const Content = ({ id, user, loading, fetchMore }) => {
  const size = 15
  const [page, setPage] = useState(1)
  const products = get(user, 'likedProducts.data', [])
  const total = get(user, 'likedProducts.total', 0)
  const renderList = (list, size) => {
    if (list.length) {
      return list.map(product => (
        <StyledProductCell {...product} key={product.id} size={size} />
      ))
    }
    return (
      <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }
  const handleFetchMore = () => {
    fetchMore({
      variables: {
        likedPage: page + 1
      },
      updateQuery (prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        setPage(page + 1)
        return {
          ...prev,
          user: {
            ...prev.user,
            likedProducts: {
              ...prev.user.likedProducts,
              data: [
                ...prev.user.likedProducts.data,
                ...fetchMoreResult.user.likedProducts.data
              ]
            }
          }
        }
      }
    })
  }
  const renderMore = () => {
    if (page * size >= total) return null
    return (
      <MoreButton size='small' type='link' block loading={loading} onClick={handleFetchMore}>加载更多</MoreButton>
    )
  }
  return (
    <Spin spinning={loading}>
      <Head>
        <title>{user.nickname}喜欢的产品 - {process.env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <Container>
        <SmallTitle>{user.nickname} 喜欢的产品</SmallTitle>
        {renderList(products, 'small')}
        {renderMore()}
      </Container>
    </Spin>
  )
}

const UserLikesPage = () => {
  return (
    <User ContentContainer={StyledBox}>
      <Content />
    </User>
  )
}

UserLikesPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(UserLikesPage)
