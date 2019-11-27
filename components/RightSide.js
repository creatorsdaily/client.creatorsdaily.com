import { Affix, Button, Modal, Tooltip } from 'antd'
import styled from 'styled-components'
import noop from 'lodash/noop'
import Box from './Box'
import WeChatOfficialAccount from './WeChatOfficialAccount'
import ZSXQ from './ZSXQ'
import WeChatButton from './WeChatButton'
import CoreUsers from './CoreUsers'
import SmallTitle from './SmallTitle'

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

export default ({ onQuestion = noop, onProduct = noop }) => {
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
    <>
      <SmallTitle>核心用户</SmallTitle>
      <CoreUsers />
      <Affix offsetTop={24}>
        <StyledBox>
          <Title>微信公众号</Title>
          <WeChatOfficialAccount title='微信关注：一群创造者' />
        </StyledBox>
        <Buttons>
          <div>
            <WeChatButton tooltip='加好友邀请入群'>微信</WeChatButton>
            <a href='https://t.me/creatorsdaily' rel='noreferrer' target='_blank'>
              <SmallButton size='small' type='link'>
              Telegram
              </SmallButton>
            </a>
            <Tooltip placement='top' title='加入我的星球'>
              <SmallButton size='small' type='link' onClick={handleZSXQ}>
              知识星球
              </SmallButton>
            </Tooltip>
            <a href='https://kz.sync163.com/web/topic/vqNzr253b46Yk?uid=ZNlYrg5BAReny' rel='noreferrer' target='_blank'>
              <Tooltip placement='top' title='在快知订阅最新产品通知'>
                <SmallButton size='small' type='link'>
                  快知
                </SmallButton>
              </Tooltip>
            </a>
          </div>
        </Buttons>
      </Affix>
    </>
  )
}
