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
height: 320px;
border: 0;
overflow: hidden;
&:hover {
  border: 0;
}
${media.sm`
  height: 160px;
`}
`

const PostContent = styled.div`
`

const PostDescription = styled.div`
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
margin-bottom: 16px;
font-size: 13px;
height: 20px;
line-height: 20px;
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
margin: 0 0 6px;
line-height: 24px;
height: 24px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
a {
  color: #303030;
}
`

const PostMedia = styled.a`
width: 100%;
height: 160px;
display: block;
overflow: hidden;
position: relative;
img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  transition: transform 0.6s;
  position: absolute;
}
&:hover {
  img {
    transform: scale(1.2);
  }
}
`

const PostTag = styled.div`
height: 24px;
line-height: 24px;
color: #FFF;
background: #DE7B76;
position: absolute;
width: 100px;
text-align: center;
transform: rotate(-45deg) translateY(32px);
left: -50px;
top: -12px;
z-index: 1;
font-size: 12px;
`

export default ({ id, products, description, createdAt, disabled = false, media, title, flag, ...rest }) => {
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
      <Row type='flex' style={{ height: '100%' }}>
        <Col xl={10} lg={11} md={11} sm={11} xs={24}>
          <Link href='/posts/[id]' as={`/posts/${id}`} passHref>
            <PostMedia aria-label={title}>
              {flag && (<PostTag>{flag}</PostTag>)}
              <IPFSImage alt={title} hash={media && `${media.hash}-600-300`} />
            </PostMedia>
          </Link>
        </Col>
        <Col xl={14} lg={13} md={13} sm={13} xs={24} style={{ padding: 16 }}>
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
