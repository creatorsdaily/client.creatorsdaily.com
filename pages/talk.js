import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'
import { Affix, Button, Col, Row, Spin } from 'antd'
import get from 'lodash/get'
import Link from 'next/link'
import Page from '../layouts/Page'
import Container from '../components/Container'
import { GET_COMMENTS } from '../queries'
import { CommentsBox } from '../components/Comments'
import ProductCell from '../components/ProductCell'
import { ProductContainer } from '../components/Product'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const StyledProductCell = styled(ProductCell)`
border: 0px;
box-shadow: none;
:hover {
  border: 0px;
}
margin: -16px -16px 0;
`

export default () => {
  const size = 10
  const [hoverProduct, setHoverProduct] = useState()
  const query = [GET_COMMENTS, {
    size
  }]
  const [page, setPage] = useState(1)
  const { data, loading, fetchMore } = useQuery(query[0], {
    variables: query[1]
  })
  const list = get(data, 'getComments.data', [])
  const total = get(data, 'getComments.total', 0)
  const renderProduct = () => {
    if (!hoverProduct) return null
    return (
      <ProductContainer id={hoverProduct} full />
    )
  }
  const handleFetchMore = () => {
    fetchMore({
      variables: {
        page: page + 1
      },
      updateQuery (prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        setPage(page + 1)
        return {
          ...prev,
          getComments: {
            ...prev.getComments,
            data: [
              ...prev.getComments.data,
              ...fetchMoreResult.getComments.data
            ]
          }
        }
      }
    })
  }
  const renderMore = () => {
    if (page * size >= total) return null
    return (
      <Button type='link' block loading={loading} onClick={handleFetchMore}>加载更多</Button>
    )
  }
  return (
    <Page>
      <StyledContainer>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Spin spinning={loading}>
              { list.map(x => (
                <CommentsBox
                  onMouseEnter={() => setHoverProduct(x.product.id)}
                  onMouseLeave={() => setHoverProduct(null)}
                  list={[x]}
                  renderHeader={() => (
                    <StyledProductCell {...x.product} />
                  )}
                  renderFooter={() => (
                    <Link href='/[id]' as={`/${x.product.id}#comments`}>
                      <a>
                        <Button type='link' block>更多「{x.product.name}」的评论</Button>
                      </a>
                    </Link>
                  )}
                  query={query}
                  loading={loading}
                  product={x.product}
                  productId={x.product.id}
                />
              )) }
              {renderMore()}
            </Spin>
          </Col>
          <Col md={12} xs={0}>
            <Affix offsetTop={24}>
              {renderProduct()}
            </Affix>
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
