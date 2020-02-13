import { Divider } from 'antd'
import styled from 'styled-components'
import media from '../libs/media'
import ProductLinks from './ProductLinks'
import ProductUsers from './ProductUsers'
import MiniProgram from './MiniProgram'

const Container = styled.div`
padding: 0 16px;
${media.sm`
  padding: 0;
`}
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

  return (
    <Container>
      <ProductLinks links={links} />
      {renderMiniProgram()}
      <ProductUsers discoverer={discoverer} creators={creators} />
    </Container>
  )
}
