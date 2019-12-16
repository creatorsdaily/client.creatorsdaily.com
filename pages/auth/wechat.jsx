import React, { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { v4 } from 'slugid'
import Page from '../../layouts/Page'
import AuthBox from '../../components/AuthBox'
import redirect from '../../libs/redirect'
import useViewer from '../../hooks/useViewer'
import withApollo from '../../libs/with-apollo'
import WechatBox from '../../components/WechatBox'

export default withApollo(() => {
  const [code, setCode] = useState(v4())
  useEffect(() => {
    const timer = setInterval(() => setCode(v4()), 2 * 60 * 1000)
    return () => clearInterval(timer)
  }, [])
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
        <title>微信登录 - {process.env.NAME}</title>
      </Head>
      <AuthBox>
        <WechatBox code={code} back={back} />
      </AuthBox>
    </Page>
  )
})
