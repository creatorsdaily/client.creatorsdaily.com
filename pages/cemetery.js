import Head from 'next/head'
import styled from 'styled-components'
import { Col, Empty, Row, Spin } from 'antd'
import get from 'lodash/get'
import { Fragment } from 'react'
import Page from '../layouts/Page'
import Container from '../components/Container'
import withApollo from '../libs/with-apollo'
import usePagination from '../hooks/usePagination'
import { GET_PRODUCTS } from '../queries'
import ProductCell from '../components/ProductCell'
import media from '../libs/media'
import Time from '../components/Time'

const StyledPage = styled(Page)`
background-image: url(/cemetery.png);
background-size: auto 300px;
background-repeat: repeat-x;
background-color: #FFF;
+footer {
  background: #000;
  .ant-divider {
    background: #2F3135;
  }
}
`

const Inner = styled.div`
background: #000;
margin-top: 200px;
overflow: hidden;
.ant-pagination {
  .ant-pagination-item a, .ant-pagination-next a, .ant-pagination-prev a {
    color: #A0A0A0;
  }
  .ant-pagination-item-active {
    background: #2F3135;
  }
}
`

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`

const Title = styled.h1`
color: #FFF;
text-align: center;
font-size: 36px;
margin-bottom: 32px;
`

const Description = styled.p`
color: #FFF;
text-align: center;
padding: 0 24px;
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 16px;
background: #2F3135;
border-color: #101010;
div > div {
  h6, a {
    color: #A0A0A0;
  }
  a:hover {
    color: #C0C0C0;
  }
}
h3 {
  color: #C0C0C0;
}
.ant-btn {
  background: #2F3135;
  border-color: #101010;
}
.ant-btn-block {
  background: #2F3135;
  border-color: #101010;
  svg {
    color: #A0A0A0;
  }
}
img {
  filter: grayscale(100%);
}
&:hover {
  border-color: #4F5155;
  .ant-btn-block svg {
    color: #DE7B76;
  }
}
`

const Pagination = styled.div`
padding: 0 24px;
margin-bottom: 24px;
${media.sm`
  padding: 0;
`}
`

const DiedInfo = styled.div`
color: #C0C0C0;
padding: 0 24px;
margin-bottom: 32px;
p {
  margin-bottom: 8px;
  text-align: center;
  font-size: 12px;
}
`

export default withApollo(() => {
  const {
    result: {
      loading,
      data
    },
    pagination
  } = usePagination({
    path: '/cemetery',
    query: GET_PRODUCTS,
    options: {
      variables: {
        state: 'died'
      }
    },
    getTotal: ({ data }) => get(data, 'getProducts.total', 0)
  })

  const products = get(data, 'getProducts.data', [])

  const renderList = () => {
    if (products.length) {
      return products.map(product => (
        <Fragment key={product.id}>
          <StyledProductCell {...product} />
          <DiedInfo>
            <p>
              <Time time={product.diedAt} format='YYYY 年 M 月 D 日' /> 下葬
            </p>
            <p>{product.causeOfDeath || '死因不明'}</p>
          </DiedInfo>
        </Fragment>
      ))
    }
    return (
      <Empty description='暂无内容' image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }

  return (
    <StyledPage>
      <Head>
        <title>产品公墓 - {process.env.NAME}</title>
        <meta key='description' name='description' content='为了纪念那些已经无法使用的产品，建造此公墓。' />
      </Head>
      <Inner>
        <StyledContainer>
          <Title>产品公墓</Title>
          <Row type='flex' gutter={24} justify='center'>
            <Col xl={12} lg={14} md={18} sm={24}>
              <Description>
                注意，这里是<strong>产品公墓</strong>，并不是<strong>产品经理公墓</strong>，笑。
              </Description>
              <Description>
                也无需纠结到底是<strong>公墓</strong>还是<strong>乱葬岗</strong>了，只是因为每天都有新产品诞生，也都有老产品死去，我们只是将死去的、可能永远被人遗忘的产品列出来，留个纪念。
              </Description>
            </Col>
          </Row>
          <Row type='flex' gutter={24} justify='center' style={{ marginTop: 24 }}>
            <Col xl={14} lg={13} md={16} xs={24}>
              <Spin spinning={loading}>
                {renderList()}
              </Spin>
              <Pagination>
                {pagination}
              </Pagination>
            </Col>
          </Row>
        </StyledContainer>
      </Inner>
    </StyledPage>
  )
})
