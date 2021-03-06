import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import { gql, useMutation } from '@apollo/client'
import noop from 'lodash/noop'
import OptionForm from '../components/OptionForm'
import formError from '../libs/form-error'
import QuestionDetail from '../queries/QuestionDetail.gql'

const CREATE_OPTION = gql`
mutation($option: IOption!) {
  createOption(option: $option) {
    id,
    questionId
  }
}
`

const useCreateOptionModal = ({
  question,
  product,
  positive = true
} = {}, {
  onCompleted = noop,
  onError = noop,
  ...rest
} = {}) => {
  const [form] = Form.useForm()
  const [questionId, setQuestionId] = useState(question)
  const [productId, setProductId] = useState(product)
  const [isPositive, setIsPositive] = useState(positive)
  const [isFixed, setIsFixed] = useState(false)
  const [visible, setVisible] = useToggle(false)
  const [create, { loading }] = useMutation(CREATE_OPTION, {
    ...rest,
    refetchQueries: ({ data: { createOption } }) => [{
      query: QuestionDetail,
      variables: { id: createOption.questionId }
    }],
    onError: error => {
      formError(form, error, 'reason')
      onError(error)
    },
    onCompleted: (data) => {
      form.resetFields()
      hide()
      onCompleted(data)
    }
  })
  useEffect(() => {
    form.setFieldsValue({
      productId: product
    })
  }, [product])
  const show = ({
    question,
    product,
    positive = true,
    fixed = false
  } = {}) => {
    if (question) {
      setQuestionId(question)
    }
    if (product) {
      setProductId(product)
      form.setFieldsValue({
        productId: product
      })
    }
    setIsPositive(positive)
    setVisible(true)
    setIsFixed(fixed)
  }
  const hide = () => {
    form.resetFields()
    setVisible(false)
  }
  return [(
    <Modal
      key='create-options-modal'
      width={360}
      confirmLoading={loading}
      visible={visible}
      title='推荐产品'
      onCancel={hide}
      destroyOnClose
      onOk={async () => {
        const { productId, reason } = await form.validateFields()
        create({
          variables: {
            option: {
              questionId,
              productId,
              positive: isPositive,
              reason
            }
          }
        })
      }}
    >
      <OptionForm
        form={form}
        positive={isPositive}
        fixed={isFixed}
        topics={[]}
        product={productId}
        question={questionId}
      />
    </Modal>
  ), show, hide]
}
export default useCreateOptionModal
