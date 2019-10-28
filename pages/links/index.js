import React from 'react'
import Head from 'next/head'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Page from '../../layouts/Page'
import Container from '../../components/Container'
import RightSide from '../../components/RightSide'
import { GET_LINKS } from '../../queries'
import Box from '../../components/Box'
import IPFSImage from '../../components/IPFSImage'

const StyledContainer = styled(Container)`
margin: 24px auto;
`

const LinkTitle = styled.div`
line-height: 30px;
height: 30px;
text-align: center;
color: #333;
margin-bottom: 16px;
`

const StyledIPFSImage = styled(IPFSImage)`
  width: 100px;
  height: 100px;
  margin: 16px auto;
  display: block;
`

export default () => {
  const { data } = useQuery(GET_LINKS)
  const links = get(data, 'getLinks.data', [])
  return (
    <Page>
      <Head>
        <title>友情链接 - {process.env.NAME}</title>
      </Head>
      <StyledContainer>
        <Row gutter={24}>
          <Col lg={18} md={17} xs={24}>
            <Row gutter={24}>
              {links.map(x => (
                <Col key={x.id} lg={6} md={8} sm={8} xs={24}>
                  <a target='_blank' href={x.url} alt={x.name} >
                    <Box>
                      <StyledIPFSImage hash={x.media && x.media.hash} />
                      <LinkTitle>
                        {x.name}
                      </LinkTitle>
                    </Box>
                  </a>
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={6} md={7} xs={24}>
            <RightSide />
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  )
}
