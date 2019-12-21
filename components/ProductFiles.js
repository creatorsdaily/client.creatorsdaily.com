import { Carousel, Modal } from 'antd'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import noop from 'lodash/noop'
import { GET_MEDIAS } from '../queries'
import IPFSImage from './IPFSImage'

const StyledCarousel = styled(Carousel)`
  height: ${({ height }) => height}px;
  overflow: hidden;
  .slick-slide {
    opacity: 0.5;
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .slick-slide.slick-active {
    opacity: 1;
  }
`

const FileContainer = styled.div`
  height: ${({ height }) => height}px;
  overflow: hidden;
  img {
    height: 100%;
    object-fit: cover;
    margin: 0 6px;
  }
`

const StyledIPFSImage = styled(IPFSImage)`
  background: #F5F5F5;
`

const PreviewIPFSImage = styled(IPFSImage)`
  max-width: 100%;
  margin: 0 auto;
`

const ProductFiles = React.forwardRef(({ children, height = 300, medias = [], onLoad = noop, ...rest }, ref) => {
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
      width: 1000,
      content: (
        <PreviewIPFSImage hash={hash} />
      )
    })
  }
  const list = get(data, 'getMedias.data', medias)
  return (
    <StyledCarousel autoplay infinite variableWidth centerMode slidesToScroll={1} slidesToShow={1} height={height} {...rest} ref={ref}>
      {list.map(x => (
        <FileContainer key={x.id} height={height} onClick={() => handleClick(x.hash)}>
          <IPFSImage hash={x.hash} key={x.id} />
        </FileContainer>
      ))}
      {children}
    </StyledCarousel>
  )
})

export default ProductFiles
