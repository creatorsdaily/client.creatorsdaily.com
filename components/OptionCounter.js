import styled from 'styled-components'
import { Button, Col, Divider, Rate, Row } from 'antd'
import noop from 'lodash/noop'
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import useViewer from '../hooks/useViewer'
import media from '../libs/media'
import Fraction from './Fraction'

const Buttons = styled(Row)`
  margin-bottom: 24px;
`

const Title = styled.h3`
  margin: 16px 0;
`

const Liks = styled.div`
  ${media.sm`
    float: right
  `}
`

export default ({ productId, ups = [], downs = [], questionId, onClick = noop }) => {
  const { viewer } = useViewer()
  const buttonDisabled = viewer &&
    (ups.some(x => x.user.id === viewer.id) ||
    downs.some(x => x.user.id === viewer.id))
  return (
    <>
      <Title id={`product-${productId}-rank`}>得分</Title>
      <Buttons type='flex' gutter={16} align='middle'>
        <Col xl={10} lg={10} md={10} sm={10} xs={24}>
          <Rate allowHalf disabled defaultValue={ups.length / (ups.length + downs.length) * 5} />
        </Col>
        <Col xl={14} lg={14} md={14} sm={14} xs={24}>
          <Liks>
            <Fraction>
              {ups.length} <span>/ {downs.length}</span>
            </Fraction>
            <Divider type='vertical' />
            <Button
              icon={<LikeOutlined />}
              disabled={buttonDisabled}
              onClick={() => {
                onClick(questionId, productId)
              }}
            >推荐
            </Button>
            <Divider type='vertical' />
            <Button
              icon={<DislikeOutlined />}
              disabled={buttonDisabled}
              onClick={() => {
                onClick(questionId, productId, false)
              }}
            >反对
            </Button>
          </Liks>
        </Col>
      </Buttons>
    </>
  )
}
