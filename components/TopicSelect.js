import { forwardRef, useState } from 'react'
import { Button, Select } from 'antd'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import get from 'lodash/get'
import styled from 'styled-components'
import noop from 'lodash/noop'
import uniqBy from 'lodash/uniqBy'
import useDebounce from 'react-use/lib/useDebounce'
import { PlusOutlined } from '@ant-design/icons'
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
  const { data, loading } = useQuery(GET_TOPICS, {
    variables: {
      size: 1000
    }
  })
  const [search, { data: searchData, loading: searchLoading }] = useLazyQuery(GET_TOPICS)
  const [createTopic] = useMutation(CREATE_TOPIC, {
    variables: {
      topic: {
        name: topic
      }
    },
    refetchQueries: [{
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
  useDebounce(() => search({
    variables: {
      keyword: [topic].filter(x => !!x)
    }
  }), 800, [topic])
  const topics = uniqBy([].concat(
    get(searchData, 'getTopics.data', []),
    get(data, 'getTopics.data', [])
  ), 'id')
  const renderButton = () => {
    if (!topic) return null
    return (
      <Button
        icon={<PlusOutlined />}
        type='link'
        block
        onMouseDown={() => createTopic()}
      >添加<TopicName>#{topic}</TopicName>话题
      </Button>
    )
  }
  return (
    <Select
      showSearch
      mode='multiple'
      placeholder='选择所属话题'
      ref={ref}
      loading={loading || searchLoading}
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
