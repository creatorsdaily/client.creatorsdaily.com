import { Button, message } from 'antd'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import formError from '../libs/form-error'

const StyledButton = styled(Button)`
width: 36px;
padding: 0 !important;
height: 44px;
justify-content: center;
align-items: center;
display: flex;
flex-direction: column;
line-height: 18px;
font-size: 13px;
i {
  margin-left: 0 !important;
}
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

.anticon + span {
  margin: 0;
}
`

const Count = styled.span`
margin: 0 10px;
opacity: .65;
font-weight: 600;
`

const LIKE = gql`
mutation($id: String!, $dislike: Boolean) {
  likeWish(id: $id, dislike: $dislike) {
    id
    isLike
    likeCount
  }
}
`

export default ({ id, likeCount, isLike, ...rest }) => {
  const [like, { loading }] = useMutation(LIKE, {
    onError: error => {
      const errors = formError(null, error)
      message.error(errors[0].message)
    }
  })
  const handleClick = () => {
    console.log(id)
    like({
      variables: {
        id,
        dislike: isLike
      }
    })
  }
  return (
    <StyledButton
      loading={loading}
      block
      size='large'
      icon='caret-up'
      onClick={handleClick}
      islike={(!!isLike).toString()}
      {...rest}
    >
      <Count>{likeCount || '' }</Count>
    </StyledButton>
  )
}
