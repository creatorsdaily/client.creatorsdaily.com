import styled from 'styled-components'
import { Button, Modal, Spin, Tooltip } from 'antd'
import FolderAddOutlined from '@ant-design/icons/FolderAddOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'
import QrcodeOutlined from '@ant-design/icons/QrcodeOutlined'
import WeiboOutlined from '@ant-design/icons/WeiboOutlined'
import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import ProductDetail from '../queries/ProductDetail.gql'
import ProductHeader from './ProductHeader'
import ProductContent from './ProductContent.dynamic'
import ProductFiles from './ProductFiles.dynamic'
import ProductEmbed from './ProductEmbed.dynamic'
import Box from './Box'

const StyledContent = styled(ProductContent)`
  padding: 24px;
  background: #FFF;
`

const StyledBox = styled(Box)`
margin-bottom: 24px;
`

const ProductMeta = styled.div`
padding: 24px;
background: #FFF;
overflow: hidden;
display: flex;
justify-content: space-between;
border-top: 1px solid #F5F5F5;
border-bottom: 1px solid #F5F5F5;
.ant-btn {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
`

const StyledProductHeader = styled(ProductHeader)`
margin-bottom: 24px;
`

const Product = ({
  id, name, description, content, topics, icon, medias = [], full = false, withHeader = false
}) => {
  const handleWXACode = () => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 500,
      content: (
        <img src={`${process.env.API}/products/${id}/wxacode`} />
      )
    })
  }
  const handleWeibo = () => {
    const url = encodeURIComponent(`https://creatorsdaily.com/${id}`)
    const pic = encodeURIComponent(icon ? `${process.env.FILES}/${icon.hash}` : '')
    const shareText = encodeURIComponent(`这个叫「${name}」的产品非常有趣～分享给大家～`)
    window.open(`http://v.t.sina.com.cn/share/share.php?url=${url}&pic=${pic}&title=${shareText}`, '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes')
  }
  const handleLink = () => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 800,
      content: (
        <ProductEmbed id={id} name={name} />
      )
    })
  }
  const renderHeader = () => {
    if (!withHeader) return null
    return (<StyledProductHeader id={id} topics={topics} description={description} icon={icon} name={name} />)
  }
  return (
    <div id={id}>
      {renderHeader()}
      <StyledBox>
        <ProductFiles medias={medias} />
        <ProductMeta>
          <div>
            <Button icon={<WeiboOutlined />} onClick={handleWeibo}>
              微博分享
            </Button>
            <Button icon={<QrcodeOutlined />} onClick={handleWXACode}>
              小程序
            </Button>
            <Button icon={<LinkOutlined />} type='dashed' onClick={handleLink} />
          </div>
          <Tooltip title='加入集合，敬请期待' placement='left'>
            <Button icon={<FolderAddOutlined />} disabled type='dashed' />
          </Tooltip>
        </ProductMeta>
        <StyledContent content={content} full={full} />
      </StyledBox>
    </div>
  )
}

export const ProductContainer = ({ id, full = false }) => {
  if (!id) return null
  const { loading, data } = useQuery(ProductDetail, {
    variables: {
      id
    }
  })

  const product = get(data, 'product', {})
  return (
    <Spin spinning={loading}>
      <Product {...product} full={full} withHeader />
    </Spin>
  )
}

export default Product
