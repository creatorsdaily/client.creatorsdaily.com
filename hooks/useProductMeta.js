import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { GET_MEDIA, GET_TOPICS } from '../queries'

export default ({ icon, topics = [] }) => {
  icon = icon || {}
  const { data } = useQuery(GET_MEDIA, {
    variables: { id: icon.id },
    skip: icon.hash || !icon.id
  })
  const { data: topicsData } = useQuery(GET_TOPICS, {
    variables: {
      size: 100
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
