import { Divider } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import classNames from 'classnames'
import noop from 'lodash/noop'
import Box from './Box'
import Counter from './Counter'
import ReasonList from './ReasonList'
import OptionCounter from './OptionCounter'
import ProductCell from './ProductCell'
import ProductFiles from './ProductFiles.dynamic'

const StyledBox = styled(Box)`
  margin-bottom: 24px;
  transition: box-shadow 0.25s;
  &.full {
    box-shadow: none;
    :hover {
      box-shadow: none;
    }
  }
  .ant-comment-content-author-name {
    height: 24px;
    line-height: 24px;
  }
`

const StyledProductCell = styled(ProductCell)`
box-shadow: none;
border: 0;
height: 44px;
> div {
  padding: 0;
}
:hover {
  border: 0;
}
`

const ProductHeader = styled.div`
padding: 16px;
display: flex;
align-items: center;
`

const OptionContent = styled.div`
padding: 16px;
`

const ProductLink = styled.div`
line-height: 30px;
a {
  color: #303030;
}
`

const StyledCounter = styled(Counter)`
padding-bottom: 8px;
`

export default ({ rank, ups, downs, questionId, product, mode = 'normal', onClick = noop }) => {
  const renderBody = () => {
    if (mode === 'mini') return null
    return (
      <>
        <ProductFiles medias={product.medias} height={240} />
        <OptionContent>
          <OptionCounter productId={product.id} questionId={questionId} ups={ups} downs={downs} onClick={onClick} />
          <ReasonList id={`product-${product.id}-ups`} list={ups} positive />
          <ReasonList id={`product-${product.id}-downs`} list={downs} />
        </OptionContent>
      </>
    )
  }
  return (
    <StyledBox className={classNames('clearfix', mode)} id={`product-${product.id}`}>
      <ProductHeader>
        <StyledCounter># 第<span>{rank}</span>名</StyledCounter>
        <Divider type='vertical' />
        <div style={{ flex: 1, marginLeft: 10 }}>
          <Link
            href='/questions/[id]/products/[productId]'
            as={`/questions/${questionId}/products/${product.id}`}
          >
            <a>
              <StyledProductCell {...product} disabled size='small' />
            </a>
          </Link>
        </div>
        <ProductLink>
          <Link
            href='/[id]'
            as={`/${product.id}`}
          >
            <a>
              查看产品
            </a>
          </Link>
        </ProductLink>
      </ProductHeader>
      {renderBody()}
    </StyledBox>
  )
}
