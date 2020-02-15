import React from 'react'
import { Divider, Spin } from 'antd'
import validate from 'uuid-validate'
import styled from 'styled-components'
import Link from 'next/link'
import Product from '../../components/Product'
import ProductLayout from '../../layouts/Product'
import ProductInner from '../../layouts/ProductInner'
import Comments from '../../components/Comments'
import SmallTitle from '../../components/SmallTitle'
import withApollo from '../../libs/with-apollo'
import Container from '../../components/Container'
import Box from '../../components/Box'
import Counter from '../../components/Counter'
import OptionCounter from '../../components/OptionCounter'
import ReasonList from '../../components/ReasonList'
import media from '../../libs/media'
import useCreateOptionModal from '../../hooks/useCreateOptionModal'

const StyledContainer = styled(Container)`
margin-top: 24px;
`

const ProductOptionBox = styled(Box)`
padding: 16px 24px;
margin-bottom: 24px;
`

const ProductOptionHeader = styled.div`
margin-bottom: 16px;
display: flex;
align-items: center;
`

const QuestionName = styled.h2`
font-size: 18px;
margin: 0;
display: inline-block;
flex: 1;
margin-left: 0;
${media.sm`
margin-left: 8px;
`}
`

const StyledCounter = styled(Counter)`
padding-bottom: 8px;
min-width: 70px;
margin-right: 0;
${media.sm`
margin-right: 10px;
`}
`

const Content = ({ id, product, loading }) => {
  const [modal, show] = useCreateOptionModal({ question: id })
  const renderOptions = (options = []) => {
    if (!options.length) return null
    return options.map(({ rank, value, question, ups, downs }) => (
      <ProductOptionBox key={question.id}>
        <ProductOptionHeader>
          <StyledCounter># 第<span>{rank}</span>名</StyledCounter>
          <Divider type='vertical' />
          <QuestionName>
            <Link
              href='/questions/[id]/products/[product-id]'
              as={`/questions/${question.id}/products/${id}`}
            >
              <a>
                {question.name}
              </a>
            </Link>
          </QuestionName>
        </ProductOptionHeader>
        <OptionCounter
          productId={id} questionId={question.id} ups={ups} downs={downs} onClick={(qid, pid, v) => show({
            question: qid,
            product: pid,
            positive: v,
            fixed: true
          })}
        />
        <ReasonList list={ups} positive />
        <ReasonList list={downs} />
      </ProductOptionBox>
    ))
  }
  return (
    <StyledContainer>
      {modal}
      <ProductInner loading={loading} product={product}>
        <Spin spinning={loading}>
          <Product {...product} full />
          {renderOptions(product.options)}
        </Spin>
        <SmallTitle id='comments' name='comments'>聊一聊</SmallTitle>
        <Comments productId={id} product={product} />
      </ProductInner>
    </StyledContainer>
  )
}

const ProductPage = () => {
  return (
    <ProductLayout>
      <Content />
    </ProductLayout>
  )
}

ProductPage.getInitialProps = ({ query: { id }, res }) => {
  if (res && !validate(id)) {
    res.statusCode = 404
  }
  if (!validate(id)) return { statusCode: 404 }
  return {}
}

export default withApollo(ProductPage)
