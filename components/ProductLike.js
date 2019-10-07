import { Button, message } from 'antd'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import useToggle from 'react-use/lib/useToggle'
import formError from '../libs/form-error'
import { GET_PRODUCT } from '../queries'

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
  const [like, { loading }] = useMutation(LIKE, {
    onError: error => {
      const errors = formError(null, error)
      message.error(errors[0].message)
    },
    refetchQueries: () => [{
      query: GET_PRODUCT,
      variables: { id }
    }]
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
      loading={loading}
      block
      size='large'
      icon='caret-up'
      onClick={handleClick}
      islike={(!!isLike).toString()}
      {...rest}
    >
      {title}
      <Count>{likeCount || '' }</Count>
    </StyledButton>
  )
}
