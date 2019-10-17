import styled from 'styled-components'
import Link from 'next/link'
import IPFSImage from '../components/IPFSImage'
import useProductMeta from '../hooks/useProductMeta'
import media from '../libs/media'
import { TopicsBar } from './Topics'

const Container = styled.div`
  margin-bottom: 24px;
  height: 92px;
  padding: 0 16px;
  ${media.sm`
    padding: 0;
  `}
`

const ProductIcon = styled.div`
  float: left;
  width: 92px;
  height: 92px;
  margin-right: 16px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const ProductName = styled.h1`
  margin: 0;
  line-height: 32px;
  font-size: 20px;
  margin-bottom: 8px;
  a {
    color: rgba(0, 0, 0, 0.85);
    :hover {
      color: #2e8de6;
    }
  }
`

const Description = styled.p`
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
margin-bottom: 8px;
font-size: 13px;
line-height: 20px;
height: 20px;
`

const StyledTopicsBar = styled(TopicsBar)`
a {
  display: inline-block;
}
padding: 0;
margin: 0;
`

export default ({ id, name, description, icon, topics = [], ...rest }) => {
  const {
    hash,
    topics: newTopics
  } = useProductMeta({ icon, topics })
  return (
    <Container {...rest}>
      <ProductIcon>
        <IPFSImage alt={name} hash={hash} />
      </ProductIcon>
      <div>
        <ProductName>
          <Link href='/[id]' as={`/${id}`}>
            <a>
              {name}
            </a>
          </Link>
        </ProductName>
        <Description>{description}</Description>
        <StyledTopicsBar href='/' hideTitle list={newTopics} />
      </div>
    </Container>
  )
}
