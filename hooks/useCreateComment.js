import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { message } from 'antd'
import gql from 'graphql-tag'
import formError from '../libs/form-error'
import { userFragment } from '../queries'

const CREATE_COMMENT = gql`
mutation($comment: IComment!) {
  createComment(comment: $comment) {
    id
    content
    createdAt
    parentId
    productId
    milestoneId
    wishId
    children {
      id
    }
    user {
      ${userFragment}
    }
  }
}
`

export default ({
  productId,
  milestoneId,
  wishId
}, option = {}) => {
  const [content, setContent] = useState('')
  const [create, result] = useMutation(CREATE_COMMENT, {
    onCompleted: data => {
      message.success('提交成功')
      setContent('')
    },
    onError: error => {
      const errors = formError(null, error)
      message.error(errors[0].message)
    },
    ...option
  })
  const handleReply = (replyId, reply) => {
    const comment = {
      productId,
      milestoneId,
      wishId,
      content
    }
    if (replyId) {
      comment.parentId = replyId
      comment.content = reply
    }
    return create({
      variables: {
        comment
      }
    })
  }
  return [handleReply, result, content, setContent]
}
