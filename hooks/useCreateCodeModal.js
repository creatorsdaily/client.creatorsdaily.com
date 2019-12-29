import React, { useRef } from 'react'
import { Alert, Form, Modal } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import noop from 'lodash/noop'
import styled from 'styled-components'
import CodeForm from '../components/CodeForm'
import formError from '../libs/form-error'

const CreateCodeForm = Form.create()(CodeForm)

const CREATE_CODES = gql`
mutation($productId: String!, $codes: [String!]!) {
  createCodes(productId: $productId, codes: $codes) {
    id
    code
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
  const [create, { loading }] = useMutation(CREATE_CODES, {
    ...rest,
    onCompleted: data => {
      const { form } = ref.current.props
      form.resetFields()
      hide()
      onCompleted(data)
    },
    onError: error => {
      const { form } = ref.current.props
      formError(form, error, 'codes')
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
      key='modal'
      confirmLoading={loading}
      visible={visible}
      title='发布产品兑换码'
      onCancel={hide}
      onOk={() => {
        const { form } = ref.current.props
        form.validateFields((err, {
          codes
        }) => {
          if (err) return
          create({
            variables: {
              productId,
              codes: codes.split('\n').filter(x => !!x)
            }
          })
        })
      }}
    >
      <StyledAlert showIcon message='产品需要付费才能体验？发布一些产品「兑换码」，为你的忠实用户提供一些小福利吧～' />
      <CreateCodeForm wrappedComponentRef={ref} />
    </Modal>
  ), show, hide]
}
