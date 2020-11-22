import React from 'react'
import { Alert, Form, Modal } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import { gql, useMutation } from '@apollo/client'
import noop from 'lodash/noop'
import styled from 'styled-components'
import CodeForm from '../components/CodeForm'
import formError from '../libs/form-error'

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

const useCreateCodeModal = (productId, {
  onCompleted = noop,
  onError = noop,
  ...rest
} = {}) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useToggle(false)
  const [create, { loading }] = useMutation(CREATE_CODES, {
    ...rest,
    onCompleted: data => {
      form.resetFields()
      hide()
      onCompleted(data)
    },
    onError: error => {
      formError(form, error, 'codes')
      onError(error)
    }
  })
  const show = () => setVisible(true)
  const hide = () => {
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
      onOk={async () => {
        const {
          codes
        } = await form.validateFields()
        create({
          variables: {
            productId,
            codes: codes.split('\n').filter(x => !!x)
          }
        })
      }}
    >
      <StyledAlert showIcon message='产品需要付费才能体验？发布一些产品「兑换码」，为你的忠实用户提供一些小福利吧～' />
      <CodeForm form={form} />
    </Modal>
  ), show, hide]
}
export default useCreateCodeModal
