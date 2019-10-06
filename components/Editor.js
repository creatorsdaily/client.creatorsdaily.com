import { Spin } from 'antd'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const LoadingPlaceholder = styled.div`
  min-height: ${({ type }) => type === 'mini' ? 32 : 56}px;
  border-radius: 4px;
  border: 1px solid #E8E8E8 !important;
`

export default dynamic(() => import('./Editor.dynamic'), {
  ssr: false,
  loading: () => (
    <Spin>
      <LoadingPlaceholder />
    </Spin>
  )
})

export const Mini = dynamic(() => import('./Editor.dynamic'), {
  ssr: false,
  loading: () => (
    <Spin>
      <LoadingPlaceholder type='mini' />
    </Spin>
  )
})
