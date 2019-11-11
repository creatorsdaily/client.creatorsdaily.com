import React from 'react'
import { useRouter } from 'next/router'
import qs from 'qs'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import { TopicsBar } from '../../components/Topics'
import withApollo from '../../libs/with-apollo'

export default withApollo(() => {
  const router = useRouter()
  let { id = [] } = router.query
  if (id && !Array.isArray(id)) {
    id = [id]
  }
  const replace = query => {
    const str = qs.stringify({
      id,
      ...query
    }, { arrayFormat: 'repeat' })
    const url = `/topics${str && `?${str}`}`
    router.replace(url, url, { shallow: true })
  }
  const handleChange = value => {
    replace({
      id: value
    })
  }
  return (
    <Page>
      <Container>
        <TopicsBar value={id} onChange={handleChange} />
      </Container>
    </Page>
  )
})
