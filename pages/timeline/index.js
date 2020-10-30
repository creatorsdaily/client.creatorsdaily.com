import React, { useState } from 'react'
import { Button, Col, Empty, Row, Spin, message } from 'antd'
import get from 'lodash/get'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Page from '../../layouts/Page'
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

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`
const EditorBox = styled.div`
margin-bottom: 24px;
`
const EditorToolbar = styled.div`
margin-top: 12px;
display: flex;
justify-content: space-between;
align-items: center;
`
export default withApollo(() => {
  const size = 30
  const [content, setContent] = useState('')
  const [page, setPage] = useState(1)
  const { query: { type } } = useRouter()
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
    <Page>
      <StyledContainer>
        <Row type='flex' gutter={24}>
          <Col lg={12} md={15} xs={24}>
            <EditorBox>
              <Large value={content} onChange={setContent} placeholder='说点什么...' options={{ minHeight: '74px' }} />
              <EditorToolbar>
                <div style={{ fontSize: 12, color: '#666' }}>文明礼貌，友善发言</div>
                <Button onClick={publish} type='primary' disabled={!content.length}>发布</Button>
              </EditorToolbar>
            </EditorBox>
            <ActiveList list={list} loading={loading} />
            {renderMore()}
          </Col>
          <Col lg={6} md={8} xs={24} />
        </Row>
        <MobileAuthBar />
      </StyledContainer>
    </Page>
  )
})
