import React, { useRef } from 'react'
import { Form, Modal } from 'antd'
import useToggle from 'react-use/lib/useToggle'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import noop from 'lodash/noop'
import ProductForm from '../components/ProductForm'
import formError from '../libs/form-error'

const CreateProductForm = Form.create()(ProductForm)

const CREATE_PRODUCT = gql`
mutation($product: IProduct!) {
  createProduct(product: $product) {
    id,
    name
  }
}
`

export default ({
  onCompleted = noop,
  onError = noop,
  ...rest
} = {}) => {
  const ref = useRef()
  const [visible, setVisible] = useToggle(false)
  const [create, { loading }] = useMutation(CREATE_PRODUCT, {
    ...rest,
    onCompleted: data => {
      const { form } = ref.current.props
      form.resetFields()
      hide()
      onCompleted(data)
    },
    onError: error => {
      const { form } = ref.current.props
      formError(form, error, 'name')
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
      width={460}
      confirmLoading={loading}
      visible={visible}
      title='添加一个新产品'
      onCancel={hide}
      onOk={() => {
        const { form } = ref.current.props
        form.validateFields((err, {
          name,
          icon,
          description,
          content,
          topics,
          files = [],
          links = []
        }) => {
          if (err) return
          create({
            variables: {
              product: {
                name,
                description,
                content,
                topics,
                icon,
                links: (Array.isArray(links) ? links : [links]).map(x => ({
                  url: x
                })),
                files: files.map(x => ({
                  hash: x
                }))
              }
            }
          })
        })
      }}
    >
      <CreateProductForm topics={[]}
        wrappedComponentRef={ref}
      />
    </Modal>
  ), show, hide]
}
