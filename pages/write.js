import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import Editor from '../layouts/Editor'
import withApollo from '../libs/with-apollo'
import Container from '../components/Container'
import PostEditor from '../components/PostEditor'
import useCheckMobile from '../hooks/useCheckMobile'
import CreatePost from '../queries/mutations/CreatePost.gql'
import message from '../libs/message.dynamic'

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`
export default withApollo(() => {
  useCheckMobile()
  const { replace } = useRouter()
  const [create] = useMutation(CreatePost, {
    onCompleted: data => {
      const id = get(data, 'createPost.id')
      message.success('发布成功！')
      replace(`/posts/${id}`)
    }
  })
  const handleSubmit = variables => create({ variables })
  return (
    <Editor>
      <StyledContainer>
        <PostEditor onSubmit={handleSubmit} />
      </StyledContainer>
    </Editor>
  )
})
