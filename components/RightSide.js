import { Affix, Button, Col, Modal, Row } from 'antd'
import styled from 'styled-components'
import noop from 'lodash/noop'
import Link from 'next/link'
import BulbOutlined from '@ant-design/icons/BulbOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import media from '../libs/media'
import { red } from '../libs/colors'
import Box from './Box'
import WeChatOfficialAccount from './WeChatOfficialAccount'
import WeChatButton from './WeChatButton'
import Cemetery from './icons/Cemetery.svg'

const StyledBox = styled(Box)`
padding: 16px;
margin-bottom: 24px;
img {
  max-width: 100%;
}
`

const Title = styled.h3`
  font-size: 14px;
  text-align: center;
`

const ContactBox = styled(Box)`
padding: 16px;
margin-top: 24px;
margin-bottom: 24px;
button {
  color: #6C6C6C;
}
.ant-btn {
  display: flex;
  font-size: 13px;
  padding: 0;
  height: 36px;
  line-height: 36px;
  border: 0;
}
`

const Contact = styled.div`
font-size: 13px;
line-height: 36px;
margin-bottom: 16px;
overflow:hidden;
:last-child {
  margin-bottom: 0;
}
img {
  display: block;
  width: 36px;
  height: 36px;
  margin-right: 12px;
}
`

const KuaizhiImg = styled.img`
border-radius: 20%;
transform: scale(0.82);
`

const WeApp = styled(Box)`
padding: 16px;
margin-bottom: 24px;
display: flex;
button {
  color: #6C6C6C;
}
.ant-btn {
  display: flex;
  padding: 0;
  border: 0;
  height: 60px;
  font-size: 12px;
  text-align: left;
}
img {
  width: 60px;
  height: 60px;
  display: block;
  margin-right: 16px;
}
h4 {
  height: 30px;
  line-height: 30px;
  margin: 6px 0 0;
  font-size: 14px;
}
`

const VoteBtn = styled.a`
display: block;
margin: 16px auto 0;
max-width: 250px;
img {
  width: 100%;
}
`

const Buttons = styled(Box)`
margin-bottom: 24px;
`

const BigButton = styled(Button)`
color: #404040;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 86px;
span {
  margin-left: 0 !important;
}
svg {
  font-size: 26px;
  color: ${red};
  margin-bottom: 8px;
}
`

const Mbutton = styled(BigButton)`
svg {
  height: 28px;
  width: 28px;
  fill: #505050;
  color: #F0E63B;
}
`

const Indie = styled.a`
display: flex;
font-size: 12px;
color: #6C6C6C;
overflow: hidden;
width: 100%;
:hover {
  color: #eba8a2;
}
> div {
  flex: 1;
  text-overflow:ellipsis;
  white-space: nowrap;
}
`

const CreateButton = styled.a`
margin: 0 0 24px 24px;
display: block;
${media.sm`
  margin: 0 0 24px;
`}
`

const CreateQuestionButton = styled.a`
margin-right: 24px;
display: block;
${media.sm`
  margin-right: 0;
`}
`

const partners = [{
  name: '码力全开',
  link: 'https://www.maliquankai.com',
  slogan: '独立开发者交流、学习聚集地',
  icon: 'https://media.creatorsdaily.com/QmZN56juqA3hE4bExo7XSMSF1HoB4zBjTQRFWmZNL2ZWMy-160-160-contain'
}, {
  name: '独立开发者社区',
  link: 'https://indiehackers.net/topics',
  slogan: '特别友情社区',
  icon: 'https://media.creatorsdaily.com/QmVRA2A1BZomVauPCmD8y8jx2ko97NrmTm33FToanzV1im-160-160-contain'
}]

const RightSide = ({ onQuestion = noop, onProduct = noop }) => {
  const productId = process.env.NEXT_PUBLIC_PRODUCT_ID
  const handleWeApp = () => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 500,
      content: (
        <img src='/weapp.jpg' />
      )
    })
  }
  return (
    <>
      <Row type='flex' gutter={24}>
        <Col span={14}>
          <Link href='/create' passHref>
            <CreateButton>
              <Button type='primary' icon={<PlusOutlined />} size='large' block>发布产品</Button>
            </CreateButton>
          </Link>
        </Col>
        <Col span={10}>
          <Link href='/questions/create' passHref>
            <CreateQuestionButton>
              <Button size='large' block>提问</Button>
            </CreateQuestionButton>
          </Link>
        </Col>
      </Row>
      <Buttons>
        <Row type='flex'>
          <Col span={12}>
            <Link href='/cemetery'>
              <a>
                <Mbutton size='large' block type='link' icon={<Cemetery />}>产品公墓</Mbutton>
              </a>
            </Link>
          </Col>
          <Col span={12}>
            <Link href='/milestones'>
              <a>
                <BigButton size='large' block type='link' icon={<BulbOutlined />}>里程碑</BigButton>
              </a>
            </Link>
          </Col>
        </Row>
      </Buttons>
      {/* <SmallTitle>活跃用户</SmallTitle>
      <ActiveUsers /> */}
      <WeApp>
        <Button type='link' onClick={handleWeApp}>
          <img src='/weapp.jpg' alt='小程序码' />
          <div>
            <h4>微信小程序上线啦</h4>
            <div>扫码立刻体验</div>
          </div>
        </Button>
      </WeApp>
      {/* <SmallTitle>核心用户</SmallTitle>
      <CoreUsers /> */}
      <ContactBox>
        <Contact>
          <WeChatButton>
            <img src='/wechat.png' alt='微信' />
            <div>官方「微信」群</div>
          </WeChatButton>
        </Contact>
        <Contact>
          <a href='https://t.me/creatorsdaily' rel='noopener noreferrer' target='_blank'>
            <Button type='link'>
              <img src='/telegram.png' alt='Telegram' />
              <div>加入「Telegram」群组</div>
            </Button>
          </a>
        </Contact>
        <Contact>
          <a href='https://twitter.com/@creators_daily' rel='noopener noreferrer' target='_blank'>
            <Button type='link'>
              <img src='/twitter.png' alt='Twitter' />
              <div>关注「Twitter」</div>
            </Button>
          </a>
        </Contact>
        <Contact>
          <a href='https://kz.sync163.com/web/topic/vqNzr253b46Yk?uid=ZNlYrg5BAReny' rel='noopener noreferrer' target='_blank'>
            <Button type='link'>
              <KuaizhiImg src='/kuaizhi.png' alt='快知' />
              <div>在「快知」订阅产品通知</div>
            </Button>
          </a>
        </Contact>
      </ContactBox>
      {partners.map(x => (
        <WeApp key={x.link}>
          <Indie href={x.link} target='_blank' rel='noopener noreferrer'>
            <img alt={x.name} src={x.icon} />
            <div>
              <h4>{x.name}</h4>
              <div>{x.slogan}</div>
            </div>
          </Indie>
        </WeApp>
      ))}
      <Affix offsetTop={24}>
        <StyledBox>
          <Title>微信公众号</Title>
          <WeChatOfficialAccount title='微信关注：一群创造者' />
          {productId && (
            <Link href='/[id]' as={'/' + productId} passHref>
              <VoteBtn aria-label='投票'>
                <img alt='投票' src={`/api/${productId}/vote.svg?theme=light`} />
              </VoteBtn>
            </Link>
          )}
        </StyledBox>
      </Affix>
    </>
  )
}

export default RightSide
