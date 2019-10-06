import styled from 'styled-components'
import { Button, Col, Row } from 'antd'
import Link from 'next/link'
import media from '../libs/media'
import ProductLinks from './ProductLinks'
import ProductLike from './ProductLike'
import ProductUsers from './ProductUsers'

const Container = styled.div`
padding: 0 16px;
${media.md`
  margin-top: 116px;
`}
${media.sm`
  padding: 0;
`}
`

export default ({ id, isDiscoverer, isCreator, isLike, likeCount, links = [], discoverer, creators = [] }) => {
  const renderButton = () => {
    if (isCreator || (isDiscoverer && !creators.length)) {
      return (
        <Row gutter={8} style={{ marginBottom: 24 }}>
          <Col span={16}>
            <Link href='/[id]/editor' as={`/${id}/editor`}>
              <a>
                <Button block icon='edit'>编辑</Button>
              </a>
            </Link>
          </Col>
          <Col span={8}>
            <Button block type='danger' icon='delete' disabled>删除</Button>
          </Col>
        </Row>
      )
    }
    return null
  }
  return (
    <Container>
      {renderButton()}
      <ProductLike id={id} likeCount={likeCount} isLike={isLike} />
      <ProductLinks links={links} />
      <ProductUsers discoverer={discoverer} creators={creators} />
    </Container>
  )
}
