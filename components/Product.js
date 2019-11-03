import styled from 'styled-components'
import { Button, Icon, Spin, Timeline } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import Link from 'next/link'
import { GET_PRODUCT } from '../queries'
import media from '../libs/media'
import useCreateMilestoneModal from '../hooks/useCreateMilestoneModal'
import useCanEditProduct from '../hooks/useCanEditProduct'
import ProductHeader from './ProductHeader'
import ProductContent from './ProductContent'
import ProductFiles from './ProductFiles'
import Time from './Time'
import SmallTitle from './SmallTitle'

const StyledContent = styled(ProductContent)`
  padding: 24px;
  background: #FFF;
  margin-bottom: 24px;
`

const Milestones = styled.div`
  padding: 8px 8px 0;
  margin: 0 16px;
  ${media.sm`
    margin: 0;
  `}
  .ant-timeline-item-head {
    background-color: #FAFAFA;
  }
`

const MilestoneTime = styled.div`
  font-size: 12px;
  font-weight: bold;
  line-height: 24px;
  margin-bottom: 8px;
`

const MilestoneTitle = styled.h4`
  margin-bottom: 0;
  font-weight: bold;
`

const MilestoneButton = styled(Button)`
  margin: 0 auto;
`

const MilestoneContent = styled(ProductContent)`
font-size: 12px;
`

const Product = ({
  id, name, discovererId,
  milestones, creators,
  createdAt, description, content, topics, icon, medias = [], full = false
}) => {
  const canEdit = useCanEditProduct({ creators, discovererId })

  const [modal, show] = useCreateMilestoneModal(id, {
    refetchQueries: () => [{
      query: GET_PRODUCT,
      variables: { id }
    }]
  })
  const renderCreatorMilestone = () => {
    if (!canEdit) return null
    return (
      <Timeline.Item color='red' dot={<Icon type='clock-circle' />}>
        <MilestoneTime>现在，立刻发布新动态</MilestoneTime>
        <MilestoneButton icon='plus' onClick={show}>
          发布新里程碑
        </MilestoneButton>
      </Timeline.Item>
    )
  }
  const milestonesList = get(milestones, 'data', [])
  return (
    <div>
      {modal}
      <ProductHeader id={id} topics={topics} description={description} icon={icon} name={name} />
      <ProductFiles medias={medias} />
      <StyledContent content={content} full={full} />
      <SmallTitle id='milestones' name='milestones'>
        <Link href='/[id]/milestones' as={`/${id}/milestones`}>
          <a>
        里程碑
          </a>
        </Link>
      </SmallTitle>
      <Milestones>
        <Timeline>
          {renderCreatorMilestone()}
          {milestonesList.map(x => (
            <Timeline.Item key={x.id}>
              <MilestoneTime>
                <Time time={x.createdAt} />
              </MilestoneTime>
              <MilestoneTitle>
                <Link
                  href='/[id]/milestones/[milestoneId]'
                  as={`/${id}/milestones/${x.id}`}
                >
                  <a>
                    {x.title}
                  </a>
                </Link>
              </MilestoneTitle>
              <MilestoneContent height={80} full content={x.content} background='linear-gradient(rgba(250,250,250,0), rgba(250,250,250,1))' />
            </Timeline.Item>
          ))}
          <Timeline.Item color='green' dot={<Icon type='flag' />}>
            <MilestoneTime>
              <Time time={createdAt} />
            </MilestoneTime>
            <MilestoneTitle style={{ fontWeight: 'normal' }}>在 <strong>{process.env.NAME}</strong> 首次发布</MilestoneTitle>
          </Timeline.Item>
        </Timeline>
      </Milestones>
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
