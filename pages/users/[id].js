import styled from 'styled-components'
import { Button, Col, Empty, Row, Spin } from 'antd'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import { useState } from 'react'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import { GET_USER } from '../../queries'
import Time from '../../components/Time'
import Avatar from '../../components/Avatar'
import media from '../../libs/media'
import ProductCell from '../../components/ProductCell'
import SmallTitle from '../../components/SmallTitle'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const UserContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 24px;
.ant-avatar {
  margin-right: 8px;
}
`

const UserBox = styled.div`
  margin: 0 16px 24px;
  ${media.sm`
    margin: 0 0 24px;
  `}
`

export default () => {
  const size = 15
  const [discoveredPage, setDiscoveredPage] = useState(1)
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
  const createdProducts = get(user, 'createdProducts.data', [])
  const discoveredProducts = get(user, 'discoveredProducts.data', [])
  const discoveredTotal = get(user, 'discoveredProducts.total', 0)
  const renderList = list => {
    if (list.length) {
      return list.map(product => (
        <ProductCell {...product} key={product.id} />
      ))
    }
    return (
      <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }
  const renderCreateds = () => {
    if (!createdProducts.length) return null
    return (
      <>
        <SmallTitle>{user.nickname} 创造的产品</SmallTitle>
        {renderList(createdProducts)}
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
        console.log(fetchMoreResult)
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
      <Button type='link' block loading={loading} onClick={handleFetchMoreDiscovered}>加载更多</Button>
    )
  }
  return (
    <Page>
      <Head>
        <title>{user.nickname} - {process.env.NAME}</title>
        <meta key='description' name='description' content={`${process.env.NAME}第 ${user.number} 位成员`} />
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Spin spinning={loading}>
              <UserBox>
                <UserContainer>
                  <Avatar user={user} />
                  <div>
                    <b>{user.nickname}</b> 是{process.env.NAME}第 <b>{user.number}</b> 位成员
                  </div>
                </UserContainer>
                <div>
                  <b><Time time={user.createdAt} format='YYYY年M月D日' /></b> 加入社区
                </div>
              </UserBox>
              {renderCreateds()}
              <SmallTitle>{user.nickname} 发现的产品</SmallTitle>
              {renderList(discoveredProducts)}
              {renderMoreDiscovered()}
            </Spin>
          </Col>
          <Col md={12} xs={0} />
        </Row>
      </StyledContainer>
    </Page>
  )
}
