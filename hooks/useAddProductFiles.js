import { gql, useMutation } from '@apollo/client'
import { message } from 'antd'
import ProductDetail from '../queries/ProductDetail.gql'

const ADD_PRODUCT_FILES = gql`
  mutation($id: String!, $files: [IFile!], $url: String) {
    addProductFiles(id: $id, files: $files, url: $url) {
      id
    }
  }
`

export default (id) => {
  const refetchQueries = [{
    query: ProductDetail,
    variables: {
      id
    }
  }]

  const [addProductFiles] = useMutation(ADD_PRODUCT_FILES, {
    onCompleted () {
      message.success('上传成功！')
    },
    refetchQueries
  })

  return async (value, type) => {
    if (type === 'urls') {
      await addProductFiles({
        variables: {
          id,
          url: value[0]
        }
      })
    } else if (type === 'keys') {
      await addProductFiles({
        variables: {
          id,
          files: value
        }
      })
    }
  }
}
