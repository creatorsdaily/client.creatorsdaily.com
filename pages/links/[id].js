import React, { useEffect } from 'react'
import { Alert } from 'antd'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import Page from '../../layouts/Page'
import { GET_LINK } from '../../queries'

const Container = styled.div`
  width: 500px;
  margin: 200px auto 0;
`

export default () => {
  const { query: {
    id
  } } = useRouter()
  const { data } = useQuery(GET_LINK, {
    variables: {
      id
    }
  })
  const url = get(data, 'getLink.url', '/')
  useEffect(() => {
    const timer = setTimeout(() => {
      location.href = url
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  })
  return (
    <Page header={null}>
      <Container>
        <Alert
          message='请注意'
          description={`您即将离开天机前往 ${url}`}
          type='warning'
          showIcon
        />
      </Container>
    </Page>
  )
}
