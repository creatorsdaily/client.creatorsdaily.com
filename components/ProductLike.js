import { Button, message } from 'antd'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import useToggle from 'react-use/lib/useToggle'
import formError from '../libs/form-error'

const StyledButton = styled(Button)`
  min-height: 50px;
  ${({ islike }) => islike === 'true' ? `
    background: #FFF;
    color: #DE7B76;
    border-color: #DE7B76;
  ` : ''}
  
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
  }
}
`

export default ({ title = '我喜欢', id, likeCount, isLike, ...rest }) => {
  const [count, setCount] = useState(likeCount)
  const [isCurrentLike, setLike] = useToggle(isLike)
  const [like, { loading }] = useMutation(LIKE, {
    onCompleted: data => {
      setCount(count + (isCurrentLike ? -1 : 1))
      setLike(!isCurrentLike)
    },
    onError: error => {
      const errors = formError(null, error)
      message.error(errors[0].message)
    }
  })
  useEffect(() => {
    setCount(likeCount)
    setLike(isLike)
  }, [likeCount, isLike])
  const handleClick = () => {
    like({
      variables: {
        id,
        dislike: isCurrentLike
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
      islike={(!!isCurrentLike).toString()}
      {...rest}
    >
      {title}
      <Count>{count || '' }</Count>
    </StyledButton>
  )
}
