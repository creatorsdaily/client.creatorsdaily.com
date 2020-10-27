import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import { VIEWER } from '../queries'

const useViewer = ({ ...rest }) => {
  const { data, loading } = useQuery(VIEWER, {
    errorPolicy: 'ignore',
    ...rest
  })
  return {
    loading,
    viewer: get(data, 'viewer', null)
  }
}
export default useViewer
