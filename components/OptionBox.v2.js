import styled from 'styled-components'
import noop from 'lodash/noop'
import useViewer from '../hooks/useViewer'
import ProductCell from './ProductCell'
import IPFSImage from './IPFSImage'
import ProductContent from './ProductContent'
import ReasonList from './ReasonList'
import OptionToolbar from './OptionToolbar'

const Section = styled.section`
border: 1px solid #F0F0F0;
background: #FFF;
margin-bottom: 24px;
`

const ProductHeader = styled.header`
padding: 0 16px;
`

const StyledProductCell = styled(ProductCell)`
margin: 16px 0;
border: 1px solid #F0F0F0;
height: 70px;
background: #FAFAFF;
h2 {
  line-height: 30px;
  font-weight: bold;
  font-size: 16px;
}
img {
  height: 52px;
  width: 52px;
}
a > div > div:nth-child(2) {
  margin-left: 60px;
}
`

const ProductMedias = styled.div`
border-top: 1px solid #F0F0F0;
border-bottom: 1px solid #F0F0F0;
padding: 16px 0;
display: flex;
overflow: auto;
background: #FAFAFF;
background-image: repeating-linear-gradient(60deg, rgba(255,255,255,.8), rgba(255,255,255,.8) 15px, 
                    transparent 0,transparent 30px);
::-webkit-scrollbar {
  display: none;
}
::after {
  content: '';
  min-width: 16px;
}
img {
  margin-left: 16px;
}
`

const StyledProductContent = styled(ProductContent)`
padding: 0 16px;
`

const StyledReasonList = styled(ReasonList)`
padding: 0 16px;
`

const StyledOptionToolbar = styled(OptionToolbar)`
margin-top: 12px;
`

const OptionBoxV2 = ({ option, onVote = noop }) => {
  const { viewer } = useViewer()
  const { product, value, ups, downs } = option
  const disabled = viewer &&
    (ups.some(x => x.user.id === viewer.id) || downs.some(x => x.user.id === viewer.id))
  const renderMedias = product => {
    const medias = product.medias.map(media => (
      <IPFSImage key={media.id} hash={media.hash} style={{ height: 200 }} />
    ))
    return !!medias.length && (<ProductMedias>{medias}</ProductMedias>)
  }
  return (
    <Section key={product.id}>
      <ProductHeader>
        <StyledProductCell size='small' {...product} />
      </ProductHeader>
      {renderMedias(product)}
      <StyledProductContent content={product.content} />
      <StyledReasonList id={`product-${product.id}-ups`} list={ups} positive />
      <StyledReasonList id={`product-${product.id}-downs`} list={downs} />
      <StyledOptionToolbar
        value={value}
        disabled={disabled}
        onVote={onVote}
      />
    </Section>
  )
}

export default OptionBoxV2
