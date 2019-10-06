import { useMutation } from '@apollo/react-hooks'
import { message } from 'antd'
import gql from 'graphql-tag'
import { GET_PRODUCT } from '../queries'

const ADD_PRODUCT_FILES = gql`
  mutation($id: String!, $files: [IFile!], $url: String) {
    addProductFiles(id: $id, files: $files, url: $url) {
      id
    }
  }
`

export default (id) => {
  const refetchQueries = [{
    query: GET_PRODUCT,
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
