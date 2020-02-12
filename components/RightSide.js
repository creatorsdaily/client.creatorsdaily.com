import { Affix, Button, Col, Modal, Row } from 'antd'
import styled from 'styled-components'
import noop from 'lodash/noop'
import Link from 'next/link'
import BulbOutlined from '@ant-design/icons/BulbOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import Box from './Box'
import WeChatOfficialAccount from './WeChatOfficialAccount'
import ZSXQ from './ZSXQ'
import WeChatButton from './WeChatButton'
import CoreUsers from './CoreUsers'
import SmallTitle from './SmallTitle'

const StyledBox = styled(Box)`
padding: 16px;
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
  color: #6C9DF7;
  margin-bottom: 8px;
}
`

const Mbutton = styled(BigButton)`
svg {
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

const partners = [{
  name: '码力全开',
  link: 'https://www.maliquankai.com',
  slogan: '独立开发者交流、学习聚集地',
  icon: 'https://media.creatorsdaily.com/QmZN56juqA3hE4bExo7XSMSF1HoB4zBjTQRFWmZNL2ZWMy-160-160-contain'
}, {
  name: '电鸭社区',
  link: 'https://eleduck.com',
  slogan: '互联网工作者们的聚集地',
  icon: 'https://media.creatorsdaily.com/QmSw56w7qPxST6UNiFfLRTKrVWC6AE8fCJbn5dXUB2JPWV-160-160-contain'
}, {
  name: '独立开发者社区',
  link: 'https://indiehackers.net/topics',
  slogan: '特别友情社区',
  icon: 'https://media.creatorsdaily.com/QmVRA2A1BZomVauPCmD8y8jx2ko97NrmTm33FToanzV1im-160-160-contain'
}]

export default ({ onQuestion = noop, onProduct = noop }) => {
  const handleZSXQ = () => {
    Modal.info({
      okText: '关闭',
      className: 'preview-modal',
      icon: null,
      maskClosable: true,
      autoFocusButton: null,
      width: 500,
      content: (
        <ZSXQ title='知识星球' hideTitle />
      )
    })
  }
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
      <Buttons>
        <Row type='flex'>
          <Col span={12}>
            <Link href='/milestones'>
              <a>
                <Mbutton size='large' block type='link' icon={<BulbOutlined />}>里程碑</Mbutton>
              </a>
            </Link>
          </Col>
          <Col span={12}>
            <Link href='/talk'>
              <a>
                <BigButton size='large' block type='link' icon={<MessageOutlined />}>聊产品</BigButton>
              </a>
            </Link>
          </Col>
        </Row>
      </Buttons>
      <SmallTitle>核心用户</SmallTitle>
      <CoreUsers />
      <WeApp>
        <Button type='link' onClick={handleWeApp}>
          <img src='/weapp.jpg' alt='小程序码' />
          <div>
            <h4>微信小程序上线啦</h4>
            <div>扫码立刻体验</div>
          </div>
        </Button>
      </WeApp>
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
        <Contact>
          <Button type='link' onClick={handleZSXQ}>
            <img src='/zsxq.png' alt='知识星球' />
            <div>加入我的「知识星球」</div>
          </Button>
        </Contact>
      </ContactBox>
      <Affix offsetTop={24}>
        <StyledBox>
          <Title>微信公众号</Title>
          <WeChatOfficialAccount title='微信关注：一群创造者' />
          <Link href='/[id]' as='/b256ab69-e72a-4491-bd3b-13da969f6c0c' passHref>
            <VoteBtn aria-label='投票'>
              <img alt='投票' src='/api/b256ab69-e72a-4491-bd3b-13da969f6c0c/vote.svg?theme=light' />
            </VoteBtn>
          </Link>
        </StyledBox>
      </Affix>
    </>
  )
}
