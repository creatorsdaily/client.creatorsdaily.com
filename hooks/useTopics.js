import qs from 'qs'
import { useRouter } from 'next/router'
import omit from 'lodash/omit'

export default ({
  key = 'topic',
  path
} = {}) => {
  const { query, pathname, replace } = useRouter()

  let { topic = [] } = query
  if (topic && !Array.isArray(topic)) {
    topic = [topic]
  }
  return [topic, (value, run) => {
    const str = qs.stringify({
      ...omit(query, ['page', 'size', 'id']),
      [key]: value
    }, { arrayFormat: 'repeat' })
    const url = `${path || pathname}${str && `?${str}`}`
    if (run) {
      replace(url, url, { shallow: true })
    }
    return url
  }]
}
