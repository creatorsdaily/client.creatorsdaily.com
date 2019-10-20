import { Icon, Upload } from 'antd'
import styled from 'styled-components'
import { useToggle } from 'react-use'
import noop from 'lodash/noop'
import { forwardRef, useEffect, useRef, useState } from 'react'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useMutation } from '@apollo/react-hooks'
import IPFSImage from './IPFSImage'
import ProductFiles from './ProductFiles'

const StyledFiles = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
`

const StyledProductFiles = styled(ProductFiles)`
  img {
    width: 100%;
    object-fit: contain;
  }
`

const StyledUpload = styled(Upload)`
width: auto;
.ant-upload-select-picture-card i {
  font-size: 24px;
  color: #999;
}
> .ant-upload {
  width: 78px;
  height: 78px;
  margin: 0;
}
`

const SmallImage = styled(IPFSImage)`
width: 78px;
height: 78px;
margin-right: 10px;
border: 1px dashed #d9d9d9;
border-radius: 3px;
cursor: pointer;
object-fit: cover;
`

const CREATE_MEDIA = gql`
mutation($media: IMedia!) {
  createMedia(media: $media) {
    id,
    hash
  }
}
`

export default forwardRef(({ value = [], onChange = noop, onError = noop }, ref) => {
  const filesRef = useRef()
  const [loading, setLoading] = useToggle(false)
  const [ids, setIds] = useState(value)
  const [files, setFiles] = useState(value.map(x => ({ id: x })))
  const [create, { loading: createLoading }] = useMutation(CREATE_MEDIA, {
    onCompleted: data => {
      const media = get(data, 'createMedia')
      fireChange([
        ...ids,
        media.id
      ])
    },
    onError
  })
  useEffect(() => {
    fireChange(value)
  }, [value])
  const fireChange = ids => {
    setIds(ids)
    onChange(ids)
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
      <Icon type={(loading || createLoading) ? 'loading' : 'plus'} />
      <div className='ant-upload-text'>点击上传</div>
    </div>
  )
  const handleSelect = index => {
    filesRef.current.slick.slickGoTo(index)
  }
  return (
    <div>
      <StyledProductFiles
        ref={filesRef}
        autoplay={false}
        infinite={false}
        variableWidth={false}
        centerMode={false}
        focusOnSelect={false}
        slidesToScroll={1}
        slidesToShow={1}
        medias={ids.map(x => ({ id: x }))}
        onLoad={setFiles} />
      <StyledFiles>
        {files.map((x, i) => (
          <SmallImage key={x.id} hash={x.hash} onClick={() => handleSelect(i)} />
        ))}
        <StyledUpload
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          action={process.env.UPLOAD}
          onChange={handleChange}
          ref={ref}
        >
          {uploadButton}
        </StyledUpload>
      </StyledFiles>
    </div>
  )
})
