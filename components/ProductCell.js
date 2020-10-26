import styled from 'styled-components'
import Link from 'next/link'
import { Button } from 'antd'
import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons'
import LazyLoad from 'react-lazyload'
import useProductMeta from '../hooks/useProductMeta'
import { TopicsBar } from './Topics'
import Box from './Box'
import IPFSImage from './IPFSImage'
import ProductLike from './ProductLike'

const StyledProductLike = styled(ProductLike)`
  width: 58px;
  position: absolute !important;
  padding: 0 15px !important;
  top: 18px;
  right: 16px;
  height: 76px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  i {
    margin-left: 0 !important;
  }
  .anticon + span {
    margin: 0;
  }
`

const SmallProductLike = styled.div`
position: absolute;
right: 12px;
top: 0;
line-height: 60px;
font-size: 12px;
${({ isLike }) => isLike ? 'color: #DE7B76;' : ''}
span {
  margin-right: 4px;
  font-weight: bold;
}
`

const Cell = styled.div`
width: 100%;
height: 100%;
padding: ${({ size }) => ({
  normal: 16,
  small: 8,
  mini: 0
}[size])}px;
`

const ProductMeta = styled.div`
position: absolute;
bottom: 16px;
margin: 0;
left: 112px;
display: flex;
right: 100px;
>div {
  margin: 0;
  text-overflow:ellipsis;
  white-space: nowrap;
}
`

const Container = styled(Box)`
  position: relative;
  overflow: hidden;
  padding-right: ${({ size }) => ({
    normal: 80,
    small: 50,
    mini: 0
  }[size])}px;
  height: ${({ size }) => ({
    normal: 114,
    small: 62,
    mini: 40
  }[size])}px;
  ${({ size }) => size === 'mini' ? `
  box-shadow: none;
  border-width: 0;
  background: none;
  border-radius: 0 !important;;
  &:hover {
    border-width: 0;
  }
  ` : ''}
  > a {
    display: contents;
  }
`

const ProductContent = styled.div`
  margin-left: ${({ size }) => ({
    normal: 98,
    small: 56,
    mini: 52
  }[size])}px;
`

const ProductName = styled.h3`
  font-size: ${({ size }) => ({
    normal: 16,
    small: 14,
    mini: 12
  }[size])}px;
  margin: 0;
  line-height: ${({ size }) => size !== 'mini' ? 24 : 40}px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: ${({ size }) => size !== 'mini' ? 'normal' : 'bold'};
  a {
    color: #303030;
  }
`

const ProductIcon = styled(IPFSImage)`
  width: ${({ size }) => ({
    normal: 80,
    small: 44,
    mini: 40
  }[size])}px;
  height: ${({ size }) => ({
    normal: 80,
    small: 44,
    mini: 40
  }[size])}px;
  float: left;
  object-fit: contain;
`

const Description = styled.p`
color: #6f6f6f;
font-size: ${({ size }) => size === 'small' ? 12 : 13}px;
line-height: 20px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
display: block;
margin: 0;
`

const CommentsButton = styled(Button)`
color: #6f6f6f;
// margin-right: 8px;
margin-right: 18px;
display: flex;
align-items: center;
padding: 0 7px !important;
width: initial !important;
font-weight: bold;
font-size: 12px;
i {
  font-size: 12px;
  margin-top: 1px;
}
`

const CommentsCount = styled.span`
margin-left: 5px !important;
display: block;
height: 22px;
line-height: 22px;
`

const ProductTag = styled.div`
height: 24px;
line-height: 24px;
color: #FFF;
background: #DE7B76;
position: absolute;
width: 100px;
text-align: center;
transform: rotate(-45deg) translateY(32px) scale(0.9);
left: -50px;
top: -12px;
z-index: 1;
font-size: 12px;
`

const ProductCell = ({
  id, disabled = false, topics = [], size = 'normal', isMiniProgram,
  likeCount, commentCount, codeCount, isLike, icon, name, description,
  overflow = false, withLike = true,
  ...rest
}) => {
  const {
    hash,
    topics: newTopics
  } = useProductMeta({ icon, topics })
  const renderTopicsBar = () => {
    if (!newTopics.length) return null
    return (<TopicsBar disabled={disabled} href='/' list={newTopics} checkable />)
  }
  const renderMeta = () => {
    if (size !== 'normal') return null
    return (
      <ProductMeta>
        <Link href='/[id]' as={`/${id}#comments`}>
          <a>
            <CommentsButton icon={<MessageOutlined />} size='small'>
              {!!commentCount && (<CommentsCount>{commentCount}</CommentsCount>)}
            </CommentsButton>
          </a>
        </Link>
        {renderTopicsBar()}
      </ProductMeta>
    )
  }
  const renderDescription = () => {
    if (size === 'mini') return null
    return (<Description size={size}>{description || '暂无'}</Description>)
  }
  const renderCell = () => (
    <Cell size={size}>
      <LazyLoad throttle={200} once overflow={overflow}>
        <ProductIcon alt={name} size={size} hash={hash && `${hash}-160-160-contain`} />
      </LazyLoad>
      <ProductContent size={size}>
        <ProductName size={size}>
          {name}
        </ProductName>
        {renderDescription()}
      </ProductContent>
    </Cell>
  )
  const renderContent = () => {
    const cell = renderCell()
    if (!id || disabled) return cell
    return (
      <Link href='/[id]' as={`/${id}`}>
        <a>
          {cell}
        </a>
      </Link>
    )
  }
  const renderLikes = () => {
    if (!withLike) return null
    if (size === 'mini') return null
    if (size === 'small') {
      if (!likeCount) return null
      return (
        <SmallProductLike isLike={isLike}><span>{likeCount}</span>{isLike ? (<HeartFilled />) : (<HeartOutlined />)}</SmallProductLike>
      )
    }
    return (
      <StyledProductLike title='' id={id} likeCount={likeCount} isLike={isLike} />
    )
  }
  const renderTag = () => {
    if (size !== 'normal') return null
    if (codeCount) {
      return (
        <ProductTag>免费兑换码</ProductTag>
      )
    }
  }
  return (
    <Container {...rest} size={size}>
      {renderTag()}
      {renderContent()}
      {renderMeta()}
      {renderLikes()}
    </Container>
  )
}
export default ProductCell
