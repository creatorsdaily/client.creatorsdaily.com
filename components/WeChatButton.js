import styled from 'styled-components'
import { Button, Modal, Tooltip } from 'antd'

const WeChatQRCode = styled.img`
  width: 100%;
`

const SmallButton = styled(Button)`
  font-size: 12px;
  color: #6C6C6C;
`

const WeChatButton = ({ tooltip, children, ...rest }) => {
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
  const button = (
    <SmallButton size='small' type='link' onClick={handleWeChat} {...rest}>
      {children}
    </SmallButton>
  )
  if (!tooltip) {
    return button
  }
  return (
    <Tooltip placement='bottom' title={tooltip}>
      {button}
    </Tooltip>
  )
}
export default WeChatButton
