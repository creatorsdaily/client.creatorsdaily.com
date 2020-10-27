import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { message } from 'antd'
import formError from '../libs/form-error'
import { productFragment, userFragment } from '../queries'

const CREATE_COMMENT = gql`
mutation($comment: IComment!) {
  createComment(comment: $comment) {
    id
    content
    createdAt
    parentId
    children {
      id
    }
    products {
      ${productFragment}
      discovererId
      creators {
        ${userFragment}
      }
    }
    user {
      ${userFragment}
    }
  }
}
`

export default ({
  productIds,
  milestoneIds,
  wishIds
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
      productIds: productIds,
      milestoneIds: milestoneIds,
      wishIds: wishIds,
      content
    }
    if (replyId) {
      comment.parentId = replyId
      comment.content = reply
    }
    console.log(comment)
    return create({
      variables: {
        comment
      }
    })
  }
  return [handleReply, result, content, setContent]
}
