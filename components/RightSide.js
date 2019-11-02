import { Affix, Button, Divider, Modal, Tooltip } from 'antd'
import styled from 'styled-components'
import noop from 'lodash/noop'
import Box from './Box'
import WeChatOfficialAccount from './WeChatOfficialAccount'
import ZSXQ from './ZSXQ'
import WeChatButton from './WeChatButton'

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
  const handleZSXQ = () => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 500,
      content: (
        <ZSXQ title='知识星球' hideTitle />
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
          <WeChatButton tooltip='加好友邀请入群'>微信</WeChatButton>
          <Divider type='vertical' />
          <a href='https://t.me/creatorsdaily' rel='noreferrer' target='_blank'>
            <SmallButton size='small' type='link'>
            Telegram
            </SmallButton>
          </a>
          <Divider type='vertical' />
          <Tooltip placement='top' title='加入我的星球'>
            <SmallButton size='small' type='link' onClick={handleZSXQ}>
            知识星球
            </SmallButton>
          </Tooltip>
        </div>
      </Buttons>
    </Affix>
  )
}
