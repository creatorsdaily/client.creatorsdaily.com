import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import noop from 'lodash/noop'
import { Button, Col, Input, Row } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import FormData from 'form-data'
import { PlusOutlined, ThunderboltOutlined } from '@ant-design/icons'
import useAddProductFiles from '../hooks/useAddProductFiles'

const StyledUploader = styled.div`
  height: ${({ height }) => height}px;
  padding: 0 32px;
  display: flex;
  line-height: 50%;
  flex-direction: column;
  justify-content: space-around;
`

const DraggerBox = styled.div`
  width: 240px;
  height: 150px;
  margin: 0 auto;
  align-items: center;
  display: flex;
`

const Dropzone = styled.div`
  // margin: 200px auto 100px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  // width: 500px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  span {
    color: #E33;
    padding: 0 5px;
  }
`

const DropzoneIcon = styled.p`
  font-size: 24px;
`

const Uploader = ({ height = 260, onUpload = noop, allowUrl = false, autoUpload = false }) => {
  const [url, setUrl] = useState()
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async files => {
      upload(files, 'files')
    }
  })
  const upload = async (value, type) => {
    if (!autoUpload) return onUpload(value, type)
    const formData = new FormData()
    value.forEach(x => {
      formData.append(`${type}`, x)
    })
    const { data } = await axios.post(process.env.UPLOAD, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    onUpload(data, 'keys')
  }
  const handleClick = () => {
    const res = upload([url], 'urls')
    if (res.then) {
      res.then(() => setUrl(''))
    }
  }
  const renderUrlUploader = () => {
    if (!allowUrl) return null
    return (
      <Row gutter={12}>
        <Col span={18}>
          <Input
            value={url}
            placeholder='请填写网络图片地址'
            onChange={(e) => setUrl(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Button icon={<ThunderboltOutlined />} block onClick={handleClick}>快速上传</Button>
        </Col>
      </Row>
    )
  }
  return (
    <StyledUploader height={height}>
      <DraggerBox>
        <Dropzone {...getRootProps()}>
          <input {...getInputProps()} />
          <DropzoneIcon>
            <PlusOutlined />
          </DropzoneIcon>
          <p>
            请<span>点击</span>或<span>拖拽</span>图片上传
          </p>
        </Dropzone>
      </DraggerBox>
      {renderUrlUploader()}
    </StyledUploader>
  )
}

export const UploaderForProductFiles = ({
  questionId,
  id,
  autoSave = false,
  allowUrl = true,
  onUpload = noop,
  ...rest
}) => {
  const save = useAddProductFiles(id, {
    questionId
  })
  const handleUpload = (...args) => {
    if (!autoSave) return onUpload(...args)
    return save(...args)
  }
  return (
    <Uploader onUpload={handleUpload} autoUpload {...rest} />
  )
}

export default Uploader
