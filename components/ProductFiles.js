import { Carousel, Modal } from 'antd'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import noop from 'lodash/noop'
import { GET_MEDIAS } from '../queries'
import IPFSImage from './IPFSImage'

const StyledCarousel = styled(Carousel)`
  .slick-slide {
    text-align: center;
    height: ${({ height }) => height}px;
    background: #F5F5F5;
    overflow: hidden;
  }
  .slick-slide h3 {
    color: #fff;
  }
`

const FileContainer = styled.div`
  height: ${({ height }) => height}px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const StyledIPFSImage = styled(IPFSImage)`
  background: #F5F5F5;
`

const PreviewIPFSImage = styled(IPFSImage)`
  width: 100%;
`

const ProductFiles = ({ children, height = 300, medias = [], onLoad = noop, ...rest }) => {
  const { data, loading, refetch } = useQuery(GET_MEDIAS, {
    variables: { ids: medias.map(x => x.id) },
    skip: !medias.length || !medias.some(x => !x.hash),
    onCompleted (res) {
      onLoad(get(res, 'getMedias.data', medias))
    }
  })

  if ((!medias || !medias.length) && !children) {
    return (
      <StyledIPFSImage style={{ height }} />
    )
  }
  const handleClick = (hash) => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 500,
      content: (
        <PreviewIPFSImage hash={hash} />
      )
    })
  }
  const list = get(data, 'getMedias.data', medias)
  return (
    <StyledCarousel autoplay height={height} effect='fade' {...rest}>
      {list.map(x => (
        <FileContainer key={x.id} height={height}>
          <IPFSImage hash={x.hash} onClick={() => handleClick(x.hash)} />
        </FileContainer>
      ))}
      {children}
    </StyledCarousel>
  )
}

export default ProductFiles
