import { Affix, Button, Modal } from 'antd'
import styled from 'styled-components'
import noop from 'lodash/noop'
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
      <SmallTitle>核心用户</SmallTitle>
      <CoreUsers />
      <WeApp>
        <Button type='link' onClick={handleWeApp}>
          <img src='/weapp.jpg' />
          <div>
            <h4>微信小程序上线啦</h4>
            <div>扫码立刻体验</div>
          </div>
        </Button>
      </WeApp>
      <Affix offsetTop={24}>
        <StyledBox>
          <Title>微信公众号</Title>
          <WeChatOfficialAccount title='微信关注：一群创造者' />
        </StyledBox>
      </Affix>
      <ContactBox>
        <Contact>
          <WeChatButton>
            <img src='/wechat.png' />
            <div>官方「微信」群</div>
          </WeChatButton>
        </Contact>
        <Contact>
          <a href='https://t.me/creatorsdaily' rel='noopener noreferrer' target='_blank'>
            <Button type='link'>
              <img src='/telegram.png' />
              <div>加入「Telegram」群组</div>
            </Button>
          </a>
        </Contact>
        <Contact>
          <a href='https://twitter.com/@creators_daily' rel='noopener noreferrer' target='_blank'>
            <Button type='link'>
              <img src='/twitter.png' />
              <div>关注「Twitter」</div>
            </Button>
          </a>
        </Contact>
        <Contact>
          <a href='https://kz.sync163.com/web/topic/vqNzr253b46Yk?uid=ZNlYrg5BAReny' rel='noopener noreferrer' target='_blank'>
            <Button type='link'>
              <KuaizhiImg src='/kuaizhi.png' />
              <div>在「快知」订阅产品通知</div>
            </Button>
          </a>
        </Contact>
        <Contact>
          <Button type='link' onClick={handleZSXQ}>
            <img src='/zsxq.png' />
            <div>加入我的「知识星球」</div>
          </Button>
        </Contact>
      </ContactBox>
    </>
  )
}
