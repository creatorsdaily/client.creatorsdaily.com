import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { VIEWER } from '../queries'

export default ({ ...rest }) => {
  const { data, loading } = useQuery(VIEWER, {
    errorPolicy: 'ignore',
    ...rest
  })
  return {
    loading,
    viewer: get(data, 'viewer', null)
  }
}
