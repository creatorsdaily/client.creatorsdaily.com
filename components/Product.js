import styled from 'styled-components'
import { Button, Modal, Spin, Tooltip } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { GET_PRODUCT } from '../queries'
import ProductHeader from './ProductHeader'
import ProductContent from './ProductContent'
import ProductFiles from './ProductFiles'

const StyledContent = styled(ProductContent)`
  padding: 24px;
  background: #FFF;
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

const Product = ({
  id, name, description, content, topics, icon, medias = [], full = false
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
  return (
    <div id={id}>
      <ProductHeader id={id} topics={topics} description={description} icon={icon} name={name} />
      <ProductFiles medias={medias} />
      <ProductMeta>
        <div>
          <Button icon='weibo' type='dashed' onClick={handleWeibo}>
            微博分享
          </Button>
          <Button icon='qrcode' type='dashed' onClick={handleWXACode}>
            专属小程序码
          </Button>
        </div>
        <Tooltip title='加入集合，敬请期待' placement='left'>
          <Button icon='folder-add' disabled type='dashed' />
        </Tooltip>
      </ProductMeta>
      <StyledContent content={content} full={full} />
    </div>
  )
}

export const ProductContainer = ({ id, full = false }) => {
  if (!id) return null
  const { loading, data } = useQuery(GET_PRODUCT, {
    variables: {
      id
    }
  })

  const product = get(data, 'product', {})
  return (
    <Spin spinning={loading}>
      <Product {...product} full={full} />
    </Spin>
  )
}

export default Product
