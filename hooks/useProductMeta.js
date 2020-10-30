import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import { GET_MEDIA } from '../queries'
import TopicListQuery from '../queries/TopicList.gql'

const useProductMeta = ({ icon, topics = [] }) => {
  icon = icon || {}
  const { data } = useQuery(GET_MEDIA, {
    variables: { id: icon.id },
    skip: icon.hash || !icon.id
  })
  const { data: topicsData } = useQuery(TopicListQuery, {
    variables: {
      size: 1000
    },
    skip: !topics.length || topics.some(x => x.name)
  })
  const hash = get(data, 'getMedia.hash', icon && icon.hash)
  const allTopics = get(topicsData, 'getTopics.data', [])
  return {
    hash,
    topics: topics.map(x => ({
      ...x,
      name: x.name || (allTopics.find(t => t.id === x.id) || {}).name
    }))
  }
}
export default useProductMeta
