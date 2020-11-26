import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Page from '../../layouts/Page'
import AuthBox from '../../components/AuthBox'
import MobileBox from '../../components/MobileBox'
import withApollo from '../../libs/with-apollo'

export default withApollo(() => {
  const { query } = useRouter()
  const back = query.back || '/'
  return (
    <Page header={null}>
      <Head>
        <title>登录或注册 - {process.env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <AuthBox>
        <MobileBox back={back} />
      </AuthBox>
    </Page>
  )
})
