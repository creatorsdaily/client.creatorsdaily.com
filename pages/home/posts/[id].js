import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import Home from '../../../layouts/Home'
import withApollo from '../../../libs/with-apollo'
import PostEditor from '../../../components/PostEditor'
import PostDetail from '../../../queries/PostDetail.gql'
import useCheckMobile from '../../../hooks/useCheckMobile'
import UpdatePost from '../../../queries/mutations/UpdatePost.gql'
import message from '../../../libs/message.dynamic'

export default withApollo(() => {
  useCheckMobile()
  const { query: { id }, back } = useRouter()
  const { data } = useQuery(PostDetail, {
    variables: {
      id
    }
  })
  const [update] = useMutation(UpdatePost, {
    onCompleted: () => {
      message.success('修改成功！')
      back()
    }
  })
  const post = get(data, 'getPost')
  const handleSubmit = (variables) => {
    update({
      variables: {
        ...variables,
        id
      }
    })
  }
  return (
    <Home>
      <PostEditor post={post} onSubmit={handleSubmit} />
    </Home>
  )
})
