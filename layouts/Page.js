import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

const { Content } = Layout

const StyledContent = styled(Content)`
  min-height: 556px;
`

export default React.memo(({
  header = (
    <Header />
  ),
  children,
  ...rest
}) => {
  return (
    <Layout>
      {header}
      <StyledContent {...rest}>
        {children}
      </StyledContent>
      <Footer />
    </Layout>
  )
})
