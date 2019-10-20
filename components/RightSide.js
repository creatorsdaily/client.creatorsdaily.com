import { Affix, Button, Divider, Modal } from 'antd'
import styled from 'styled-components'
import noop from 'lodash/noop'
import Box from './Box'
import WeChatOfficialAccount from './WeChatOfficialAccount'

const StyledBox = styled(Box)`
padding: 16px;
img {
  max-width: 100%;
}
`

const SmallButton = styled(Button)`
  font-size: 12px;
  color: #6C6C6C;
`

const Title = styled.h3`
  font-size: 14px;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

const WeChatQRCode = styled.img`
  width: 100%;
`

export default ({ onQuestion = noop, onProduct = noop }) => {
  const handleWeChat = () => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 500,
      content: (
        <WeChatQRCode src='/wechat.jpg' />
      )
    })
  }
  return (
    <Affix offsetTop={24}>
      <StyledBox>
        <Title>微信公众号</Title>
        <WeChatOfficialAccount title='微信关注：一群创造者' />
      </StyledBox>
      <Buttons>
        <div>
          <SmallButton size='small' type='link' onClick={handleWeChat}>
          微信
          </SmallButton>
          <Divider type='vertical' />
          <a href='https://t.me/creatorsdaily' target='_blank'>
            <SmallButton size='small' type='link'>
            Telegram
            </SmallButton>
          </a>
        </div>
      </Buttons>
    </Affix>
  )
}
