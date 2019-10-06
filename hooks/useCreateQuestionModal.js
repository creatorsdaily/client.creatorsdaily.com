import React, { useRef } from 'react'
import { Form, Modal } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import noop from 'lodash/noop'
import QuestionForm from '../components/QuestionForm'
import formError from '../libs/form-error'

const CreateQuestionForm = Form.create()(QuestionForm)

const CREATE_QUESTION = gql`
mutation($question: IQuestion!) {
  createQuestion(question: $question) {
    id,
    name
  }
}
`

export default ({
  onCompleted = noop,
  onError = noop,
  ...rest
}) => {
  const ref = useRef()
  const [visible, setVisible] = useToggle(false)
  const [create, { loading }] = useMutation(CREATE_QUESTION, {
    ...rest,
    onError: error => {
      const { form } = ref.current.props
      formError(form, error, 'topics')
      onError(error)
    },
    onCompleted: data => {
      const { form } = ref.current.props
      form.resetFields()
      hide()
      onCompleted(data)
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
      title='发起一个新问题'
      okText='提问'
      onCancel={hide}
      onOk={() => {
        const { form } = ref.current.props
        form.validateFields((err, { name, topics }) => {
          if (err) return
          create({
            variables: {
              question: {
                name,
                topics
              }
            }
          })
        })
      }}
    >
      <CreateQuestionForm wrappedComponentRef={ref} />
    </Modal>
  ), show, hide]
}
