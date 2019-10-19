import styled from 'styled-components'
import Link from 'next/link'
import { Col, Row } from 'antd'
import media from '../libs/media'
import Box from './Box'
import IPFSImage from './IPFSImage'
import ProductCell from './ProductCell'
import Time from './Time'

const Container = styled(Box)`
margin-bottom: 24px;
position: relative;
height: 324px;
padding: 16px;
${media.sm`
  height: 168px;
`}
`

const PostContent = styled.div`
`

const PostDescription = styled.div`
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
margin-bottom: 15px;
`

const StyledTime = styled.div`
font-size: 12px;
margin-top: 60px;
`

const StyledProductCell = styled(ProductCell)`
margin-bottom: 0;
border: 1px solid #F0F0F0;
:hover {
  border: 1px solid #F0F0F0;
}
`

const PostTitle = styled.h3`
font-size: 18px;
margin: 20px 0 12px;
line-height: 24px;
height: 24px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
${media.sm`
  margin-top: 0;
`}
a {
  color: #303030;
}
`

const PostMedia = styled(IPFSImage)`
width: 100%;
height: 134px;
object-fit: cover;
box-shadow: 0 0 1px rgba(0,0,0,0.2);
`

export default ({ id, products, description, createdAt, disabled = false, media, title, ...rest }) => {
  const renderProduct = () => {
    if (!products.length) {
      return (
        <StyledTime>
          <Time time={createdAt} />
        </StyledTime>
      )
    }
    return (
      <StyledProductCell {...products[0]} size='small' />
    )
  }
  return (
    <Container {...rest}>
      <Row type='flex' gutter={24} style={{ height: '100%' }}>
        <Col md={9} sm={11} xs={24}>
          <Link href='/posts/[id]' as={`/posts/${id}`} passHref>
            <a aria-label={title}>
              <PostMedia alt={title} hash={media && `${media.hash}-400-200`} />
            </a>
          </Link>
        </Col>
        <Col md={15} sm={13} xs={24}>
          <PostContent>
            <PostTitle>
              <Link href='/posts/[id]' as={`/posts/${id}`} passHref>
                <a>
                  {title}
                </a>
              </Link>
            </PostTitle>
            <PostDescription>{description}</PostDescription>
          </PostContent>
          {renderProduct()}
        </Col>
      </Row>
    </Container>
  )
}
