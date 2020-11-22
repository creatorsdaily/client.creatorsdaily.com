import styled from 'styled-components'
import { Modal } from 'antd'
import IPFSImage from './IPFSImage'
import Box from './Box'

const StyledIPFSImage = styled(IPFSImage)`
width: 80px;
height: 80px;
object-fit: contain;
margin-right: 12px;
`

const Container = styled(Box)`
padding: 12px;
display: flex;
align-items: center;
cursor: pointer;
margin-bottom: 24px;
`

const Content = styled.div`
div {
  margin-top: 8px;
  font-size: 12px;
}
`

const MiniProgram = ({ hash, ...rest }) => {
  const handleClick = () => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 500,
      content: (
        <IPFSImage hash={hash} />
      )
    })
  }
  return (
    <Container {...rest} onClick={handleClick}>
      <StyledIPFSImage hash={hash} />
      <Content>
        <strong>微信「扫一扫」体验小程序</strong>
        <div>点击可以放大</div>
      </Content>
    </Container>
  )
}
export default MiniProgram
