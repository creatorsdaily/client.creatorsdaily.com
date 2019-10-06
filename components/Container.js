import React from 'react'
import styled from 'styled-components'
import media from '../libs/media'

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  box-sizing: border-box;
  padding-left: ${props => props.padding ? 20 : 0}px;
  padding-right: ${props => props.padding ? 20 : 0}px;
  ${media.sm`
    max-width: 540px;
  `}
  ${media.md`
    max-width: 720px;
  `}
  ${media.lg`
    max-width: 960px;
  `}
  ${media.xl`
    max-width: 1152px;
  `}
  ${media.xxl`
    max-width: 1344px;
  `}
`

export default React.memo(({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
))
