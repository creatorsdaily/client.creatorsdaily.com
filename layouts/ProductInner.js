import { Col, Row } from 'antd'
import PorductSider from '../components/ProductSider'
import ProductLeftSider from '../components/ProductLeftSider'

export default ({ product, loading, children }) => {
  return (
    <Row type='flex' gutter={24}>
      <Col
        xxl={{
          order: 2,
          span: 14
        }}
        xl={{
          order: 2,
          span: 13
        }} lg={16} md={14} sm={24} xs={24}
      >
        {children}
      </Col>
      <Col
        xxl={{
          order: 3,
          span: 6
        }} xl={{
          order: 3,
          span: 7
        }} lg={8} md={10} sm={24} xs={24}
      >
        <PorductSider loading={loading} {...product} />
      </Col>
      <Col
        xxl={{
          order: 1,
          span: 4
        }} xl={{
          order: 1,
          span: 4
        }} lg={0} md={0} sm={24} xs={24}
      >
        <ProductLeftSider loading={loading} likes={product.likes} />
      </Col>
    </Row>
  )
}
