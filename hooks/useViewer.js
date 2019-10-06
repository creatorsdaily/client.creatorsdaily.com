import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { VIEWER } from '../queries'

export default () => {
  const { data, loading } = useQuery(VIEWER, {
    errorPolicy: 'ignore'
  })
  return {
    loading,
    viewer: get(data, 'viewer', null)
  }
}
