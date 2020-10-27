import { useEffect } from 'react'
import Router from 'next/router'
import { Modal } from 'antd'
import useAuth from './useAuth'

const useCheckMobile = ({ ...rest }) => {
  const { viewer, loading } = useAuth({
    ...rest
  })
  useEffect(() => {
    console.log(viewer)
    if (!viewer.mobile) {
      Modal.confirm({
        title: '请先绑定手机号码',
        content: '根据相关法律法规，请先绑定手机号码后才可继续使用该功能！',
        okText: '去绑定',
        cancelText: '取消',
        onOk: () => {
          Router.replace('/settings/mobile')
        },
        onCancel: () => {
          Router.back()
        }
      })
    }
  }, [viewer])
  return { viewer, loading }
}

export default useCheckMobile
