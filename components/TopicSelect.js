import { forwardRef, useState } from 'react'
import { Button, Select } from 'antd'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import styled from 'styled-components'
import noop from 'lodash/noop'
import useDebounce from 'react-use/lib/useDebounce'
import { GET_TOPICS } from '../queries'

const { Option } = Select

const CREATE_TOPIC = gql`
mutation($topic: ITopic!) {
  createTopic(topic: $topic) {
    id,
    name
  }
}
`

const TopicName = styled.span`
  font-weight: bold;
  padding: 0 5px;
`

export default forwardRef((props, ref) => {
  const { onCreate = noop, ...rest } = props
  const [topic, setTopic] = useState()
  const { data, loading, refetch } = useQuery(GET_TOPICS)
  const [createTopic] = useMutation(CREATE_TOPIC, {
    variables: {
      topic: {
        name: topic
      }
    },
    refetchQueries: [{
      query: GET_TOPICS
    }, {
      query: GET_TOPICS,
      variables: {
        keyword: [topic].filter(x => !!x)
      }
    }, {
      query: GET_TOPICS,
      variables: {
        size: 1000
      }
    }],
    onCompleted ({ createTopic }) {
      onCreate(createTopic)
    },
    awaitRefetchQueries: true
  })
  useDebounce(() => refetch({
    keyword: [topic].filter(x => !!x)
  }), 800, [topic])
  const topics = get(data, 'getTopics.data', [])
  const renderButton = () => {
    if (!topic) return null
    return (
      <Button
        icon='plus'
        type='link'
        block
        onMouseDown={() => createTopic()}
      >添加<TopicName>#{topic}</TopicName>话题</Button>
    )
  }
  return (
    <Select
      showSearch
      mode='multiple'
      placeholder='选择所属话题'
      ref={ref}
      loading={loading}
      onSearch={setTopic}
      filterOption={(v, { props: { children: name } }) => name.includes(v)}
      dropdownRender={menu => (
        <div>
          {menu}
          {renderButton()}
        </div>
      )}
      {...rest}
    >
      {topics.map(({ id, name }) => (<Option key={id}>{name}</Option>))}
    </Select>
  )
})
