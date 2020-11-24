import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Spin } from 'antd'
import { useList } from 'react-use'
import { useMutation, useQuery } from '@apollo/client'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { useRouter } from 'next/router'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import styled from 'styled-components'
import useCheckMobile from '../hooks/useCheckMobile'
import useProductSelectModal from '../hooks/useProductSelectModal'
import ProductList from '../queries/ProductList.gql'
import message from '../libs/message.dynamic'
import EditorDynamic from '../components/Editor.dynamic'
import SmallTitle from '../components/SmallTitle'
import ProductCell from '../components/ProductCell'
import MediaUploader from '../components/MediaUploader'
import CreatePost from '../queries/mutations/CreatePost.gql'

const Content = styled.div`
border: 1px solid #F0F0F0;
padding: 16px;
background: #FFF;
`
const StyledEditor = styled(EditorDynamic)`
font-size: 16px;
.CodeMirror.CodeMirror-wrap {
  padding: 12px;
  font-family: Monospace;
  border-radius: 2px;
}
`
const TitleInput = styled(Input)`
box-shadow: none !important;
padding-left: 16px;
padding-right: 16px;
`
const StyledProductCell = styled(ProductCell)`
border: 1px solid #F0F0F0;
`
const Buttons = styled.div`
display: flex;
justify-content: flex-end;
`
const ProductCellBox = styled.div`
margin-top: 16px;
position: relative;
`
const DeleteButton = styled(Button)`
position: absolute;
right: 12px;
top: 16px;
`
const ProductButton = styled(Button)`
font-size: 14px;
`
const StyledPostImage = styled(MediaUploader)`
padding-top: 50%;
position: relative;
margin-bottom: 8px;
> .ant-upload {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFF;
}
`

const PostEditor = () => {
  useCheckMobile()
  const [media, setMedia] = useState()
  const [list, { insertAt, removeAt }] = useList()
  const { replace } = useRouter()
  const [modal, show] = useProductSelectModal(id => {
    if (list.includes(id)) {
      return message.error('已存在相同产品')
    }
    insertAt(0, id)
  })
  const { loading, data } = useQuery(ProductList, {
    variables: {
      ids: list
    },
    skip: !list.length
  })
  const [create] = useMutation(CreatePost, {
    onCompleted: data => {
      const id = get(data, 'createPost.id')
      message.success('发布成功！')
      replace(`/posts/${id}`)
    }
  })
  const products = sortBy(get(data, 'getProducts.data', []), x => list.indexOf(x.id))
  const handleFinish = values => {
    create({
      variables: {
        ...values,
        media,
        products: list
      }
    })
  }
  return (
    <Row gutter={24}>
      <Col span={16}>
        <Content>
          <h1>发布新文章</h1>
          <p>您可以在这里发布产品 <strong>介绍</strong>、<strong>开发</strong>、<strong>运营</strong> 等文章。</p>
          <Form layout='vertical' onFinish={handleFinish}>
            <Form.Item
              name='title'
              rules={[{ required: true, message: '请输入文章标题！' }]}
            >
              <TitleInput size='large' placeholder='文章标题' />
            </Form.Item>
            <Form.Item
              name='content'
            >
              <StyledEditor placeholder='请输入文章正文...' options={{ minHeight: '320px' }} />
            </Form.Item>
            <Buttons>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Buttons>
          </Form>
        </Content>
      </Col>
      <Col span={8}>
        <Content>
          <SmallTitle>封面图</SmallTitle>
          <StyledPostImage onChange={setMedia} value={media} />
          <SmallTitle>相关产品</SmallTitle>
          <ProductButton icon={<PlusOutlined />} size='large' type='dashed' block onClick={show}>添加相关产品</ProductButton>
          <Spin spinning={loading}>
            {products.map(x => (
              <ProductCellBox key={x.id}>
                <StyledProductCell size='small' {...x} withLike={false} disabled />
                <DeleteButton
                  icon={<DeleteOutlined />} type='text' danger onClick={() => {
                    removeAt(list.indexOf(x.id, 1))
                  }}
                />
              </ProductCellBox>
            ))}
          </Spin>
          {modal}
        </Content>
      </Col>
    </Row>
  )
}

export default PostEditor
