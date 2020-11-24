import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import Header from '../components/Header'

const { Content } = Layout

const StyledLayout = styled(Layout)`
min-height: 100%;
`

export default React.memo(({
  header = (
    <Header />
  ),
  children,
  ...rest
}) => {
  return (
    <StyledLayout>
      {header}
      <Content {...rest}>
        {children}
      </Content>
    </StyledLayout>
  )
})
