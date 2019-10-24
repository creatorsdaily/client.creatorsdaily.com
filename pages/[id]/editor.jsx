import React, { useRef } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Col, Row, Spin, message } from 'antd'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { useRouter } from 'next/router'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import useAuth from '../../hooks/useAuth'
import ProductEditor from '../../components/ProductEditor'
import formError from '../../libs/form-error'
import { GET_PRODUCT } from '../../queries'
import { formToProduct, productToForm } from '../../components/ProductForm'

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`

const UPDATE_PRODUCT = gql`
mutation($product: IProduct!) {
  updateProduct(product: $product) {
    id
    name
    icon {
      id,
      hash
    }
  }
}
`

export default () => {
  const ref = useRef()
  useAuth()
  const { replace, query } = useRouter()
  const step = Number(query.step) || 'all'
  const [update, { loading }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: data => {
      if (step === 'all' || step === 3) {
        message.success('保存成功')
        replace('/[id]', `/${query.id}`)
      } else {
        next()
      }
    },
    onError: error => {
      const { form } = ref.current.props
      const errors = formError(form, error)
      message.error(errors[0].message)
    },
    refetchQueries: () => [{
      query: GET_PRODUCT,
      variables: { id: query.id }
    }]
  })
  const { data, loading: getLoading } = useQuery(GET_PRODUCT, {
    variables: {
      id: query.id
    },
    onCompleted (data) {
      const product = productToForm(get(data, 'product', {}))
      const { form } = ref.current.props
      form.setFieldsValue(pick(product, Object.keys(form.getFieldsValue())))
    }
  })
  const next = () => {
    replace({
      pathname: '/[id]/editor',
      query: {
        id: query.id,
        step: step + 1
      }
    }, `/${query.id}/editor?step=${step + 1}`)
  }
  const handleSubmit = values => {
    update({
      variables: {
        product: {
          id: product.id,
          ...formToProduct(values)
        }
      }
    })
  }
  const renderCancelButton = () => {
    if (step !== 2) return null
    return (
      <Col span={6}>
        <Button block onClick={next}>跳过</Button>
      </Col>
    )
  }
  const product = get(data, 'product')
  const renderProduct = () => {
    if (!product) {
      return (
        <Spin />
      )
    }
    return (
      <ProductEditor
        step={step}
        product={product}
        onSubmit={handleSubmit}
        wrappedComponentRef={ref}
        renderFooter={() => (
          <Row type='flex' justify='center' gutter={24}>
            {renderCancelButton()}
            <Col span={6}>
              <Button block loading={getLoading || loading} htmlType='submit' type='primary'>保存</Button>
            </Col>
          </Row>
        )} />
    )
  }
  return (
    <Page>
      <StyledContainer>
        {renderProduct()}
      </StyledContainer>
    </Page>
  )
}
