import { Icon, Upload } from 'antd'
import styled from 'styled-components'
import { useToggle } from 'react-use'
import noop from 'lodash/noop'
import { forwardRef, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_MEDIA } from '../queries'
import IPFSImage from './IPFSImage'

const StyledUpload = styled(Upload)`
width: auto;
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

const CREATE_MEDIA = gql`
mutation($media: IMedia!) {
  createMedia(media: $media) {
    id,
    hash
  }
}
`

export default forwardRef(({ value, onChange = noop, onError = noop }, ref) => {
  const [loading, setLoading] = useToggle(false)
  const [id, setId] = useState(value)
  const [create, { loading: createLoading }] = useMutation(CREATE_MEDIA, {
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
      <Icon type={(loading || getLoading || createLoading) ? 'loading' : 'plus'} />
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
      ref={ref}
    >
      {hash ? <StyledIPFSImage hash={hash} /> : uploadButton}
    </StyledUpload>
  )
})
