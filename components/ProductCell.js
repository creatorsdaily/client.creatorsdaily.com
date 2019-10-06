import styled from 'styled-components'
import Link from 'next/link'
import useProductMeta from '../hooks/useProductMeta'
import { TopicsBar } from './Topics'
import Box from './Box'
import IPFSImage from './IPFSImage'
import ProductLike from './ProductLike'

const StyledProductLike = styled(ProductLike)`
  width: 64px;
  position: absolute !important;
  padding: 0 15px !important;
  top: 18px;
  right: 24px;
  height: 74px;
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

const StyledTopicsBar = styled(TopicsBar)`
  position: absolute;
  bottom: 16px;
  margin: 0;
  left: 112px;
`

const Container = styled(Box)`
  margin-bottom: 24px;
  position: relative;
  padding-right: 90px;
  height: ${({ size }) => size === 'small' ? 62 : 112}px;
`

const ProductContent = styled.div`
  margin-left: ${({ size }) => size === 'small' ? 56 : 98}px;
`

const ProductName = styled.h3`
  font-size: ${({ size }) => size === 'small' ? 14 : 16}px;
  margin: 0;
  line-height: 24px;
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
`

export default ({
  id, disabled = false, topics = [], size = 'normal',
  likeCount, isLike, icon, name, description,
  ...rest
}) => {
  const {
    hash,
    topics: newTopics
  } = useProductMeta({ icon, topics })
  const renderTopics = () => {
    if (!newTopics.length || size === 'small') return null
    return (
      <StyledTopicsBar disabled={disabled} href='/' list={newTopics} checkable />
    )
  }
  const renderCell = () => (
    <StyledLink size={size}>
      <ProductIcon size={size} hash={hash} />
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
      {renderTopics()}
      {renderLikes()}
    </Container>
  )
}
