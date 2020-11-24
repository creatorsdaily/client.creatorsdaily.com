import React from 'react'
import Home from '../../../layouts/Home'
import withApollo from '../../../libs/with-apollo'
import PostEditor from '../../../components/PostEditor'

export default withApollo(() => {
  return (
    <Home>
      <PostEditor />
    </Home>
  )
})
