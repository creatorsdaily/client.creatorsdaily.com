import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import useViewer from './useViewer'

const useAuth = ({ ...rest }) => {
  const { viewer, loading } = useViewer({
    ...rest
  })
  const { asPath } = useRouter()
  useEffect(() => {
    if (!viewer) {
      Router.replace(`/auth/signin?back=${encodeURIComponent(asPath)}`)
    }
  }, [loading])
  return { viewer, loading }
}

export default useAuth
