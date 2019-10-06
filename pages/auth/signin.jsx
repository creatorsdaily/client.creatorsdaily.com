import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Page from '../../layouts/Page'
import AuthBox from '../../components/AuthBox'
import SigninBox from '../../components/SigninBox'
import redirect from '../../libs/redirect'
import useViewer from '../../hooks/useViewer'

export default () => {
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
        <title>登录 | {process.env.NAME}</title>
      </Head>
      <AuthBox>
        <SigninBox back={back} />
      </AuthBox>
    </Page>
  )
}
