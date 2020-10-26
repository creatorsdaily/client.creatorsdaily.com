import { Input } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const StyledSearch = styled(Input.Search)`
max-width: 300px;
`

const Search = ({ path = '/', ...rest }) => {
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
  return (
    <>
      <label htmlFor='search' style={{ width: 0, height: 0, overflow: 'hidden' }}>搜索</label>
      <StyledSearch
        id='search'
        placeholder='搜索你关心的'
        {...rest}
        value={keywordValue}
        onChange={({ currentTarget }) => {
          setKeywordValue(currentTarget.value)
        }}
        onSearch={value => {
          const url = value ? `${path}?keyword=${value}` : path
          replace(url, url, { shallow: true })
        }}
      />
    </>
  )
}

export default Search
