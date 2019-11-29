import React, { useRef } from 'react'
import { Alert, Form, Modal } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import noop from 'lodash/noop'
import styled from 'styled-components'
import WishForm from '../components/WishForm'
import formError from '../libs/form-error'

const CreateWishForm = Form.create()(WishForm)

const CREATE_MILESTONE = gql`
mutation($wish: IWish!) {
  createWish(wish: $wish) {
    id
    type
    title
  }
}
`

const StyledAlert = styled(Alert)`
  margin-bottom: 24px;
`

export default (productId, {
  onCompleted = noop,
  onError = noop,
  ...rest
} = {}) => {
  const ref = useRef()
  const [visible, setVisible] = useToggle(false)
  const [create, { loading }] = useMutation(CREATE_MILESTONE, {
    ...rest,
    onCompleted: data => {
      const { form } = ref.current.props
      form.resetFields()
      hide()
      onCompleted(data)
    },
    onError: error => {
      const { form } = ref.current.props
      formError(form, error, 'content')
      onError(error)
    }
  })
  const show = () => setVisible(true)
  const hide = () => {
    const { form } = ref.current.props
    form.resetFields()
    setVisible(false)
  }
  return [(
    <Modal
      confirmLoading={loading}
      visible={visible}
      title='创建「新愿」'
      onCancel={hide}
      onOk={() => {
        const { form } = ref.current.props
        form.validateFields((err, {
          type,
          title,
          content
        }) => {
          if (err) return
          create({
            variables: {
              wish: {
                productId,
                type,
                title,
                content
              }
            }
          })
        })
      }}
    >
      <StyledAlert showIcon message='你可以在这里向开发者「请求功能」或「报告缺陷」～' />
      <CreateWishForm wrappedComponentRef={ref} />
    </Modal>
  ), show, hide]
}
