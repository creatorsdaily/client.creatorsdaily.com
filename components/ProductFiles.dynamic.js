import { Spin } from 'antd'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const LoadingPlaceholder = styled.div`
min-height: 56px;
`

export default dynamic(() => import('./ProductFiles'), {
  ssr: true,
  loading: () => (
    <Spin>
      <LoadingPlaceholder />
    </Spin>
  )
})
