import { Button, Icon, Timeline } from 'antd'
import styled from 'styled-components'
import get from 'lodash/get'
import Link from 'next/link'
import media from '../libs/media'
import useCreateMilestoneModal from '../hooks/useCreateMilestoneModal'
import useCanEditProduct from '../hooks/useCanEditProduct'
import { GET_PRODUCT } from '../queries'
import Time from './Time'
import ProductContent from './ProductContent'

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

export default ({
  productId,
  product = {}
}) => {
  const {
    discovererId,
    milestones, creators,
    createdAt
  } = product
  const canEdit = useCanEditProduct({ creators, discovererId })
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
  const [modal, show] = useCreateMilestoneModal(productId, {
    refetchQueries: () => [{
      query: GET_PRODUCT,
      variables: { id: productId }
    }]
  })
  return (
    <Milestones>
      {modal}
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
                as={`/${productId}/milestones/${x.id}`}
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
  )
}
