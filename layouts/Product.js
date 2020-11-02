import React from 'react'
import { Button, Col, Menu, Row, Skeleton } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AppstoreOutlined, DeleteOutlined, EditOutlined, FlagOutlined, GiftOutlined, HeartOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import Page from '../layouts/Page'
import Container from '../components/Container'
import useCanEditProduct from '../hooks/useCanEditProduct'
import WeChatButton from '../components/WeChatButton'
import ProductHeader from '../components/ProductHeader'
import ProductLike from '../components/ProductLike'
import media from '../libs/media'
import ProductDetail from '../queries/ProductDetail.gql'
import MobileAuthBar from '../components/MobileAuthBar'

const ProductLikeContainer = styled.div`
margin: 24px 16px 0;
${media.sm`
  margin: 24px 0 0;
`}
${media.md`
  margin: 0;
`}
`

const Content = styled.div`
padding: 24px 0;
background: #FFF;
`

const MenuContainer = styled.div`
background: #FFF;
border-bottom: 1px solid #F0F0F0;
border-top: 1px solid #F0F0F0;
.ant-menu-item {
  padding: 0 10px;
  ${media.md`
    padding: 0 15px;
  `}
}
`

const StyledWeChatButton = styled(WeChatButton)`
  margin: 16px auto 0;
  display: block;
`

const SkeletonContainer = styled.div`
padding: 0 16px;
${media.sm`
  padding: 0;
`}
`

const StyledPage = styled(Page)`
${({ state }) => state === 'died' ? 'filter: grayscale(100%);' : ''}
`

const Product = ({ children }) => {
  const { pathname, query: { id } } = useRouter()
  const { loading, data } = useQuery(ProductDetail, { variables: { id } })
  const product = get(data, 'product', {})
  const creators = get(product, 'creators', [])
  const canEdit = useCanEditProduct(product)
  const keywords = (product.topics || []).map(x => x.name).join(',')
  const description = (product.description || '').slice(0, 120) + '...'
  const codes = product.codes || []
  const matched = ['/[id]', '/[id]/milestones', '/[id]/codes', '/[id]/wishes']
    .filter(href => href === '/[id]' ? pathname === '/[id]' : pathname.indexOf(href) === 0)
  const renderButton = () => {
    if (!canEdit) return null
    return (
      <Row gutter={8} style={{ marginBottom: 16 }}>
        <Col span={16}>
          <Link href='/[id]/editor' as={`/${id}/editor`}>
            <a>
              <Button block icon={<EditOutlined />}>编辑</Button>
            </a>
          </Link>
        </Col>
        <Col span={8}>
          <Button block type='danger' icon={<DeleteOutlined />} disabled>删除</Button>
        </Col>
      </Row>
    )
  }
  const renderWeChat = () => {
    if (!creators.length) {
      return (
        <StyledWeChatButton tooltip={`「${product.name}」暂无创造者，如果您是产品的创造者，请点击并联系微信认领`}>
          点击认领产品
        </StyledWeChatButton>
      )
    }
  }
  const renderProductHeader = () => {
    if (loading) {
      return (
        <SkeletonContainer>
          <Skeleton active paragraph={{ rows: 3 }} title={false} avatar={{ shape: 'square', size: 80 }} loading={loading} />
        </SkeletonContainer>
      )
    }
    return (<ProductHeader {...product} />)
  }
  const renderOGImage = () => {
    if (!product.icon || !product.icon.hash) return null
    return (
      <meta key='og-image' property='og:image' content={`${process.env.FILES}/${product.icon.hash}-300-300-contain`} />
    )
  }
  return (
    <StyledPage state={product.state}>
      <Head>
        <title>{product.name} - {process.env.NAME}</title>
        <meta key='description' name='description' content={description} />
        <meta key='keywords' name='keywords' content={keywords} />
        <meta key='og-title' property='og:title' content={product.name} />
        <meta key='og-url' property='og:url' content={`https://creatorsdaily.com/${id}`} />
        {renderOGImage()}
      </Head>
      <Content>
        <Container>
          <Row type='flex' gutter={24} align='middle'>
            {/* <Col xl={4} xs={0} /> */}
            <Col xxl={18} xl={17} lg={16} md={14} sm={24} xs={24}>
              {renderProductHeader()}
            </Col>
            <Col xxl={6} xl={7} lg={8} md={10} sm={24} xs={24}>
              <ProductLikeContainer>
                {renderButton()}
                <ProductLike id={id} likeCount={product.likeCount} isLike={product.isLike} loading={loading} />
                {renderWeChat()}
              </ProductLikeContainer>
            </Col>
          </Row>
        </Container>
      </Content>
      <MenuContainer>
        <Container>
          <Menu selectedKeys={matched} mode='horizontal'>
            <Menu.Item key='/[id]'>
              <Link href='/[id]' as={`/${id}`}>
                <a>
                  <AppstoreOutlined />
                  详情
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key='/[id]/milestones'>
              <Link href='/[id]/milestones' as={`/${id}/milestones`}>
                <a>
                  <FlagOutlined />
                  里程碑
                </a>
              </Link>
            </Menu.Item>
            {(!!codes.length || canEdit) && (
              <Menu.Item key='/[id]/codes'>
                <Link href='/[id]/codes' as={`/${id}/codes`}>
                  <a>
                    <GiftOutlined />
                    兑换码
                  </a>
                </Link>
              </Menu.Item>)}
            <Menu.Item key='/[id]/wishes'>
              <Link href='/[id]/wishes' as={`/${id}/wishes`}>
                <a>
                  <HeartOutlined />
                  新愿
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Container>
      </MenuContainer>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { id, product, loading })
      })}
      <MobileAuthBar />
    </StyledPage>
  )
}
export default Product
