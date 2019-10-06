import { Spin } from 'antd'
import dynamic from 'next/dynamic'

export default dynamic(
  () => import('./ProductFilesUploader.dynamic'),
  {
    ssr: false,
    loading: () => <Spin />
  }
)
