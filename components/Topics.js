import { Tag } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery } from '@apollo/client'
import noop from 'lodash/noop'
import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import HomeFilled from '@ant-design/icons/HomeFilled'
import TopicListQuery from '../queries/TopicList.gql'
import useTopics from '../hooks/useTopics'
import { blue } from '../libs/colors'
import IPFSImage from './IPFSImage'

const TopicImage = styled(IPFSImage)`
  transform: scale(0.75);
  width: 40px;
  height: 40px;
  margin-top: -5px;
  margin-left: -5px;
`

const TopicIcon = styled.div`
  width: 30px;
  height: 30px;
  background: #F5F5F5;
  border-radius: 3px;
  overflow: hidden;
  margin-right: 8px;
  font-size: 18px;
  text-align: center;
`

const { CheckableTag } = Tag

const TopicsContainer = styled.div`
  margin: 12px 0;
  height: 24px;
  overflow: hidden;
`

const TopicsInline = styled.div`
display: inline;
.ant-tag-checkable:active, .ant-tag-checkable-checked {
  a {
    color: #FFF;
  }
}
`

const TopicTitle = styled.h6`
  margin-right: 5px;
  display: inline;
`

const TopicGroup = styled.div`
  margin: 0 0 24px;
`

export const TopicItem = styled.div`
  list-style: none;
  margin-bottom: 4px;
  a {
    display: flex;
    font-size: 12px;
    height: 40px;
    line-height: 30px;
    font-weight: bold;
    border: 1px solid rgba(0, 0, 0, ${({ active }) => active ? 0.1 : 0});
    border-radius: 3px;
    padding: 4px;
    background: ${({ active }) => active ? '#FFF' : 'none'};
    color: #595959;
    :hover {
      color: #262626;
    }
  }
`

const Topics = ({
  list = [],
  multiple = false,
  checkable = false,
  disabled = false,
  href,
  key
}) => {
  const [value, replace] = useTopics({
    key,
    path: href
  })
  const TagComponent = checkable ? CheckableTag : Tag
  const getValues = (t, checked) => {
    if (!multiple) return checked ? [t] : []
    return checked ? [...value, t] : value.filter(x => x !== t)
  }
  const handleCheck = (t, checked, run) => {
    return replace(getValues(t, checked, run))
  }
  const renderItem = ({ id: key, name }) => {
    const checked = value.includes(key)
    return (
      <TagComponent
        key={key}
        checked={checked}
        onChange={href ? noop : checked => handleCheck(key, checked, true)}
      >
        {(href && !disabled) ? (
          <Link key={key} href={handleCheck(key, !checked)}>
            <a>{name}</a>
          </Link>
        ) : name}
      </TagComponent>
    )
  }
  return (
    <TopicsInline>
      {list.map(renderItem)}
    </TopicsInline>
  )
}

export const TopicsBar = ({ list, disabled = false, checkable = false, hideTitle = false, ...rest }) => {
  const { data: topicsData } = useQuery(TopicListQuery, {
    variables: {
      size: 50
    }
  })
  const renderTitle = () => {
    if (hideTitle) return null
    return (
      <TopicTitle>话题：</TopicTitle>
    )
  }
  return (
    <TopicsContainer {...rest}>
      {renderTitle()}
      <Topics disabled={disabled} checkable={checkable} list={list || get(topicsData, 'getTopics.data', [])} {...rest} />
    </TopicsContainer>
  )
}

export const TopicList = ({
  multiple = false,
  href,
  key
}) => {
  const { data: topicsData } = useQuery(TopicListQuery, {
    variables: {
      size: 50
    }
  })
  const [value, replace] = useTopics({
    key,
    path: href
  })
  const list = get(topicsData, 'getTopics.data', [])
  const getValues = (t, checked) => {
    if (!multiple) return checked ? [t] : []
    return checked ? [...value, t] : value.filter(x => x !== t)
  }
  const handleCheck = (t, checked, run) => {
    return replace(getValues(t, checked, run))
  }
  const renderItem = ({ id: key, icon, name }) => {
    const checked = value.includes(key)
    return (
      <TopicItem
        key={key}
        active={checked}
        onChange={href ? noop : checked => handleCheck(key, checked, true)}
      >
        {href ? (
          <Link href={handleCheck(key, !checked)}>
            <a>
              <TopicIcon>
                <LazyLoad height={30} throttle={200} once>
                  <TopicImage alt={name} hash={icon && `${icon.hash}-60-60`} size='small' />
                </LazyLoad>
              </TopicIcon>
              {name}
            </a>
          </Link>
        ) : name}
      </TopicItem>
    )
  }
  return (
    <TopicGroup>
      <TopicItem active={!value.length}>
        <Link href={href}>
          <a>
            <TopicIcon>
              <HomeFilled style={{ color: blue }} />
            </TopicIcon>
            全部
          </a>
        </Link>
      </TopicItem>
      {list.map(renderItem)}
    </TopicGroup>
  )
}

export default Topics
