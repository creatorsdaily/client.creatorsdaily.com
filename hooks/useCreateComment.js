import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { message } from 'antd'
import formError from '../libs/form-error'
import CreateComment from '../queries/mutations/CreateComment.gql'

const useCreateComment = ({
  productIds,
  milestoneIds,
  wishIds
}, option = {}) => {
  const [content, setContent] = useState('')
  const [create, result] = useMutation(CreateComment, {
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
    return create({
      variables: {
        comment
      }
    })
  }
  return [handleReply, result, content, setContent]
}
export default useCreateComment
