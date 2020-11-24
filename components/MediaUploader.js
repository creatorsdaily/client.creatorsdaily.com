import { Upload } from 'antd'
import styled from 'styled-components'
import { useToggle } from 'react-use'
import noop from 'lodash/noop'
import { forwardRef, useEffect, useState } from 'react'
import get from 'lodash/get'
import { useMutation, useQuery } from '@apollo/client'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { GET_MEDIA } from '../queries'
import useViewer from '../hooks/useViewer'
import CreateMedia from '../queries/mutations/CreateMedia.gql'
import IPFSImage from './IPFSImage'

const StyledUpload = styled(Upload)`
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
> .ant-upload {
  width: 98px;
  height: 98px;
  margin: 0;
}
`

const StyledIPFSImage = styled(IPFSImage)`
width: 80px;
height: 80px;
object-fit: contain;
`

const MediaUploader = forwardRef(({ value, onChange = noop, onError = noop, ...rest }, ref) => {
  const { viewer: user } = useViewer()
  const [loading, setLoading] = useToggle(false)
  const [id, setId] = useState(value)
  const [create, { loading: createLoading }] = useMutation(CreateMedia, {
    onCompleted: data => {
      fireChange(get(data, 'createMedia.id'))
    },
    onError
  })
  const { data, loading: getLoading, refetch } = useQuery(GET_MEDIA, {
    variables: { id },
    skip: !id
  })
  useEffect(() => {
    fireChange(value)
    value && refetch({ id: value })
  }, [value])
  const fireChange = id => {
    setId(id)
    onChange(id)
  }
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    } else if (info.file.status === 'error') {
      setLoading(false)
      onError(info.file.response)
    } else if (info.file.status === 'done') {
      setLoading(false)
      create({
        variables: {
          media: {
            hash: info.file.response[0].hash
          }
        }
      })
    }
  }
  const uploadButton = (
    <div>
      {(loading || getLoading || createLoading) ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='ant-upload-text'>点击上传</div>
    </div>
  )
  const hash = get(data, 'getMedia.hash')
  return (
    <StyledUpload
      listType='picture-card'
      className='avatar-uploader'
      showUploadList={false}
      action={process.env.UPLOAD}
      onChange={handleChange}
      headers={{
        authorization: `Bearer ${user && user.token}`
      }}
      ref={ref}
      {...rest}
    >
      {hash ? <StyledIPFSImage hash={hash} /> : uploadButton}
    </StyledUpload>
  )
})
export default MediaUploader
