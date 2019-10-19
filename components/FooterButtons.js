import styled from 'styled-components'
import { BackTop, Button, Divider, Icon, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import useToggle from 'react-use/lib/useToggle'

const ActiveBell = styled(Icon)`
color: #DE7B76;
`

const ShakeBell = styled(ActiveBell)`
animation: bellshake .5s cubic-bezier(.36,.07,.19,.97) infinite alternate;
transform-origin: top center;
@keyframes bellshake {
  0% { transform: rotate(0); }
  15% { transform: rotate(8deg); }
  30% { transform: rotate(-8deg); }
  45% { transform: rotate(5deg); }
  60% { transform: rotate(-5deg); }
  75% { transform: rotate(2deg); }
  85% { transform: rotate(-2deg); }
  92% { transform: rotate(1deg); }
  100% { transform: rotate(0); }
}
`

const Container = styled.div`
height: 32px;
width: 200px;
display: flex;
justify-content: flex-end;
`

export default () => {
  const [isPushSupported, setIsPushSupported] = useToggle(false)
  const [permission, setPermission] = useState('loading')
  useEffect(() => {
    const OneSignal = window.OneSignal
    OneSignal.push(async () => {
      const _isPushSupported = OneSignal.isPushNotificationsSupported()
      setIsPushSupported(_isPushSupported)
      if (!_isPushSupported) return
      const _permission = await OneSignal.getNotificationPermission()
      setPermission(_permission)
    })
  }, [])
  useEffect(() => {
    const OneSignal = window.OneSignal
    OneSignal.push(() => OneSignal.on('notificationPermissionChange', changed => setPermission(changed.to)))
    return () => OneSignal.push(() => OneSignal.off('notificationPermissionChange'))
  }, [])
  const handleOpenPush = () => {
    const OneSignal = window.OneSignal
    OneSignal.push(() => {
      OneSignal.showNativePrompt()
    })
  }
  const renderBellButton = () => {
    if (!isPushSupported) {
      return null
    }
    switch (permission) {
      case 'default':
        return (
          <Button onClick={handleOpenPush}>
            <ShakeBell type='bell' theme='filled' />
            开启通知
          </Button>
        )
      case 'denied':
        return (
          <Tooltip placement='top' title='糟糕！通知被禁用了，请您重新打开'>
            <Button shape='circle' disabled>
              <Icon type='bell' theme='filled' />
            </Button>
          </Tooltip>
        )
      case 'granted':
        return (
          <Tooltip placement='top' title='通知已开启'>
            <Button shape='circle'>
              <ActiveBell type='bell' theme='filled' />
            </Button>
          </Tooltip>
        )
    }
  }
  return (
    <Container>
      {/* <Button>
        <Icon type='chrome' theme='filled' />
      </Button>
      <Divider type='vertical' /> */}
      <BackTop visibilityHeight={600}>
        <Tooltip placement='top' title='回到顶部'>
          <Button shape='circle'><Icon type='rocket' theme='filled' /></Button>
        </Tooltip>
      </BackTop>
      {renderBellButton()}
    </Container>
  )
}
