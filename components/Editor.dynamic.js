
import { Spin } from 'antd'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const getHeight = type => ({ mini: 32, large: 76 }[type] || 56)

const LoadingPlaceholder = styled.div`
  min-height: ${({ type }) => getHeight(type)}px;
  border-radius: 4px;
  border: 1px solid #E8E8E8 !important;
`

export default dynamic(() => import('./Editor'), {
  ssr: false,
  loading: () => (
    <Spin>
      <LoadingPlaceholder />
    </Spin>
  )
})

export const Mini = dynamic(() => import('./Editor'), {
  ssr: false,
  loading: () => (
    <Spin>
      <LoadingPlaceholder type='mini' />
    </Spin>
  )
})

export const Large = dynamic(() => import('./Editor'), {
  ssr: false,
  loading: () => (
    <Spin>
      <LoadingPlaceholder type='large' />
    </Spin>
  )
})
