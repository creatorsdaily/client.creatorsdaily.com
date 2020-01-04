import { useRouter } from 'next/router'
import { Pagination } from 'antd'
import Link from 'next/link'
import { stringify } from 'qs'
import { useQuery } from '@apollo/react-hooks'
import noop from 'lodash/noop'

const defaultPageSize = 20

export default ({
  path,
  query,
  props = {},
  options = {},
  getTotal = () => 0
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
      ...rest,
      ...(options.variables || {})
    }
  })
  const total = getTotal(result)
  const itemRender = (current, type, originalElement) => {
    if (current === 0) return originalElement
    let query = stringify({
      ...rest,
      page: current === 1 ? undefined : current,
      size: size === defaultPageSize ? undefined : size
    })
    if (query) {
      query = '?' + query
    }
    return (
      <Link href={`${path}${query}`}>
        {originalElement}
      </Link>
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
        {...props}
      />
    )
  }
}
