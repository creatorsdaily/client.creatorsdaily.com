import { useState } from 'react'
import base64url from 'base64url'
import * as url from 'native-url'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Form, Popover, Spin, message } from 'antd'
import noop from 'lodash/noop'
import useDebounce from 'react-use/lib/useDebounce'
import DownOutlined from '@ant-design/icons/DownOutlined'
import Box from './Box'

const { Item } = Form

const Container = styled(Box)`
position: fixed;
right: 24px;
height: 400px;
width: 300px;
top: 88px;
z-index: 9;
height: ${({ closed }) => closed ? 42 : 415}px;
transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
display: flex;
flex-direction: column;
.ant-spin-nested-loading, .ant-spin-container {
  height: 100%;
}
`

const Title = styled(Button)`
border: 0;
height: 40px;
box-shadow: none;
position: relative;
i.anticon.anticon-down {
  margin-top: 2px;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: rotate(${({ closed }) => closed === 'true' ? 180 : 0}deg);
}
`

const Content = styled.div`
position: absolute;
overflow: hidden;
top: 40px;
bottom: 0;
width: 100%;
display: flex;
flex-direction: column;
`

const ContentBox = styled.div`
flex: 1;
padding: 16px;
display: flex;
align-items: center;
`

const Footer = styled.div`
text-align: center;
font-size: 12px;
height: 30px;
line-height: 30px;
font-weight: bold;
color: #D0D0D0;
`

const StyledForm = styled(Form)`
display: block;
flex: 1;
`

const IconButton = styled(Button)`
padding: 0;
height: 80px;
margin: 0 auto;
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`

const DescriptionButton = styled(Button)`
white-space: initial;
height: 46px;
overflow: hidden;
text-align: left;
`

const ContentButton = styled(Button)`
white-space: initial;
overflow: hidden;
text-align: left;
height: 106px;
white-space: pre-line;
`

const Images = styled.div`
margin: 0 -4px -8px;
`

const ImageIcon = styled(Button)`
padding: 0;
height: 60px;
width: 60px;
margin: 0 4px 8px;
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`

const urlRank = x => {
  const { host } = url.parse(x)
  switch (host) {
    case 'apps.apple.com':
      return 99
    case 'itunes.apple.com':
      return 98
    case 'play.google.com':
      return 89
    default:
      return 1
  }
}

let lastKey = 0

const Autofill = ({ links = [], onSet = noop, step, onData = noop }) => {
  const [iconLoading, setIconLoading] = useState(false)
  const [mediaLoading, setMediaLoading] = useState(false)
  const [closed, setClosed] = useState(true)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState()
  const link = links
    .filter(x => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,7}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(x))
    .sort((a, b) => urlRank(b) - urlRank(a))[0]
  useDebounce(() => {
    if (!link) return
    const key = base64url(link)
    setLoading(true)
    lastKey += 1;
    ((currentKey) => {
      axios.get(`https://json.xyz/${key}`).then(({ data }) => {
        if (currentKey !== lastKey) return
        setLoading(false)
        setClosed(false)
        setInfo(data)
        onData(data)
      }).catch(() => {
        if (currentKey !== lastKey) return
        setLoading(false)
        setClosed(true)
      })
    })(lastKey)
  }, 800, [link])
  if ((!info && !loading) || step === 'all') return null
  const handleSetName = () => onSet('name', info.title)
  const handleSetIcon = async () => {
    setIconLoading(true)
    await onSet('icon', info.icon)
    setIconLoading(false)
  }
  const handleSetMedia = async i => {
    setMediaLoading(true)
    try {
      await onSet('media', info.images[i])
    } catch (err) {
      message.error(err.message)
    }
    setMediaLoading(false)
  }
  const handleSetDescription = () => onSet('description', info.description)
  const handleSetContent = () => onSet('content', info.content)
  const renderStep1 = () => {
    if (step !== 1) return null
    return (
      <Item label='名称' colon={false}>
        <div>
          <Button block onClick={handleSetName}>{info.title}</Button>
        </div>
      </Item>
    )
  }
  const renderStep2 = () => {
    if (step !== 2) return null
    return (
      <>
        {!!info.icon && (
          <Item label='图标' colon={false}>
            <IconButton loading={iconLoading} block onClick={handleSetIcon}>
              <img src={info.icon} />
            </IconButton>
          </Item>
        )}
        <Item label='简介' colon={false}>
          <DescriptionButton block onClick={handleSetDescription}>{info.description}</DescriptionButton>
        </Item>
      </>
    )
  }
  const renderStep3 = () => {
    if (step !== 3) return null
    return (
      <>
        {
          !!(info.images || []).length && (
            <Item label='产品图片' colon={false}>
              <Spin spinning={mediaLoading}>
                <Images>
                  {info.images.map((x, i) => (
                    <Popover placement='leftTop' content={(<img src={x} style={{ maxHeight: 400 }} />)} key={x}>
                      <ImageIcon block onClick={() => handleSetMedia(i)}>
                        <img src={x} />
                      </ImageIcon>
                    </Popover>
                  ))}
                </Images>
              </Spin>
            </Item>
          )
        }
        <Item label='产品详情' colon={false}>
          <ContentButton block onClick={handleSetContent}>{info.content}</ContentButton>
        </Item>
      </>
    )
  }
  const renderContent = () => {
    if (!info) return null
    return (
      <Content>
        <ContentBox>
          <StyledForm layout='vertical'>
            {renderStep1()}
            {renderStep2()}
            {renderStep3()}
          </StyledForm>
        </ContentBox>
        <Footer>点击内容自动填充</Footer>
      </Content>
    )
  }
  return (
    <Container closed={closed}>
      <Spin spinning={loading}>
        <Title block icon={<DownOutlined />} closed={closed.toString()} onClick={() => setClosed(!closed)}>产品发布小助手</Title>
        {renderContent()}
      </Spin>
    </Container>
  )
}
export default Autofill
