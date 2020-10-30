import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import Viewer from '../queries/Viewer.gql'

const useViewer = ({ ...rest }) => {
  const { data, loading } = useQuery(Viewer, {
    errorPolicy: 'ignore',
    ...rest
  })
  return {
    loading,
    viewer: get(data, 'viewer', null)
  }
}
export default useViewer
