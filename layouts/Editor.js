import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import Header from '../components/Header'

const { Content } = Layout

const StyledContent = styled(Content)`
height: 100%;
`
const StyledLayout = styled(Layout)`
height: 100%;
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
      <StyledContent {...rest}>
        {children}
      </StyledContent>
    </StyledLayout>
  )
})
