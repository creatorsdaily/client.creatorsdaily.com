import { Divider } from 'antd'
import styled from 'styled-components'
import media from '../libs/media'
import ProductLinks from './ProductLinks'
import ProductUsers from './ProductUsers'
import WeChatButton from './WeChatButton'
import MiniProgram from './MiniProgram'

const Container = styled.div`
padding: 0 16px;
${media.sm`
  padding: 0;
`}
`

const StyledWeChatButton = styled(WeChatButton)`
  margin: 0 auto 24px;
  display: block;
`

export default ({ name, isMiniProgram, miniProgramQRCode, links = [], discoverer, creators = [] }) => {
  const renderMiniProgram = () => {
    if (!isMiniProgram) return null
    return (
      <>
        <Divider orientation='left'>微信小程序</Divider>
        <MiniProgram hash={miniProgramQRCode && miniProgramQRCode.hash} />
      </>
    )
  }
  const renderWeChat = () => {
    if (!creators.length) {
      return (
        <StyledWeChatButton tooltip={`「${name}」暂无创造者，如果您是产品的创造者，请联系微信认领`}>
          认领产品
        </StyledWeChatButton>
      )
    }
  }

  return (
    <Container>
      <ProductLinks links={links} />
      {renderMiniProgram()}
      <ProductUsers discoverer={discoverer} creators={creators} />
      {renderWeChat()}
    </Container>
  )
}
