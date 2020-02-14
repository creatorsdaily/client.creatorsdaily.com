import styled from 'styled-components'
import { Col, Empty, Row, Spin } from 'antd'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import { useState } from 'react'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import { GET_USER } from '../../queries'
import ProductCell from '../../components/ProductCell'
import SmallTitle from '../../components/SmallTitle'
import withApollo from '../../libs/with-apollo'
import MoreButton from '../../components/MoreButton'
import UserCard from '../../components/UserCard'
import RightSide from '../../components/RightSide'
import LeftSide from '../../components/LeftSide'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 24px;
`

export default withApollo(() => {
  const size = 15
  const [discoveredPage, setDiscoveredPage] = useState(1)
  const [likedPage, setLikedPage] = useState(1)
  const { query: { id } } = useRouter()
  const query = [GET_USER, {
    id,
    discoveredSize: size
  }]
  const { data, loading, fetchMore } = useQuery(query[0], {
    variables: query[1],
    notifyOnNetworkStatusChange: true
  })
  const user = get(data, 'user', {})
  const discoveredProducts = get(user, 'discoveredProducts.data', [])
  const discoveredTotal = get(user, 'discoveredProducts.total', 0)
  const likedProducts = get(user, 'likedProducts.data', [])
  const likedTotal = get(user, 'likedProducts.total', 0)
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
  const renderDiscovereds = () => {
    if (!discoveredProducts.length) return null
    return (
      <>
        <SmallTitle>{user.nickname} 发现的产品</SmallTitle>
        {renderList(discoveredProducts, 'small')}
        {renderMoreDiscovered()}
      </>
    )
  }
  const handleFetchMoreDiscovered = () => {
    fetchMore({
      variables: {
        discoveredPage: discoveredPage + 1
      },
      updateQuery (prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        setDiscoveredPage(discoveredPage + 1)
        return {
          ...prev,
          user: {
            ...prev.user,
            discoveredProducts: {
              ...prev.user.discoveredProducts,
              data: [
                ...prev.user.discoveredProducts.data,
                ...fetchMoreResult.user.discoveredProducts.data
              ]
            }
          }
        }
      }
    })
  }
  const renderMoreDiscovered = () => {
    if (discoveredPage * size >= discoveredTotal) return null
    return (
      <MoreButton size='small' type='link' block loading={loading} onClick={handleFetchMoreDiscovered}>加载更多</MoreButton>
    )
  }
  const handleFetchMoreLiked = () => {
    fetchMore({
      variables: {
        likedPage: likedPage + 1
      },
      updateQuery (prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        setLikedPage(likedPage + 1)
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
  const renderMoreLiked = () => {
    if (likedPage * size >= likedTotal) return null
    return (
      <MoreButton size='small' type='link' block loading={loading} onClick={handleFetchMoreLiked}>加载更多</MoreButton>
    )
  }
  return (
    <Page>
      <Head>
        <title>{user.nickname} - {process.env.NAME}</title>
        <meta key='description' name='description' content={`${process.env.NAME}第 ${user.number} 位成员`} />
      </Head>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col
            xl={{
              order: 1,
              span: 14
            }} lg={18} md={16} xs={24}
          >
            <Spin spinning={loading}>
              <UserCard user={user} />
            </Spin>
            <Spin spinning={loading}>
              {renderDiscovereds()}
              <SmallTitle>{user.nickname} 喜欢的产品</SmallTitle>
              {renderList(likedProducts, 'small')}
              {renderMoreLiked()}
            </Spin>
          </Col>
          <Col xl={4} md={0} xs={24}>
            <LeftSide />
          </Col>
          <Col xl={{ order: 2 }} lg={6} md={8} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
})
