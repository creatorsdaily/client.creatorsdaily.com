import React from 'react'
import styled from 'styled-components'
import Editor from '../layouts/Editor'
import withApollo from '../libs/with-apollo'
import Container from '../components/Container'
import PostEditor from '../components/PostEditor'

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`
export default withApollo(() => {
  return (
    <Editor>
      <StyledContainer>
        <PostEditor />
      </StyledContainer>
    </Editor>
  )
})
