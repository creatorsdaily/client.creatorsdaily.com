import { Button, message } from 'antd'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined'
import formError from '../libs/form-error'

const StyledButton = styled(Button)`
  min-height: 50px;
  ${({ islike }) => islike === 'true' ? `
    background: rgba(222, 123, 118, 0.1);
    color: #DE7B76;
    border-color: #DE7B76;
    :active, :focus {
      background: rgba(222, 123, 118, 0.1);
      color: #DE7B76;
      border-color: #DE7B76;
    }
  ` : ''}
  :active, :focus {
    color: rgba(0, 0, 0, 0.65);
    border-color: #d9d9d9;
  }
`

const Count = styled.span`
margin: 0 10px;
opacity: .65;
font-weight: 600;
`

const LIKE = gql`
mutation($id: String!, $dislike: Boolean) {
  likeProduct(id: $id, dislike: $dislike) {
    id
    isLike
    likeCount
  }
}
`

export default ({ title = '我喜欢', id, likeCount, isLike, loading: containerLoading, ...rest }) => {
  const [like, { loading }] = useMutation(LIKE, {
    onError: error => {
      const errors = formError(null, error)
      message.error(errors[0].message)
    }
  })
  const handleClick = () => {
    like({
      variables: {
        id,
        dislike: isLike
      }
    })
  }
  return (
    <StyledButton
      loading={containerLoading || loading}
      block
      size='large'
      icon={<CaretUpOutlined />}
      onClick={handleClick}
      islike={(!!isLike).toString()}
      {...rest}
    >
      {title}
      <Count>{likeCount || ''}</Count>
    </StyledButton>
  )
}
