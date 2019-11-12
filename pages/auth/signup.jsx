import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Page from '../../layouts/Page'
import AuthBox from '../../components/AuthBox'
import SignupBox from '../../components/SignupBox'
import redirect from '../../libs/redirect'
import useViewer from '../../hooks/useViewer'
import withApollo from '../../libs/with-apollo'

export default withApollo(() => {
  const { query } = useRouter()
  const back = query.back || '/'
  const { viewer, loading } = useViewer()
  useEffect(() => {
    if (viewer) {
      redirect(back)
    }
  }, [loading])
  return (
    <Page header={null}>
      <Head>
        <title>注册 - {process.env.NAME}</title>
      </Head>
      <AuthBox>
        <SignupBox back={back} />
      </AuthBox>
    </Page>
  )
})
