import React, { useState } from 'react'
import { Button, Col, Empty, Row, Spin, message } from 'antd'
import get from 'lodash/get'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Timeline from '../../layouts/Timeline'
import Container from '../../components/Container'
import media from '../../libs/media'
import withApollo from '../../libs/with-apollo'
import MobileAuthBar from '../../components/MobileAuthBar'
import ActiveListQuery from '../../queries/ActiveList.gql'
import ActiveList from '../../components/ActiveList'
import { Large } from '../../components/Editor.dynamic'
import MoreButton from '../../components/MoreButton'
import CreateComment from '../../queries/mutations/CreateComment.gql'
import FormError from '../../libs/form-error'
import useAuth from '../../hooks/useAuth'

const EditorBox = styled.div`
margin-bottom: 24px;
`
const EditorToolbar = styled.div`
margin-top: 12px;
display: flex;
justify-content: space-between;
align-items: center;
`
const PublishButton = styled(Button)`
padding: 4px 23px;
`
export default withApollo(({ type = 'follow' }) => {
  const size = 30
  const [content, setContent] = useState('')
  const [page, setPage] = useState(1)
  const [create] = useMutation(CreateComment, {
    onCompleted: data => {
      message.success('提交成功')
      setContent('')
    },
    onError: error => {
      const errors = FormError(null, error)
      message.error(errors[0].message)
    },
    // TODO: 订阅更新后不再需要刷新
    refetchQueries: () => [{
      query: ActiveListQuery,
      variables: {
        size
      }
    }]
  })
  const { data, loading, fetchMore } = useQuery(ActiveListQuery, {
    variables: {
      timeline: type,
      size
    },
    notifyOnNetworkStatusChange: true
  })
  const list = get(data, 'getActives.data', [])
  const total = get(data, 'getActives.total', 0)
  const handleFetchMore = () => {
    fetchMore({
      variables: {
        page: page + 1
      },
      updateQuery (prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev
        setPage(page + 1)
        return {
          ...prev,
          getActives: {
            ...prev.getActives,
            data: [
              ...prev.getActives.data,
              ...fetchMoreResult.getActives.data
            ]
          }
        }
      }
    })
  }
  const publish = () => {
    create({
      variables: {
        comment: {
          content
        }
      }
    })
  }
  const renderMore = () => {
    if (page * size >= total) return null
    return (
      <MoreButton size='small' type='link' block loading={loading} onClick={handleFetchMore}>加载更多</MoreButton>
    )
  }
  return (
    <Timeline>
      {/* <EditorBox>
        <Large value={content} onChange={setContent} placeholder='说点什么...' options={{ minHeight: '74px' }} />
        <EditorToolbar>
          <div style={{ fontSize: 12, color: '#666' }}>文明礼貌，友善发言</div>
          <PublishButton onClick={publish} type='primary' disabled={!content.length}>发布</PublishButton>
        </EditorToolbar>
      </EditorBox> */}
      <ActiveList list={list} loading={loading} />
      {renderMore()}
      <MobileAuthBar />
    </Timeline>
  )
})
