import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import setCookie from '../../libs/setCookie'
import redirect from '../../libs/redirect'

export default () => {
  const { query } = useRouter()
  const client = useApolloClient()
  const back = query.back || '/'
  useEffect(() => {
    setCookie(null, 'token', '', {
      maxage: 0,
      path: '/'
    })
    // await apolloClient.cache.reset()
    client.resetStore().then(() => {
      redirect(back)
    })
  }, [])
  return null
}
