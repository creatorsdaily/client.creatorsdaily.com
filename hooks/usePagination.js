import { useRouter } from 'next/router'
import { Pagination } from 'antd'
import Link from 'next/link'
import { stringify } from 'qs'
import { useQuery } from '@apollo/react-hooks'
import noop from 'lodash/noop'

const defaultPageSize = 20

const ItemLink = ({ disabled, children, ...rest }) => {
  return (
    <Link {...rest}>{children}</Link>
  )
}

export default ({
  path,
  query,
  props = {},
  options = {},
  getTotal = () => 0,
  getLink = (path, queryString) => ({
    href: `${path}${queryString}`
  }),
  getQuery = query => query
} = {}) => {
  let {
    query: {
      page = 1,
      size = defaultPageSize,
      ...rest
    }
  } = useRouter()
  page = Number(page)
  size = Number(size)
  const result = useQuery(query, {
    ...options,
    variables: {
      page,
      size,
      ...getQuery(rest),
      ...(options.variables || {})
    }
  })
  const total = getTotal(result)
  const itemRender = (current, type, originalElement) => {
    if (current === 0) return originalElement
    const query = {
      ...getQuery(rest),
      page: current === 1 ? undefined : current,
      size: size === defaultPageSize ? undefined : size
    }
    let queryStr = stringify(query)
    if (queryStr) {
      queryStr = '?' + queryStr
    }
    return (
      <ItemLink {...getLink(path, queryStr, query)} passHref>
        {originalElement}
      </ItemLink>
    )
  }
  return {
    page,
    size,
    result,
    pagination: (
      <Pagination
        size='small'
        hideOnSinglePage
        current={page}
        onChange={noop}
        total={total}
        pageSize={size}
        itemRender={itemRender}
        showSizeChanger={false}
        {...props}
      />
    )
  }
}
