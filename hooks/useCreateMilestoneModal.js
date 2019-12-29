import React, { useRef } from 'react'
import { Alert, Form, Modal } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import noop from 'lodash/noop'
import styled from 'styled-components'
import MilestoneForm from '../components/MilestoneForm'
import formError from '../libs/form-error'

const CreateMilestoneForm = Form.create()(MilestoneForm)

const CREATE_MILESTONE = gql`
mutation($milestone: IMilestone!) {
  createMilestone(milestone: $milestone) {
    id
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
      key='modal'
      confirmLoading={loading}
      visible={visible}
      title='新里程碑'
      onCancel={hide}
      onOk={() => {
        const { form } = ref.current.props
        form.validateFields((err, {
          title,
          content
        }) => {
          if (err) return
          create({
            variables: {
              milestone: {
                productId,
                title,
                content
              }
            }
          })
        })
      }}
    >
      <StyledAlert showIcon message='产品有了新的里程碑？' description='新版本更新？达到1000个用户？或者有重大消息发布？都可以通过新的里程碑告知用户！' />
      <CreateMilestoneForm wrappedComponentRef={ref} />
    </Modal>
  ), show, hide]
}
