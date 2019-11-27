import styled from 'styled-components'
import Link from 'next/link'
import { Button } from 'antd'
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
`

const StyledLink = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  padding: ${({ size }) => size === 'small' ? 8 : 16}px;
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
  margin-bottom: 24px;
  position: relative;
  padding-right: ${({ size }) => size === 'small' ? 0 : 80}px;
  height: ${({ size }) => size === 'small' ? 62 : 114}px;
`

const ProductContent = styled.div`
  margin-left: ${({ size }) => size === 'small' ? 56 : 98}px;
`

const ProductName = styled.h3`
  font-size: ${({ size }) => size === 'small' ? 14 : 16}px;
  margin: 0;
  line-height: 24px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display: block;
  a {
    color: #303030;
  }
`

const ProductIcon = styled(IPFSImage)`
  width: ${({ size }) => size === 'small' ? 44 : 80}px;
  height: ${({ size }) => size === 'small' ? 44 : 80}px;
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

export default ({
  id, disabled = false, topics = [], size = 'normal',
  likeCount, commentCount, isLike, icon, name, description,
  ...rest
}) => {
  const {
    hash,
    topics: newTopics
  } = useProductMeta({ icon, topics })
  const renderMeta = () => {
    if (size === 'small') return null
    return (
      <ProductMeta>
        <Link href='/[id]' as={`/${id}#comments`}>
          <a>
            <CommentsButton icon='message' size='small'>
              {!!commentCount && (<CommentsCount>{commentCount}</CommentsCount>)}
            </CommentsButton>
          </a>
        </Link>
        {!!newTopics.length && (<TopicsBar disabled={disabled} href='/' list={newTopics} checkable />)}
      </ProductMeta>
    )
  }
  const renderCell = () => (
    <StyledLink size={size}>
      <ProductIcon alt={name} size={size} hash={hash && `${hash}-160-160-contain`} />
      <ProductContent size={size}>
        <ProductName size={size}>
          {name}
        </ProductName>
        <Description size={size}>{description}</Description>
      </ProductContent>
    </StyledLink>
  )
  const renderContent = () => {
    const cell = renderCell()
    if (!id || disabled) return cell
    return (
      <Link href='/[id]' as={`/${id}`} passHref>
        {cell}
      </Link>
    )
  }
  const renderLikes = () => {
    if (size === 'small') return null
    return (
      <StyledProductLike title='' id={id} likeCount={likeCount} isLike={isLike} />
    )
  }
  return (
    <Container {...rest} size={size}>
      {renderContent()}
      {renderMeta()}
      {renderLikes()}
    </Container>
  )
}
