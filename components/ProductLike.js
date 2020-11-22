import { Button } from 'antd'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined'
import formError from '../libs/form-error'
import { red } from '../libs/colors'
import message from '../libs/message.dynamic'

const StyledButton = styled(Button)`
  min-height: 50px;
  ${({ islike }) => islike === 'true' ? `
    background: rgba(222, 123, 118, 0.1);
    color: ${red};
    border-color: ${red};
    :active, :focus {
      background: rgba(222, 123, 118, 0.1);
      color: ${red};
      border-color: ${red};
    }
  ` : ''}
  :hover, :active, :focus {
    color: rgba(0, 0, 0, 0.65);
    border-color: #d9d9d9;
  }
  :hover {
    border-color: ${red};
    svg {
      color: ${red};
    }
  }
  svg {
    transition: color 0.3s;
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

const ProductLike = ({ title = '我喜欢', id, likeCount, isLike, loading: containerLoading, ...rest }) => {
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
export default ProductLike
