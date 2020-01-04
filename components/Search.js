import { Input } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const StyledSearch = styled(Input.Search)`
max-width: 300px;
`

export default ({ ...rest }) => {
  const {
    query: {
      keyword
    },
    replace
  } = useRouter()
  const [keywordValue, setKeywordValue] = useState(keyword)
  useEffect(() => {
    setKeywordValue(keyword)
  }, [keyword])
  return (<StyledSearch
    placeholder='搜索你关心的产品'
    {...rest}
    value={keywordValue}
    onChange={({ currentTarget }) => {
      setKeywordValue(currentTarget.value)
    }}
    onSearch={value => {
      const url = value ? `/?keyword=${value}` : '/'
      replace(url, url, { shallow: true })
    }}
  />)
}
