import React from 'react'
import styled from 'styled-components'
import { Button, Col, Input, Row } from 'antd'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Editor from '../layouts/Editor'
import withApollo from '../libs/with-apollo'
import useCheckMobile from '../hooks/useCheckMobile'
import Container from '../components/Container'
import EditorDynamic from '../components/Editor.dynamic'
import SmallTitle from '../components/SmallTitle'

const StyledContainer = styled(Container)`
margin-top: 24px;
margin-bottom: 24px;
`
const StyledEditor = styled(EditorDynamic)`
font-size: 16px;
.CodeMirror.CodeMirror-wrap {
  padding: 12px;
  font-family: Monospace;
  border-radius: 2px;
}
`
const TitleInput = styled(Input)`
margin-bottom: 24px;
box-shadow: none !important;
padding-left: 17px;
padding-right: 17px;
`
const Title = styled.h3`
font-size: 14px;
`
export default withApollo(() => {
  useCheckMobile()
  return (
    <Editor>
      <StyledContainer>
        <Row gutter={24}>
          <Col span={16}>
            <TitleInput size='large' placeholder='文章标题' />
            <StyledEditor placeholder='请输入文章正文...' options={{ minHeight: '480px' }} />
          </Col>
          <Col span={8}>
            <Button icon={<PlusOutlined />} size='large' type='dashed' block>添加关联产品</Button>
          </Col>
        </Row>
      </StyledContainer>
    </Editor>
  )
})
